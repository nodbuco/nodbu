/**
 * Tipos de la seccion de artículos (/recursos).
 *
 * El frontmatter que se escribe a mano en cada .mdx es "crudo": puede venir
 * incompleto o con una fecha mal puesta. `src/lib/articles.ts` lo valida y
 * devuelve `Article`/`ArticleMeta`, que ya son de fiar: todos sus campos
 * existen y tienen el tipo correcto.
 *
 * La guia para escribir el frontmatter esta en src/content/recursos/GUIA.md.
 */

/**
 * Las cuatro categorias posibles. Es una lista cerrada a proposito: una
 * categoria nueva es una decision editorial, no algo que aparezca por escribir
 * mal una palabra en un frontmatter.
 *
 * El orden de este array es el orden en que se muestran en el hub.
 * Las ETIQUETAS visibles no van aqui, van en src/content/recursos.ts: aqui solo
 * viven los identificadores, que son datos, no copy.
 */
export const ARTICLE_CATEGORIES = [
  'automatizacion',
  'inteligencia-artificial',
  'herramientas',
  'gestion',
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

/** Una pregunta del bloque FAQ del artículo. Alimenta el acordeon y el FAQPage. */
export type ArticleFaqItem = {
  q: string;
  /** Respuesta autocontenida: tiene que entenderse sin haber leido el articulo. */
  a: string;
};

/** Un encabezado del cuerpo, para el indice lateral. */
export type ArticleHeading = {
  /** Coincide con el id que rehype-slug pone en el <h2>/<h3> renderizado. */
  id: string;
  text: string;
  level: 2 | 3;
};

/**
 * Artículo ya validado, SIN el cuerpo.
 *
 * Es lo que devuelven las funciones de listado. No lleva `content` para no
 * arrastrar el MDX entero de seis articulos dentro del payload del hub.
 */
export type ArticleMeta = {
  /** Sale del nombre del archivo, nunca del frontmatter. */
  slug: string;
  title: string;
  description: string;
  tldr: string;
  /** Siempre normalizada a YYYY-MM-DD. */
  publishedAt: string;
  /** Siempre normalizada a YYYY-MM-DD. Si no se declara, igual que publishedAt. */
  updatedAt: string;
  category: ArticleCategory;
  tags: string[];
  featured: boolean;
  draft: boolean;
  /** Ruta de la imagen OG. Ya resuelta: si el articulo no trae, la generica. */
  og: string;
  faq: ArticleFaqItem[];
  /** Calculado a ~200 palabras/minuto. Nunca se escribe a mano. */
  readingMinutes: number;
};

/** Artículo completo: la metadata mas el cuerpo y su indice. */
export type Article = ArticleMeta & {
  /** Cuerpo MDX sin el frontmatter, tal cual, listo para compilar. */
  content: string;
  headings: ArticleHeading[];
};
