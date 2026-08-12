import { site } from '@/content/site';
import type { ArticleCategory } from '@/types/article';

/**
 * Todo el texto de la seccion /recursos que no vive dentro de un .mdx.
 *
 * Los articulos traen su propio copy en su frontmatter y su cuerpo; aqui esta
 * lo que envuelve: el hub, las etiquetas de las categorias, la ficha de autor y
 * el bloque de llamada a la accion que cierra cada artículo.
 *
 * Los enlaces de contacto NO se escriben aqui: salen de site.ts.
 */

/* Las rutas del sitio viven en site.ts (`site.routes`), no aqui. */

/** Cabecera del hub. El title es el unico h1 de esa pagina. */
export const resourcesPage = {
  eyebrow: 'Recursos',
  title: 'Automatización explicada sin tecnicismos',
  lead:
    'Guías prácticas para dueños y gerentes de PyME que quieren dejar de hacer trabajo repetitivo ' +
    'a mano. Sin jerga, sin promesas de resultados y sin cifras inventadas.',
  /** Encabezado de la rejilla, debajo del artículo destacado. */
  allHeading: 'Todos los artículos',
  /** Texto del chip que quita el filtro de categoría. */
  allCategoriesLabel: 'Todos',
  /** Se ve cuando todavía no hay ningún artículo publicado. */
  empty: 'Todavía no hay artículos publicados. Vuelve pronto.',
} as const;

/**
 * Etiquetas visibles de cada categoria.
 *
 * Los identificadores viven en types/article.ts porque son datos; esto es copy
 * y por eso esta en /src/content. La descripcion se usa como entradilla cuando
 * se filtra por esa categoria.
 */
export const categoryLabels: Record<ArticleCategory, { label: string; description: string }> = {
  automatizacion: {
    label: 'Automatización',
    description: 'Procesos que dejan de hacerse a mano.',
  },
  'inteligencia-artificial': {
    label: 'Inteligencia artificial',
    description: 'Qué hace hoy la IA en una PyME y qué todavía no.',
  },
  herramientas: {
    label: 'Herramientas',
    description: 'CRM, hojas de cálculo, facturación y mensajería.',
  },
  gestion: {
    label: 'Gestión',
    description: 'Cómo organizar el trabajo antes de automatizarlo.',
  },
};

/**
 * Ficha del autor al pie de cada artículo.
 *
 * El nombre y el cargo salen de site.legalEntity: aqui solo va la biografia,
 * que es lo unico editable.
 */
export const authorCard = {
  heading: 'Quién escribe esto',
  bio:
    'Llevo la automatización de procesos en NODBU. Escribo sobre lo que veo implantando estos ' +
    'flujos en empresas reales: qué ahorra tiempo de verdad, qué se abandona a las dos semanas y ' +
    'qué no compensa automatizar.',
  linkLabel: 'Más sobre NODBU y quién está detrás',
} as const;

/** Bloque de llamada a la accion que cierra cada artículo. */
export const articleCta = {
  eyebrow: 'Siguiente paso',
  title: '¿Quieres saber qué se puede automatizar en tu negocio?',
  lead:
    'Te lo decimos en una llamada de 15 minutos, mirando tus procesos reales. Si no hay nada que ' +
    'valga la pena automatizar, te lo decimos también.',
} as const;

/** Migas de pan. El ultimo nivel lo pone cada pagina. */
export const breadcrumbRoot = { label: 'Inicio', href: site.routes.home } as const;
