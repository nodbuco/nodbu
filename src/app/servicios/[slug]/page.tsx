import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { IntegrationCard } from '@/components/integraciones/IntegrationCard';
import { ArticleCard } from '@/components/recursos/ArticleCard';
import { ArticleCta } from '@/components/recursos/ArticleCta';
import { Breadcrumbs } from '@/components/recursos/Breadcrumbs';
import { ServiceCard } from '@/components/servicios/ServiceCard';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { SectionGlow } from '@/components/ui/SectionGlow';
import { breadcrumbRoot } from '@/content/recursos';
import { servicesPage } from '@/content/servicios';
import { site } from '@/content/site';
import { getAllArticles } from '@/lib/articles';
import { getIntegrationBySlug } from '@/lib/integraciones';
import { ogImage, resolveOg } from '@/lib/og';
import { getAllServiceSlugs, getRelatedServices, getServiceBySlug } from '@/lib/servicios';
import { serviceGraph, serviceUrl } from '@/lib/seo';

/**
 * Pagina de un servicio: /servicios/<slug>/.
 *
 * Mismo esqueleto que /integraciones/<slug>/: generateStaticParams +
 * dynamicParams = false, h2 en forma de pregunta, Reveal solo en bloques de
 * primer nivel. Las integraciones y guias relacionadas se validan aqui: un
 * slug que no exista tumba el build en vez de salir como enlace roto.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};

  const url = serviceUrl(service.slug);
  const title = `${service.title}: ${service.headline}`;

  return {
    title,
    description: service.description,
    keywords: service.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description: service.description,
      images: ogImage(resolveOg(service.slug), service.title),
    },
  };
}

const h2 = 'font-display text-display-m font-medium text-paper text-balance';
const list = 'mt-6 flex flex-col gap-3 pl-6 text-body-l text-paper-muted marker:text-paper-faint list-disc';

export default function ServicioPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const labels = servicesPage.labels;
  const Icon = service.icon;

  const integrations = service.integrations.map((slug) => {
    const integration = getIntegrationBySlug(slug);
    if (!integration) {
      throw new Error(`servicios.ts › "${service.slug}": la integracion "${slug}" no existe en integraciones.ts`);
    }
    return integration;
  });

  const all = getAllArticles();
  const articles = service.articles.map((slug) => {
    const article = all.find((item) => item.slug === slug);
    if (!article) {
      throw new Error(`servicios.ts › "${service.slug}": la guia "${slug}" no existe en src/content/recursos/`);
    }
    return article;
  });

  const related = getRelatedServices(service.slug, 3);

  const graph = serviceGraph(service, [
    { name: breadcrumbRoot.label, path: breadcrumbRoot.href },
    { name: servicesPage.eyebrow, path: site.routes.services },
    { name: service.title },
  ]);

  return (
    <article className="relative overflow-hidden pb-section pt-28 sm:pt-32 lg:pt-36">
      <JsonLd data={graph} />
      <SectionGlow className="left-1/2 top-0 h-[46vh] w-[110vw] -translate-x-1/2 lg:w-[64vw]" />

      <div className="shell relative">
        <Breadcrumbs
          items={[
            breadcrumbRoot,
            { label: servicesPage.eyebrow, href: site.routes.services },
            { label: service.title },
          ]}
        />

        {/* ---------------------------------------------------- cabecera -- */}
        <Reveal className="mt-8 block">
          <span
            aria-hidden="true"
            className="grid h-14 w-14 place-items-center rounded-glass border border-hairline bg-paper/[.04] text-paper-muted"
          >
            <Icon size={26} strokeWidth={1.6} />
          </span>
          <p className="eyebrow mt-8">
            {servicesPage.eyebrow} · {service.kind === 'a-medida' ? 'Software a la medida' : service.title}
          </p>
          <h1 className="mt-4 max-w-4xl text-display-l text-balance">{service.headline}</h1>
          <p className="mt-6 max-w-2xl text-body-l text-paper-muted text-pretty">{service.result}</p>
        </Reveal>

        <div className="mt-14 max-w-[68ch]">
          <Reveal className="block">
            <h2 className={h2}>{labels.problem}</h2>
            {service.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-5 text-body-l text-paper-muted text-pretty">
                {paragraph}
              </p>
            ))}
          </Reveal>

          {/* ------------------------------------------------------- pasos -- */}
          <Reveal className="mt-16 block">
            <h2 className={h2}>{labels.steps}</h2>
            <ol className="relative mt-8 flex flex-col gap-7 pl-10 sm:pl-14">
              <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-hairline sm:left-[15px]" />
              {service.steps.map((step, i) => (
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

          <Reveal className="mt-16 block">
            <h2 className={h2}>{labels.deliverables}</h2>
            <ul className={list}>
              {service.deliverables.map((item) => (
                <li key={item} className="text-pretty">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-16 block">
            <h2 className={h2}>{labels.forWhom}</h2>
            <ul className={list}>
              {service.forWhom.map((item) => (
                <li key={item} className="text-pretty">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="mt-20 block">
            <h2 className={h2}>{labels.faq}</h2>
            <Accordion
              idPrefix={`faq-${service.slug}`}
              className="mt-6"
              defaultOpen={null}
              items={service.faq.map((item) => ({ question: item.q, answer: item.a }))}
            />
          </Reveal>

          <Reveal className="mt-20 block">
            <ArticleCta source={`servicio-${service.slug}`} />
          </Reveal>
        </div>

        {/* ------------------------------------------------- relacionados -- */}
        {integrations.length > 0 ? (
          <Reveal className="mt-20 block">
            <h2 className={h2}>{labels.integrations}</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {integrations.map((item) => (
                <li key={item.slug}>
                  <IntegrationCard integration={item} />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

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
                  <ServiceCard service={item} />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </article>
  );
}
