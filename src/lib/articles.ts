import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  ARTICLE_CATEGORIES,
  type Article,
  type ArticleCategory,
  type ArticleFaqItem,
  type ArticleHeading,
  type ArticleMeta,
} from '@/types/article';

/**
 * Carga, validacion y consulta de los artículos de /recursos.
 *
 * SOLO SE EJECUTA EN EL BUILD. Usa `fs`, asi que no puede importarse desde un
 * componente de cliente: si lo haces, el build revienta con un error de modulo
 * de Node en el navegador. Las paginas son componentes de servidor y llaman a
 * esto durante la exportacion estatica.
 *
 * VALIDACION: si un .mdx tiene el frontmatter mal, este modulo LANZA. Como se
 * ejecuta durante `next build`, eso tumba el build a proposito. Es preferible
 * no publicar a publicar un articulo sin `description` (se queda sin snippet en
 * Google) o con una fecha invalida (rompe el JSON-LD y el sitemap).
 */

const ARTICLES_DIR = path.join(process.cwd(), 'src', 'content', 'recursos');

/** OG generica del sitio, la que ya usa la landing. */
const DEFAULT_OG = '/og.png';

/** Velocidad de lectura en español. Ver la nota de `readingMinutes`. */
const WORDS_PER_MINUTE = 200;

/* ------------------------------------------------------------- validacion -- */

/**
 * Acumula los fallos de UN archivo y los lanza todos juntos.
 *
 * Es deliberado: si un articulo tiene tres campos mal, quien lo escribio quiere
 * verlos de una vez, no arreglar uno, recompilar, y descubrir el siguiente.
 */
class FrontmatterErrors {
  private readonly errors: string[] = [];
  private readonly file: string;

  constructor(file: string) {
    this.file = file;
  }

  add(field: string, problem: string): void {
    this.errors.push(`  · ${field}: ${problem}`);
  }

  throwIfAny(): void {
    if (this.errors.length === 0) return;
    throw new Error(
      `\n\nFrontmatter invalido en src/content/recursos/${this.file}\n` +
        `${this.errors.join('\n')}\n\n` +
        `Formato correcto y campos obligatorios: src/content/recursos/GUIA.md\n`,
    );
  }
}

function requireString(
  value: unknown,
  field: string,
  errors: FrontmatterErrors,
  { min, max }: { min?: number; max?: number } = {},
): string {
  if (typeof value !== 'string' || value.trim() === '') {
    errors.add(field, 'falta o esta vacio (tiene que ser texto)');
    return '';
  }
  const text = value.trim();
  if (min !== undefined && text.length < min) {
    errors.add(field, `tiene ${text.length} caracteres y el minimo son ${min}`);
  }
  if (max !== undefined && text.length > max) {
    errors.add(field, `tiene ${text.length} caracteres y el maximo son ${max}`);
  }
  return text;
}

/**
 * Saca el valor TAL CUAL SE ESCRIBIO de la cabecera cruda del .mdx.
 *
 * Hace falta para las fechas, y el motivo no es evidente: el YAML sin comillas
 * convierte `2026-08-05` en un Date de JavaScript antes de que nosotros lo
 * veamos, y JavaScript **desborda las fechas que no existen** en vez de
 * rechazarlas — `2026-02-30` se convierte en el 2 de marzo sin avisar. Si
 * validaramos el Date ya parseado, una errata de calendario entraria en el
 * sitemap y en el JSON-LD como una fecha distinta de la que puso el autor.
 *
 * Validando el texto literal, `2026-02-30` falla, que es lo que tiene que pasar.
 */
