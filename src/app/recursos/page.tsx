import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { ArticleCard } from '@/components/recursos/ArticleCard';
import { Breadcrumbs } from '@/components/recursos/Breadcrumbs';
import { CategoryFilter } from '@/components/recursos/CategoryFilter';
import { Reveal } from '@/components/ui/Reveal';
import { SectionGlow } from '@/components/ui/SectionGlow';
import { breadcrumbRoot, resourcesPage } from '@/content/recursos';
import { getAllArticles, getFeaturedArticle } from '@/lib/articles';
import { absoluteUrl, collectionGraph } from '@/lib/seo';

/**
 * Hub de /recursos.
 *
 * Un solo h1 (el titulo de la seccion); los titulos de las tarjetas son h3 y
 * cuelgan del h2 "Todos los articulos", asi que el esquema de encabezados no
 * salta niveles.
 *
 * Un unico SectionGlow, anclado al bloque destacado.
 */

export const metadata: Metadata = {
  title: resourcesPage.title,
  description: resourcesPage.lead,
  alternates: { canonical: absoluteUrl('/recursos') },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/recursos'),
    title: resourcesPage.title,
    description: resourcesPage.lead,
  },
};

export default function RecursosPage() {
  const articles = getAllArticles();
  const featured = getFeaturedArticle();
  const rest = featured ? articles.filter((article) => article.slug !== featured.slug) : articles;

  const graph = collectionGraph({
    title: resourcesPage.title,
    description: resourcesPage.lead,
    articles,
    breadcrumbs: [
      { name: breadcrumbRoot.label, path: breadcrumbRoot.href },
      { name: resourcesPage.eyebrow },
    ],
  });

  return (
    <section className="relative overflow-hidden pb-section pt-28 sm:pt-32 lg:pt-36">
      <JsonLd data={graph} />
      <SectionGlow className="left-1/2 top-[18%] h-[52vh] w-[110vw] -translate-x-1/2 lg:w-[70vw]" />

      <div className="shell relative">
        <Breadcrumbs items={[breadcrumbRoot, { label: resourcesPage.eyebrow }]} />

        <Reveal>
          <p className="eyebrow mt-8">{resourcesPage.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-display-l text-balance">{resourcesPage.title}</h1>
          <p className="mt-5 max-w-2xl text-body-l text-paper-muted text-pretty">
            {resourcesPage.lead}
          </p>
        </Reveal>

        {articles.length === 0 ? (
          <p className="mt-16 text-body-l text-paper-muted">{resourcesPage.empty}</p>
        ) : (
          <>
            {featured ? (
              <Reveal className="mt-14 block">
                <ArticleCard article={featured} featured />
              </Reveal>
            ) : null}

            {rest.length > 0 ? (
              <div className="mt-16">
                <h2 className="font-display text-display-m font-medium text-paper">
                  {resourcesPage.allHeading}
                </h2>
                <CategoryFilter articles={rest} />
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
