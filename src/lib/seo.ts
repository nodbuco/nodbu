import { countryNames } from '@/content/countries';
import { categoryLabels } from '@/content/recursos';
import { site } from '@/content/site';
import type { ArticleMeta, Article } from '@/types/article';

/**
 * Constructores de URL y de datos estructurados.
 *
 * ------------------------------------------------------------------------
 * REGLA DE ORO DE LAS URL: TODAS ACABAN EN BARRA.
 * ------------------------------------------------------------------------
 * El sitio se compila con `trailingSlash: true`, asi que cada ruta es una
 * carpeta con su index.html y Apache la sirve por DirectoryIndex. Si la
 * canonica dijera /recursos y el sitemap /recursos/, estariamos declarando dos
 * URL para la misma pagina y repartiendo su autoridad entre las dos.
 *
 * Por eso NADIE escribe rutas a mano: se piden a `absoluteUrl()`, que garantiza
 * la barra. La home es el unico caso especial: `absoluteUrl('/')` devuelve el
 * dominio con su barra final.
 *
 * ------------------------------------------------------------------------
 * ESTRUCTURA DEL GRAFO JSON-LD
 * ------------------------------------------------------------------------
 * Un solo grafo por documento, con @id estables y SIN nodos repetidos:
 *
 *   layout.tsx (en TODAS las paginas)     cada pagina, ademas
 *   ─────────────────────────────────     ──────────────────────────────
 *   Organization    #organization         CollectionPage  <url>#webpage
 *   WebSite         #website              BlogPosting     <url>#article
 *   Person          #diego                BreadcrumbList  <url>#breadcrumb
 *                                         FAQPage         <url>#faq
 *
 * Los tres nodos globales se definen UNA vez, en el layout. Las paginas los
 * REFERENCIAN por @id (`{ '@id': ORGANIZATION_ID }`) en vez de volver a
 * describirlos. Los dos bloques <script> del documento se leen como un mismo
 * grafo, asi que la referencia resuelve; si cada pagina redefiniera la
 * organizacion, tendriamos el mismo @id descrito dos veces en el mismo HTML,
 * que es justo lo que hay que evitar.
 */

/* -------------------------------------------------------------------- URL -- */

/** Ruta absoluta y con barra final. Es la unica forma valida en el sitio. */
export function absoluteUrl(path = '/'): string {
  if (!path.startsWith('/')) throw new Error(`absoluteUrl: la ruta "${path}" tiene que empezar por /`);
  const withSlash = path.endsWith('/') ? path : `${path}/`;
  return `${site.url}${withSlash}`;
}

/**
 * Ruta relativa de un artículo. Es el UNICO sitio donde se compone: los
 * componentes la piden, no la construyen.
 */
export function articlePath(slug: string): string {
  return `${site.routes.resources}${slug}/`;
}

/** URL canonica de un artículo. */
export function articleUrl(slug: string): string {
  return absoluteUrl(articlePath(slug));
}

export const ORGANIZATION_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;
export const PERSON_ID = `${site.url}/#diego`;

/** Referencia a un nodo ya definido en el grafo del layout. */
const ref = (id: string) => ({ '@id': id });

/* ---------------------------------------------------------- nodos globales -- */

/**
 * Los tres nodos que van en TODAS las paginas. Solo los emite el layout raiz.
 *
 * `Organization` lleva tambien el tipo `ProfessionalService`, que es lo que
 * habia antes en layout.tsx: un mismo nodo puede tener varios tipos, asi que se
 * conservan `priceRange`, `serviceType` y `areaServed` sin necesidad de un
 * segundo nodo que compitiera con este por representar a la empresa.
 */
