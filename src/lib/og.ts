import fs from 'node:fs';
import path from 'node:path';

/**
 * Resuelve la imagen OG de una pagina con slug.
 *
 * Regla, en este orden:
 *   1. Si la pagina declara una ruta (el `og` del frontmatter), esa.
 *   2. Si existe public/og/<slug>.png, esa. Las de los articulos las genera
 *      `npm run og` (scripts/og.mjs) a partir de la plantilla del kit.
 *   3. Si no, la generica del sitio.
 *
 * Asi publicar nunca depende de tener la imagen lista, y a la vez cualquier
 * PNG que se deje en public/og/ con el nombre correcto entra solo, sin tocar
 * ningun frontmatter ni ningun archivo de contenido.
 *
 * SOLO EN EL BUILD: usa `fs`, asi que no puede importarse desde un
 * componente de cliente. Lo consumen articles.ts y las paginas de servidor.
 */

/** La generica del sitio, la que ya usa la landing. */
export const GENERIC_OG = '/og.png';

const OG_DIR = path.join(process.cwd(), 'public', 'og');

export function resolveOg(slug: string, declared?: string): string {
  if (declared) return declared;
  return fs.existsSync(path.join(OG_DIR, `${slug}.png`)) ? `/og/${slug}.png` : GENERIC_OG;
}

/** El bloque `images` de openGraph, ya con medidas. */
export function ogImage(url: string, alt: string) {
  return [{ url, width: 1200, height: 630, alt }];
}
