import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { ArticleCard } from '@/components/recursos/ArticleCard';
import { ArticleCta } from '@/components/recursos/ArticleCta';
import { AuthorCard } from '@/components/recursos/AuthorCard';
import { Breadcrumbs } from '@/components/recursos/Breadcrumbs';
import { Mdx } from '@/components/recursos/Mdx';
import { TableOfContents } from '@/components/recursos/TableOfContents';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionGlow } from '@/components/ui/SectionGlow';
import { breadcrumbRoot, categoryLabels, resourcesPage } from '@/content/recursos';
import { site } from '@/content/site';
import { getAllArticleSlugs, getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import { formatDate } from '@/lib/dates';
import { articleGraph, articleUrl } from '@/lib/seo';

/**
 * Plantilla de artículo.
 *
 * EXPORT ESTATICO: `generateStaticParams` enumera los slugs en el build y
 * `dynamicParams = false` cierra la puerta a cualquier otro. Sin las dos cosas,
 * `output: 'export'` falla. Si se anade un .mdx, sale una carpeta nueva en /out
 * al recompilar; no hay nada que registrar a mano.
 *
 * ORDEN DE LECTURA (y por que este):
 *   migas -> eyebrow -> h1 -> TL;DR -> cuerpo -> FAQ -> CTA -> autor -> 3 mas
 *
 * El TL;DR va ARRIBA y sin scroll a proposito: responde el titular por si solo.
 * Es lo que hace que un buscador con IA pueda citar el articulo sin haberlo
 * leido entero, y de paso lo que deja que una persona con prisa se vaya con la
 * respuesta en veinte segundos.
 *
 * ANIMACION: `Reveal` solo en los bloques de primer nivel. Un articulo largo
 * con cada parrafo apareciendo al hacer scroll no se puede leer.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  const url = articleUrl(article.slug);

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [site.legalEntity.holder],
      images: [{ url: article.og, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.og],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(article.slug, 3);
  const category = categoryLabels[article.category];

  const graph = articleGraph(article, [
    { name: breadcrumbRoot.label, path: breadcrumbRoot.href },
    { name: resourcesPage.eyebrow, path: '/recursos' },
    { name: article.title },
  ]);

  return (
    <article className="relative overflow-hidden pb-section pt-28 sm:pt-32 lg:pt-36">
      <JsonLd data={graph} />
      {/* Unico resplandor del articulo. Ancla la cabecera, que es lo que se ve
          al llegar; mas abajo el texto no necesita luz de fondo. */}
      <SectionGlow className="left-1/2 top-0 h-[46vh] w-[110vw] -translate-x-1/2 lg:w-[64vw]" />

      <div className="shell relative">
        <Breadcrumbs
          items={[
            breadcrumbRoot,
            { label: resourcesPage.eyebrow, href: '/recursos/' },
            { label: article.title },
          ]}
        />

        {/* ---------------------------------------------------- cabecera -- */}
        <Reveal className="mt-8 block">
          <p className="eyebrow">
            {category.label} · Actualizado el {formatDate(article.updatedAt)} ·{' '}
            {article.readingMinutes} min de lectura
          </p>

          <h1 className="mt-4 max-w-4xl text-display-l text-balance">{article.title}</h1>
        </Reveal>

        {/* TL;DR. Visible sin hacer scroll: es la respuesta, no un resumen. */}
        <Reveal className="mt-8 block">
          <div className="glass-flat max-w-[68ch] border-l-2 border-l-nodbu p-6 sm:p-7">
            <p className="eyebrow">En corto</p>
            <p className="mt-3 text-body-l text-paper text-pretty">{article.tldr}</p>
          </div>
        </Reveal>

        {/* ------------------------------------------- cuerpo + indice ---- */}
        <div className="mt-14 gap-12 lg:grid lg:grid-cols-12">
          {/* El indice va DESPUES del cuerpo en el orden del HTML a proposito:
              quien navega con teclado o con lector de pantalla llega antes al
              articulo que a su indice. En escritorio cae igualmente a la
              derecha porque es la segunda columna de la rejilla, sin necesidad
              de reordenar nada por CSS. */}
          <div className="lg:col-span-8">
            <div className="prose-nodbu max-w-[68ch]">
              <Mdx source={article.content} />
            </div>
          </div>

          <aside className="hidden lg:col-span-4 lg:block">
            <TableOfContents headings={article.headings} />
          </aside>
        </div>

        {/* ------------------------------------------------------- FAQ ---- */}
        {article.faq.length > 0 ? (
          <Reveal className="mt-20 block">
            <div className="max-w-[68ch]">
              <h2 className="font-display text-display-m font-medium text-paper">
                Preguntas frecuentes
              </h2>
              <Accordion
                idPrefix={`faq-${article.slug}`}
                className="mt-6"
                defaultOpen={null}
                items={article.faq.map((item) => ({ question: item.q, answer: item.a }))}
              />
            </div>
          </Reveal>
        ) : null}

        {/* ------------------------------------------------- cierre ------- */}
        <Reveal className="mt-20 block">
          <ArticleCta source={`articulo-${article.slug}`} />
        </Reveal>

        <Reveal className="mt-16 block">
          <AuthorCard />
        </Reveal>

        {related.length > 0 ? (
          <Reveal className="mt-20 block">
            <h2 className="font-display text-display-m font-medium text-paper">Seguir leyendo</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <ArticleCard article={item} />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </article>
  );
}