export function globalGraph(description: string) {
  const sameAs = Object.values(site.social).filter((url) => url !== '');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': ORGANIZATION_ID,
        name: site.name,
        alternateName: 'NODBU Automatización',
        description,
        url: absoluteUrl('/'),
        logo: {
          '@type': 'ImageObject',
          url: `${site.url}/brand/logo-full-white.svg`,
        },
        image: `${site.url}/og.png`,
        email: site.email,
        telephone: `+${site.whatsapp.number}`,
        priceRange: '$$',
        ...(sameAs.length > 0 ? { sameAs } : {}),
        founder: ref(PERSON_ID),
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.legalEntity.address,
          addressLocality: site.legalEntity.city,
          addressCountry: 'CO',
        },
        areaServed: countryNames.map((name) => ({ '@type': 'Country', name })),
        availableLanguage: [{ '@type': 'Language', name: 'Español' }],
        serviceType: [
          'Automatización de procesos de negocio',
          'Integración de sistemas',
          'Automatización de atención por WhatsApp',
          'Automatización de cotizaciones y facturación',
          'Desarrollo de software a la medida',
          'Desarrollo de chatbots de ventas',
          'Sistemas de gestión de pedidos',
          'Diseño y desarrollo de páginas web',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'ventas',
          email: site.email,
          telephone: `+${site.whatsapp.number}`,
          availableLanguage: 'Español',
        },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: absoluteUrl('/'),
        name: site.name,
        description,
        inLanguage: 'es',
        publisher: ref(ORGANIZATION_ID),
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: site.legalEntity.holder,
        jobTitle: site.legalEntity.role,
        url: absoluteUrl('/sobre-nodbu'),
        worksFor: ref(ORGANIZATION_ID),
      },
    ],
  };
}

/* ------------------------------------------------------- nodos por pagina -- */

export type BreadcrumbEntry = { name: string; path?: string };

/**
 * BreadcrumbList. El ultimo nivel va SIN `item`: es la pagina actual y no se
 * enlaza a si misma.
 */
function breadcrumbNode(url: string, entries: BreadcrumbEntry[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: entries.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      ...(entry.path ? { item: absoluteUrl(entry.path) } : {}),
    })),
  };
}

/** Grafo del hub: la coleccion, la lista de articulos y las migas. */
export function collectionGraph({
  title,
  description,
  articles,
  breadcrumbs,
}: {
  title: string;
  description: string;
  articles: ArticleMeta[];
  breadcrumbs: BreadcrumbEntry[];
}) {
  const url = absoluteUrl('/recursos');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: 'es',
        isPartOf: ref(WEBSITE_ID),
        publisher: ref(ORGANIZATION_ID),
        breadcrumb: ref(`${url}#breadcrumb`),
        mainEntity: ref(`${url}#itemlist`),
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#itemlist`,
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: articles.length,
        itemListElement: articles.map((article, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: articleUrl(article.slug),
          name: article.title,
        })),
      },
      breadcrumbNode(url, breadcrumbs),
    ],
  };
}

/**
 * Grafo de un artículo: BlogPosting, migas y, si tiene preguntas, FAQPage.
 *
 * `author` y `publisher` apuntan por @id a los nodos del layout. El FAQPage
 * solo aparece cuando hay `faq`: declarar un FAQPage vacio es peor que no
 * declararlo.
 */
export function articleGraph(article: Article, breadcrumbs: BreadcrumbEntry[]) {
  const url = articleUrl(article.slug);

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: article.title,
      description: article.description,
      // El TL;DR es literalmente el resumen del articulo: se marca como tal
      // para que un buscador que cite la pieza tenga de donde sacar la
      // respuesta corta sin recortar el cuerpo por su cuenta.
      abstract: article.tldr,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: ref(PERSON_ID),
      publisher: ref(ORGANIZATION_ID),
      mainEntityOfPage: url,
      url,
      image: `${site.url}${article.og}`,
      inLanguage: 'es',
      isPartOf: ref(WEBSITE_ID),
      articleSection: categoryLabels[article.category].label,
      ...(article.tags.length > 0 ? { keywords: article.tags.join(', ') } : {}),
      timeRequired: `PT${article.readingMinutes}M`,
      breadcrumb: ref(`${url}#breadcrumb`),
    },
    breadcrumbNode(url, breadcrumbs),
  ];

  if (article.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: article.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

/**
 * Grafo de /sobre-nodbu: la pagina y sus migas.
 *
 * La Person NO se redefine aqui: ya esta en el grafo del layout con el mismo
 * @id. `mainEntity` la referencia, que es lo que convierte esta pagina en la
 * pagina "de" esa persona sin duplicar el nodo.
 */
export function aboutGraph({
  title,
  description,
  breadcrumbs,
}: {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbEntry[];
}) {
  const url = absoluteUrl('/sobre-nodbu');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: 'es',
        isPartOf: ref(WEBSITE_ID),
        about: ref(ORGANIZATION_ID),
        mainEntity: ref(PERSON_ID),
        breadcrumb: ref(`${url}#breadcrumb`),
      },
      breadcrumbNode(url, breadcrumbs),
    ],
  };
}
