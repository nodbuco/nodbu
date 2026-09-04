import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { CaseStudies } from '@/components/casos/CaseStudies';
import { ArticleCta } from '@/components/recursos/ArticleCta';
import { Breadcrumbs } from '@/components/recursos/Breadcrumbs';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat';
import { Reveal } from '@/components/ui/Reveal';
import { SectionGlow } from '@/components/ui/SectionGlow';
import { casesPage } from '@/content/casos';
import { breadcrumbRoot } from '@/content/recursos';
import { site } from '@/content/site';
import { absoluteUrl, casesGraph } from '@/lib/seo';

/**
 * /casos/ — los seis testimonios contados como caso: problema, flujo y
 * resultado.
 *
 * ES UNA SUBPAGINA Y NO UNA SECCION DE LA LANDING a proposito. La portada ya
 * lleva las resenas en su carrusel; repetirlas desarrolladas la alargaria sin
 * anadir nada a quien solo quiere saber que hace NODBU. Aqui llega quien ya
 * esta comparando y quiere ver "uno como el mio".
 *
 * Un solo h1 (el titulo de la pagina); cada caso es un h2.
 */

export const metadata: Metadata = {
  title: casesPage.title,
  description: casesPage.lead,
  alternates: { canonical: absoluteUrl(site.routes.cases) },
  openGraph: {
    type: 'website',
    url: absoluteUrl(site.routes.cases),
    title: casesPage.title,
    description: casesPage.lead,
  },
};

export default function CasosPage() {
  const graph = casesGraph({
    title: casesPage.title,
    description: casesPage.lead,
    breadcrumbs: [
      { name: breadcrumbRoot.label, path: breadcrumbRoot.href },
      { name: casesPage.eyebrow },
    ],
  });

  return (
    <>
      <JsonLd data={graph} />
      <Navbar />

      <main id="contenido" className="relative overflow-hidden pb-section pt-28 sm:pt-32 lg:pt-36">
        {/* Unico resplandor de la pagina: ancla la cabecera. */}
        <SectionGlow className="left-1/2 top-0 h-[46vh] w-[110vw] -translate-x-1/2 lg:w-[64vw]" />

        <div className="shell relative">
          <Breadcrumbs items={[breadcrumbRoot, { label: casesPage.eyebrow }]} />

          <Reveal className="mt-8 block">
            <p className="eyebrow">{casesPage.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-display-l text-balance">{casesPage.title}</h1>
            <p className="mt-5 max-w-2xl text-body-l text-paper-muted text-pretty">{casesPage.lead}</p>
          </Reveal>

          <CaseStudies />

          <Reveal className="mt-10 block">
            <p className="max-w-2xl text-body-s text-paper-faint text-pretty">{casesPage.note}</p>
          </Reveal>

          <Reveal className="mt-20 block">
            <ArticleCta source="casos" />
          </Reveal>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
