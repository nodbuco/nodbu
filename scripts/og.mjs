#!/usr/bin/env node
/**
 * Genera las imagenes OG (1200x630) de los articulos de /recursos a partir
 * de la plantilla del kit de marca, y las deja en public/og/<slug>.png.
 *
 *   npm run og            genera solo las que faltan
 *   npm run og -- --force regenera todas
 *
 * COMO FUNCIONA. Sin dependencias: la propia plantilla del kit
 * (05_plantillas/og-plantilla.html) documenta el metodo, que es abrirla en
 * Chrome headless y capturar a 1200x630. Este script rellena la plantilla
 * con el titulo y la descripcion de cada articulo, incrusta las fuentes y el
 * logotipo como data-URI (asi el file:// no depende de rutas relativas) y
 * lanza Chrome con --screenshot. Hace falta tener Google Chrome o Chromium
 * instalado; si no se encuentra, el script lo dice y no hace nada.
 *
 * POR QUE SE GENERAN Y SE VERSIONAN, en vez de renderizarlas en el build:
 * el sitio es un export estatico (CLAUDE.md, regla 1) y next/og necesita
 * servidor. Las PNG se generan aqui, se commitean en public/og/ y el build
 * las copia como cualquier otro archivo. El despliegue no necesita Chrome.
 *
 * PLAN B: si un articulo no tiene su PNG, articles.ts usa la generica
 * (/og.png). Publicar no depende de haber pasado por aqui.
 *
 * Los colores de la imagen son los de la plantilla del kit, no los del
 * sistema de tokens de la web: esta imagen se ve en LinkedIn, WhatsApp o
 * Slack, fuera de los dos temas, y ahi manda el manual de marca.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const KIT = path.join(ROOT, 'NODBU_BRAND_KIT_FINAL');
const TEMPLATE = path.join(KIT, '05_plantillas', 'og-plantilla.html');
const ARTICLES = path.join(ROOT, 'src', 'content', 'recursos');
const OUT_DIR = path.join(ROOT, 'public', 'og');

const force = process.argv.includes('--force');

/* ------------------------------------------------------------ chrome -- */

function findChrome() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const candidates = {
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      `${os.homedir()}/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`,
    ],
    linux: ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'],
    win32: [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ],
  }[process.platform] ?? [];
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

/* ---------------------------------------------------------- contenido -- */

/** El dominio sale de site.ts: es la unica fuente (CLAUDE.md, regla 3). */
function readDomain() {
  const site = fs.readFileSync(path.join(ROOT, 'src', 'content', 'site.ts'), 'utf8');
  const match = /^\s*domain:\s*'([^']+)'/m.exec(site);
  if (!match) throw new Error('No se encontro `domain` en src/content/site.ts');
  return match[1];
}

/** Etiquetas de categoria, leidas de recursos.ts para no duplicar copy. */
function readCategoryLabels() {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'content', 'recursos.ts'), 'utf8');
  const labels = {};
  for (const m of src.matchAll(/^\s*'?([a-z-]+)'?:\s*\{\s*\n\s*label:\s*'([^']+)'/gm)) labels[m[1]] = m[2];
  return labels;
}

function readArticles() {
  return fs
    .readdirSync(ARTICLES)
    .filter((file) => file.endsWith('.mdx') && !file.startsWith('_'))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(ARTICLES, file), 'utf8'));
      return { slug: file.replace(/\.mdx$/, ''), ...data };
    })
    .filter((article) => !article.draft && !article.og);
}

/* ----------------------------------------------------------- plantilla -- */

const escape = (text) =>
  String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function dataUri(file, mime) {
  return `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
}

/**
 * Los titulos de los articulos llegan a 70 caracteres; el h1 de la plantilla
 * esta pensado para un claim corto a 66px. Se baja el cuerpo por tramos para
 * que quepa en tres lineas sin tocar el resto del diseño.
 */
function titleSize(title) {
  if (title.length <= 34) return 64;
  if (title.length <= 48) return 56;
  if (title.length <= 62) return 50;
  return 46;
}

function buildHtml(template, { title, description, label, domain }) {
  const fonts = {
    outfit: dataUri(path.join(KIT, '06_tipografias', 'Outfit-Variable.woff2'), 'font/woff2'),
    inter: dataUri(path.join(KIT, '06_tipografias', 'Inter-Variable.woff2'), 'font/woff2'),
  };
  const logo = dataUri(path.join(KIT, '01_logo', 'png', 'nodbu-logotipo-blanco-1200w.png'), 'image/png');

  return (
    template
      // Fuentes y logotipo incrustados: el HTML temporal vive fuera del kit.
      .replace("url('../06_tipografias/Outfit-Variable.woff2')", `url('${fonts.outfit}')`)
      .replace("url('../06_tipografias/Inter-Variable.woff2')", `url('${fonts.inter}')`)
      .replace('src="../01_logo/png/nodbu-logotipo-blanco-1200w.png"', `src="${logo}"`)
      // Contenido.
      .replace(/<span class="etiqueta">[^<]*<\/span>/, `<span class="etiqueta">${escape(label)}</span>`)
      .replace(
        /<h1>[\s\S]*?<\/h1>/,
        `<h1 style="font-size:${titleSize(title)}px;max-width:22ch">${escape(title)}</h1>`,
      )
      .replace(/<p>[\s\S]*?<\/p>/, `<p>${escape(description)}</p>`)
      .replace(/<div class="pie">[^<]*<\/div>/, `<div class="pie">${escape(domain)}</div>`)
  );
}

/* ---------------------------------------------------------------- main -- */

function main() {
  const chrome = findChrome();
  if (!chrome) {
    console.error(
      'No se encontro Google Chrome ni Chromium. Instala uno o indica la ruta en CHROME_PATH.\n' +
        'Sin imagenes propias los articulos usan la generica /og.png: la web se publica igual.',
    );
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE, 'utf8');
  const domain = readDomain();
  const labels = readCategoryLabels();
  const articles = readArticles();
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'nodbu-og-'));
  let generated = 0;

  for (const article of articles) {
    const out = path.join(OUT_DIR, `${article.slug}.png`);
    if (!force && fs.existsSync(out)) {
      console.log(`  = ${article.slug}.png (ya existe)`);
      continue;
    }

    const label = `${labels[article.category] ?? article.category} · Guía`;
    const html = buildHtml(template, { title: article.title, description: article.description, label, domain });
    const page = path.join(tmp, `${article.slug}.html`);
    fs.writeFileSync(page, html);

    execFileSync(
      chrome,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        '--window-size=1200,630',
        // Da tiempo a que las fuentes incrustadas se apliquen antes de capturar.
        '--virtual-time-budget=3000',
        `--screenshot=${out}`,
        `file://${page}`,
      ],
      { stdio: 'ignore' },
    );

    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`  + ${article.slug}.png (${kb} KB)`);
    generated += 1;
  }

  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`\n${generated} generada(s), ${articles.length - generated} ya existian. Carpeta: public/og/`);
}

main();
