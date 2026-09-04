import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { IntegrationCard } from '@/components/integraciones/IntegrationCard';
import { IntegrationPair } from '@/components/integraciones/IntegrationPair';
import { ArticleCard } from '@/components/recursos/ArticleCard';
import { ArticleCta } from '@/components/recursos/ArticleCta';
import { Breadcrumbs } from '@/components/recursos/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionGlow } from '@/components/ui/SectionGlow';
import { integrationsPage } from '@/content/integraciones';
import { breadcrumbRoot } from '@/content/recursos';
import { site } from '@/content/site';
import { getAllArticles } from '@/lib/articles';
import { getAllIntegrationSlugs, getIntegrationBySlug, getRelatedIntegrations } from '@/lib/integraciones';
import { integrationGraph, integrationUrl } from '@/lib/seo';

/**
 * Pagina de una integracion: /integraciones/<slug>/.
 *
 * EXPORT ESTATICO: generateStaticParams enumera los slugs y dynamicParams =
 * false cierra el resto. Anadir un par en content/integraciones.ts saca una
 * carpeta nueva en /out al recompilar.
 *
 * ORDEN DE LECTURA: migas -> par de logos + h1 -> descripcion -> problema ->
 * flujo -> usos -> requisitos -> FAQ -> CTA -> guias -> otras integraciones.
 * Los h2 son preguntas, como en los articulos: es lo que un buscador con IA
 * puede citar.
 *
 * Reveal solo en bloques de primer nivel.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllIntegrationSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const integration = getIntegrationBySlug(params.slug);
  if (!integration) return {};

  const url = integrationUrl(integration.slug);
  const title = `${integration.title}: ${integration.headline}`;

  return {
    title,
    description: integration.description,
    keywords: integration.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description: integration.description,
    },
  };
}

const h2 = 'font-display text-display-m font-medium text-paper text-balance';

export default function IntegracionPage({ params }: { params: { slug: string } }) {
  const integration = getIntegrationBySlug(params.slug);
  if (!integration) notFound();

  const labels = integrationsPage.labels;

  // Las guias relacionadas se validan aqui: un slug que no exista es un error
  // de contenido y tiene que tumbar el build, no salir como enlace roto.
  const all = getAllArticles();
  const articles = integration.articles.map((slug) => {
    const article = all.find((item) => item.slug === slug);
    if (!article) {
      throw new Error(
        `integraciones.ts › "${integration.slug}": la guia "${slug}" no existe en src/content/recursos/`,
      );
    }
    return article;
  });

  const related = getRelatedIntegrations(integration.slug, 3);

  const graph = integrationGraph(integration, [
    { name: breadcrumbRoot.label, path: breadcrumbRoot.href },
    { name: integrationsPage.eyebrow, path: site.routes.integrations },
    { name: integration.title },
  ]);

  return (
    <article className="relative overflow-hidden pb-section pt-28 sm:pt-32 lg:pt-36">
      <JsonLd data={graph} />
      <SectionGlow className="left-1/2 top-0 h-[46vh] w-[110vw] -translate-x-1/2 lg:w-[64vw]" />

      <div className="shell relative">
        <Breadcrumbs
          items={[
            breadcrumbRoot,
            { label: integrationsPage.eyebrow, href: site.routes.integrations },
            { label: integration.title },
          ]}
        />

        {/* ---------------------------------------------------- cabecera -- */}
        <Reveal className="mt-8 block">
          <IntegrationPair tools={integration.tools} size="lg" />
          <p className="eyebrow mt-8">
            {integrationsPage.eyebrow} · {integration.title}
          </p>
          <h1 className="mt-4 max-w-4xl text-display-l text-balance">{integration.headline}</h1>
          <p className="mt-6 max-w-2xl text-body-l text-paper-muted text-pretty">{integration.description}</p>
        </Reveal>

        <div className="mt-14 max-w-[68ch]">
          {/* ---------------------------------------------------- problema -- */}
          <Reveal className="block">
            <h2 className={h2}>{labels.problem}</h2>
            {integration.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-5 text-body-l text-paper-muted text-pretty">
                {paragraph}
              </p>
            ))}
          </Reveal>

          {/* ------------------------------------------------------- flujo -- */}
          <Reveal className="mt-16 block">
            <h2 className={h2}>{labels.flow}</h2>
            <ol className="relative mt-8 flex flex-col gap-7 pl-10 sm:pl-14">
              <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-hairline sm:left-[15px]" />
              {integration.flow.map((step, i) => (
                <li key={step.label} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-10 top-1 grid h-[15px] w-[15px] place-items-center rounded-full border border-hairline bg-ink sm:-left-14"
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-paper-faint" />
                  </span>
                  <span className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-mono text-mono-l text-paper-faint">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-body-l font-medium text-paper">{step.label}</span>
                  </span>
                  <p className="mt-2 text-body-s text-paper-muted text-pretty">{step.detail}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* -------------------------------------------- usos y requisitos -- */}
          <Reveal className="mt-16 block">
            <h2 className={h2}>{labels.useCases}</h2>
            <ul className="mt-6 flex flex-col gap-3 pl-6 text-body-l text-paper-muted marker:text-paper-faint list-disc">
              {integration.useCases.map((useCase) => (
                <li key={useCase} className="text-pretty">
                  {useCase}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-16 block">
            <h2 className={h2}>{labels.requirements}</h2>
            <ul className="mt-6 flex flex-col gap-3 pl-6 text-body-l text-paper-muted marker:text-paper-faint list-disc">
              {integration.requirements.map((requirement) => (
                <li key={requirement} className="text-pretty">
                  {requirement}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* --------------------------------------------------------- FAQ -- */}
          <Reveal className="mt-20 block">
            <h2 className={h2}>{labels.faq}</h2>
            <Accordion
              idPrefix={`faq-${integration.slug}`}
              className="mt-6"
              defaultOpen={null}
              items={integration.faq.map((item) => ({ question: item.q, answer: item.a }))}
            />
          </Reveal>

          {/* --------------------------------------------------------- CTA -- */}
          <Reveal className="mt-20 block">
            <ArticleCta source={`integracion-${integration.slug}`} />
          </Reveal>
        </div>

        {/* ------------------------------------------------- relacionados -- */}
        {articles.length > 0 ? (
          <Reveal className="mt-20 block">
            <h2 className={h2}>{labels.articles}</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((item) => (
                <li key={item.slug}>
                  <ArticleCard article={item} />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {related.length > 0 ? (
          <Reveal className="mt-20 block">
            <h2 className={h2}>{labels.related}</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <IntegrationCard integration={item} />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </article>
  );
}
