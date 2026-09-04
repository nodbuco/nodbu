import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { IntegrationCard } from '@/components/integraciones/IntegrationCard';
import { Breadcrumbs } from '@/components/recursos/Breadcrumbs';
import { buttonStyles } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionGlow } from '@/components/ui/SectionGlow';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { integrationsPage } from '@/content/integraciones';
import { breadcrumbRoot } from '@/content/recursos';
import { site } from '@/content/site';
import { getAllIntegrations } from '@/lib/integraciones';
import { GENERIC_OG, ogImage } from '@/lib/og';
import { absoluteUrl, integrationsHubGraph } from '@/lib/seo';

/**
 * Hub de /integraciones/. Una tarjeta por par de herramientas.
 *
 * Un solo h1; los titulos de las tarjetas son h3 y cuelgan del h2 de la
 * rejilla, igual que en el hub de recursos.
 */

export const metadata: Metadata = {
  title: integrationsPage.title,
  description: integrationsPage.lead,
  alternates: { canonical: absoluteUrl(site.routes.integrations) },
  openGraph: {
    type: 'website',
    url: absoluteUrl(site.routes.integrations),
    title: integrationsPage.title,
    description: integrationsPage.lead,
    // El openGraph de una pagina SUSTITUYE al del layout entero, no se mezcla
    // con el: sin esta linea el hub se compartiria sin imagen.
    images: ogImage(GENERIC_OG, integrationsPage.title),
  },
};

export default function IntegracionesPage() {
  const integrations = getAllIntegrations();

  const graph = integrationsHubGraph({
    title: integrationsPage.title,
    description: integrationsPage.lead,
    integrations,
    breadcrumbs: [
      { name: breadcrumbRoot.label, path: breadcrumbRoot.href },
      { name: integrationsPage.eyebrow },
    ],
  });

  return (
    <section className="relative overflow-hidden pb-section pt-28 sm:pt-32 lg:pt-36">
      <JsonLd data={graph} />
      <SectionGlow className="left-1/2 top-[14%] h-[50vh] w-[110vw] -translate-x-1/2 lg:w-[70vw]" />

      <div className="shell relative">
        <Breadcrumbs items={[breadcrumbRoot, { label: integrationsPage.eyebrow }]} />

        <Reveal className="mt-8 block">
          <p className="eyebrow">{integrationsPage.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-display-l text-balance">{integrationsPage.title}</h1>
          <p className="mt-5 max-w-2xl text-body-l text-paper-muted text-pretty">{integrationsPage.lead}</p>
        </Reveal>

        <h2 className="sr-only">Todas las integraciones</h2>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {integrations.map((item, i) => (
            <Reveal as="li" key={item.slug} index={i % 3}>
              <IntegrationCard integration={item} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 block">
          <div className="glass-flat flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <p className="max-w-xl text-body-s text-paper-muted text-pretty">{integrationsPage.note}</p>
            <WhatsAppLink source="integraciones-hub" className={buttonStyles('primary', 'w-full sm:w-auto')}>
              <MessageCircle size={18} aria-hidden="true" />
              Hablar por WhatsApp
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