function rawFrontmatterValue(rawMatter: string, field: string): string | null {
  const match = new RegExp(`^\\s*${field}\\s*:\\s*(.+?)\\s*$`, 'm').exec(rawMatter);
  if (!match) return null;
  return match[1].replace(/^['"]|['"]$/g, '').trim();
}

/** Valida y normaliza una fecha a YYYY-MM-DD a partir de su texto literal. */
function requireIsoDate(literal: string | null, field: string, errors: FrontmatterErrors): string {
  if (literal === null || literal === '') {
    errors.add(field, 'falta (formato esperado: 2026-08-05)');
    return '';
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(literal)) {
    errors.add(field, `vale "${literal}" y tiene que ser YYYY-MM-DD, por ejemplo 2026-08-05`);
    return '';
  }

  const parsed = new Date(`${literal}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== literal) {
    errors.add(field, `vale "${literal}", que no existe en el calendario`);
    return '';
  }

  return literal;
}

function requireCategory(value: unknown, errors: FrontmatterErrors): ArticleCategory {
  if (typeof value !== 'string' || !ARTICLE_CATEGORIES.includes(value as ArticleCategory)) {
    errors.add(
      'category',
      `vale ${JSON.stringify(value)} y tiene que ser una de: ${ARTICLE_CATEGORIES.join(', ')}`,
    );
    return ARTICLE_CATEGORIES[0];
  }
  return value as ArticleCategory;
}

function optionalStringArray(value: unknown, field: string, errors: FrontmatterErrors): string[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    errors.add(field, 'tiene que ser una lista de textos, por ejemplo [whatsapp, crm]');
    return [];
  }
  return value.map((item: string) => item.trim()).filter(Boolean);
}

function optionalBoolean(value: unknown, field: string, errors: FrontmatterErrors): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value !== 'boolean') {
    errors.add(field, `vale ${JSON.stringify(value)} y tiene que ser true o false`);
    return false;
  }
  return value;
}

function optionalFaq(value: unknown, errors: FrontmatterErrors): ArticleFaqItem[] {
  if (value === undefined || value === null) return [];

  if (!Array.isArray(value)) {
    errors.add('faq', 'tiene que ser una lista de entradas con `q` y `a`');
    return [];
  }

  const items: ArticleFaqItem[] = [];
  value.forEach((raw, i) => {
    const entry = raw as Record<string, unknown> | null;
    const q = entry && typeof entry.q === 'string' ? entry.q.trim() : '';
    const a = entry && typeof entry.a === 'string' ? entry.a.trim() : '';
    if (!q || !a) {
      errors.add(`faq[${i}]`, 'necesita `q` (pregunta) y `a` (respuesta), las dos con texto');
      return;
    }
    items.push({ q, a });
  });
  return items;
}

/* ---------------------------------------------------------------- cuerpo -- */

/**
 * Replica el algoritmo de `github-slugger`, que es el que usa rehype-slug para
 * poner los `id` en los encabezados renderizados.
 *
 * Se reimplementa en vez de importar el paquete porque `github-slugger` solo
 * esta aqui como dependencia indirecta de rehype-slug, y depender de un modulo
 * que no declaramos es fragil. La equivalencia se comprueba contra el HTML real
 * generado en el build (ver DESIGN.md), no se da por supuesta.
 *
 * Conserva tildes y ñ a proposito: github-slugger tampoco las quita, asi que
 * "¿Cuánto cuesta?" produce `cuánto-cuesta` en los dos sitios. Si aqui se
 * normalizaran los acentos, los enlaces del indice apuntarian a anclas que no
 * existen.
 */
function createSlugger() {
  const seen = new Map<string, number>();

  return function slug(value: string): string {
    const base = value
      .toLowerCase()
      .trim()
      // Fuera puntuacion y simbolos; se conservan letras, numeros, marcas
      // diacriticas, espacios y guiones.
      .replace(/[^\p{L}\p{N}\p{M}\s-]/gu, '')
      .replace(/\s+/g, '-');

    const previous = seen.get(base) ?? 0;
    seen.set(base, previous + 1);
    return previous === 0 ? base : `${base}-${previous}`;
  };
}

/** Quita el marcado en linea para que el indice muestre texto limpio. */
function stripInlineMarkdown(text: string): string {
  return text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // [texto](url) -> texto
    .replace(/`([^`]*)`/g, '$1')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .trim();
}

/**
 * Saca los h2 y h3 del cuerpo para el indice lateral.
 *
 * Salta los bloques de codigo: un `## comentario` dentro de un ``` no es un
 * encabezado y no debe aparecer en el indice.
 */
function extractHeadings(body: string): ArticleHeading[] {
  const slug = createSlugger();
  const headings: ArticleHeading[] = [];
  let insideFence = false;

  for (const line of body.split('\n')) {
    if (/^\s{0,3}(```|~~~)/.test(line)) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const text = stripInlineMarkdown(match[2]);
    if (!text) continue;

    headings.push({
      id: slug(text),
      text,
      level: match[1].length as 2 | 3,
    });
  }

  return headings;
}

/**
 * Minutos de lectura a ~200 palabras/minuto.
 *
 * 200 y no las 225-250 que se citan para el ingles: en español la palabra media
 * es mas larga (mas silabas por palabra), asi que la misma persona lee menos
 * palabras por minuto. Se redondea y nunca baja de 1.
 *
 * Se descuentan bloques de codigo, etiquetas JSX y las URL de los enlaces, que
 * no se leen.
 */
function readingMinutes(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>|*_~-]/g, ' ');

  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/* ----------------------------------------------------------------- carga -- */

function readArticleFile(file: string): Article {
  const errors = new FrontmatterErrors(file);
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
  // `matter` es la cabecera cruda, sin los ---. Las fechas se validan desde ahi
  // y no desde `data`; el porque esta en rawFrontmatterValue.
  const { data, content, matter: rawMatter } = matter(raw);

  const title = requireString(data.title, 'title', errors, { max: 70 });
  // 150-160 es el rango que Google suele mostrar entero. Se avisa fuera de
  // 120-165 pero no se es mas estricto: cortar una frase por un caracter seria
  // peor que un snippet un pelin largo.
  const description = requireString(data.description, 'description', errors, { min: 120, max: 165 });
  const tldr = requireString(data.tldr, 'tldr', errors, { min: 150, max: 600 });
  const publishedAt = requireIsoDate(rawFrontmatterValue(rawMatter, 'publishedAt'), 'publishedAt', errors);

  // updatedAt es opcional: si no esta, el articulo no se ha revisado nunca y la
  // fecha de actualizacion es la de publicacion.
  const rawUpdatedAt = rawFrontmatterValue(rawMatter, 'updatedAt');
  const updatedAt =
    rawUpdatedAt === null ? publishedAt : requireIsoDate(rawUpdatedAt, 'updatedAt', errors);

  const category = requireCategory(data.category, errors);
  const tags = optionalStringArray(data.tags, 'tags', errors);
  const featured = optionalBoolean(data.featured, 'featured', errors);
  const draft = optionalBoolean(data.draft, 'draft', errors);
  const faq = optionalFaq(data.faq, errors);

  let og = DEFAULT_OG;
  if (data.og !== undefined && data.og !== null) {
    const declared = requireString(data.og, 'og', errors);
    if (declared && !declared.startsWith('/')) {
      errors.add('og', `vale "${declared}" y tiene que empezar por /, por ejemplo /og/mi-articulo.jpg`);
    } else if (declared) {
      og = declared;
    }
  }

  if (updatedAt && publishedAt && updatedAt < publishedAt) {
    errors.add('updatedAt', `(${updatedAt}) es anterior a publishedAt (${publishedAt})`);
  }

  // Un `style` en el cuerpo es un color escrito a mano fuera de
  // tailwind.config.ts, o sea la regla 2 rota desde un archivo de contenido.
  // Se comprueba aqui y no solo en la guia editorial: una regla que no falla el
  // build es una recomendacion, y las recomendaciones se saltan.
  const inlineStyle = /\sstyle\s*=\s*["'{]/.exec(content);
  if (inlineStyle) {
    const line = content.slice(0, inlineStyle.index).split('\n').length;
    errors.add(
      `cuerpo (linea ${line})`,
      'lleva un atributo `style`. Los articulos no pueden traer estilos en linea: ' +
        'si hace falta un bloque nuevo, se anade al mapa de componentes de Mdx.tsx',
    );
  }

  errors.throwIfAny();

  return {
    slug: file.replace(/\.mdx$/, ''),
    title,
    description,
    tldr,
    publishedAt,
    updatedAt,
    category,
    tags,
    featured,
    draft,
    og,
    faq,
    readingMinutes: readingMinutes(content),
    content,
    headings: extractHeadings(content),
  };
}

/**
 * Lee el directorio una sola vez por proceso.
 *
 * Durante el build cada ruta estatica pregunta por los articulos; sin esto se
 * releerian y revalidarian los mismos archivos decenas de veces.
 */
let cache: Article[] | null = null;

function loadAll(): Article[] {
  if (cache) return cache;

  if (!fs.existsSync(ARTICLES_DIR)) {
    cache = [];
    return cache;
  }

  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.mdx'))
    // Los que empiezan por _ son borradores locales que ni siquiera se leen.
    .filter((file) => !file.startsWith('_'));

  const articles = files.map(readArticleFile);

  // Mas reciente primero. Con la misma fecha, alfabetico por slug para que el
  // orden sea estable entre builds (si no, depende del sistema de archivos).
  articles.sort((a, b) =>
    a.publishedAt === b.publishedAt
      ? a.slug.localeCompare(b.slug, 'es')
      : b.publishedAt.localeCompare(a.publishedAt),
  );

  cache = articles;
  return cache;
}

function toMeta({ content: _content, headings: _headings, ...meta }: Article): ArticleMeta {
  return meta;
}

/* -------------------------------------------------------------- consulta -- */

/** Todos los artículos publicados, del mas reciente al mas antiguo. Sin borradores. */
export function getAllArticles(): ArticleMeta[] {
  return loadAll()
    .filter((article) => !article.draft)
    .map(toMeta);
}

/**
 * Un artículo por su slug, con cuerpo e indice.
 *
 * Devuelve `null` si no existe o es borrador, para que la ruta pueda llamar a
 * notFound() en vez de romper el build.
 */
export function getArticleBySlug(slug: string): Article | null {
  const article = loadAll().find((item) => item.slug === slug);
  if (!article || article.draft) return null;
  return article;
}

/**
 * Hasta `limit` artículos relacionados: primero los de la misma categoria y,
 * si no llegan, se completa con los mas recientes de cualquier otra.
 *
 * Asi una categoria con un solo articulo no deja el bloque medio vacio.
 */
export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const all = getAllArticles();
  const current = all.find((item) => item.slug === slug);
  if (!current) return all.slice(0, limit);

  const others = all.filter((item) => item.slug !== slug);
  const sameCategory = others.filter((item) => item.category === current.category);
  const rest = others.filter((item) => item.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

/**
 * Las categorias que tienen al menos un artículo, en el orden canonico de
 * ARTICLE_CATEGORIES (no por numero de articulos: el orden del hub es una
 * decision editorial fija).
 */
export function getCategories(): { category: ArticleCategory; count: number }[] {
  const articles = getAllArticles();
  return ARTICLE_CATEGORIES.map((category) => ({
    category,
    count: articles.filter((article) => article.category === category).length,
  })).filter((entry) => entry.count > 0);
}

/** El artículo marcado como `featured` mas reciente. Si no hay ninguno, el mas reciente. */
export function getFeaturedArticle(): ArticleMeta | null {
  const articles = getAllArticles();
  return articles.find((article) => article.featured) ?? articles[0] ?? null;
}

/** Slugs publicados. Lo consume `generateStaticParams`. */
export function getAllArticleSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}
