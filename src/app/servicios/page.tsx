import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/recursos/Breadcrumbs';
import { ServiceCard } from '@/components/servicios/ServiceCard';
import { buttonStyles } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionGlow } from '@/components/ui/SectionGlow';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { breadcrumbRoot } from '@/content/recursos';
import { servicesPage } from '@/content/servicios';
import { site } from '@/content/site';
import { GENERIC_OG, ogImage } from '@/lib/og';
import { getAllServices } from '@/lib/servicios';
import { absoluteUrl, servicesHubGraph } from '@/lib/seo';

/**
 * Hub de /servicios/. Dos grupos, en el mismo orden que la portada: los seis
 * procesos y los tres de "Software a la medida". Un solo h1; cada grupo es un
 * h2 y las tarjetas son h3.
 */

const url = absoluteUrl(site.routes.services);

export const metadata: Metadata = {
  title: servicesPage.title,
  description: servicesPage.lead,
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    url,
    title: servicesPage.title,
    description: servicesPage.lead,
    images: ogImage(GENERIC_OG, servicesPage.title),
  },
};

const h2 = 'font-display text-display-m font-medium text-paper text-balance';

export default function ServiciosPage() {
  const all = getAllServices();
  const processes = all.filter((item) => item.kind === 'proceso');
  const custom = all.filter((item) => item.kind === 'a-medida');

  const graph = servicesHubGraph({
    title: servicesPage.title,
    description: servicesPage.lead,
    services: all,
    breadcrumbs: [
      { name: breadcrumbRoot.label, path: breadcrumbRoot.href },
      { name: servicesPage.eyebrow },
    ],
  });

  return (
    <section className="relative overflow-hidden pb-section pt-28 sm:pt-32 lg:pt-36">
      <JsonLd data={graph} />
      <SectionGlow className="left-1/2 top-[14%] h-[50vh] w-[110vw] -translate-x-1/2 lg:w-[70vw]" />

      <div className="shell relative">
        <Breadcrumbs items={[breadcrumbRoot, { label: servicesPage.eyebrow }]} />

        <Reveal className="mt-8 block">
          <p className="eyebrow">{servicesPage.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-display-l text-balance">{servicesPage.title}</h1>
          <p className="mt-5 max-w-2xl text-body-l text-paper-muted text-pretty">{servicesPage.lead}</p>
        </Reveal>

        <Reveal className="mt-14 block">
          <h2 className={h2}>{servicesPage.groups.processes}</h2>
        </Reveal>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processes.map((item, i) => (
            <Reveal as="li" key={item.slug} index={i % 3}>
              <ServiceCard service={item} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 block">
          <h2 className={h2}>{servicesPage.groups.custom}</h2>
        </Reveal>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {custom.map((item, i) => (
            <Reveal as="li" key={item.slug} index={i % 3}>
              <ServiceCard service={item} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 block">
          <div className="glass-flat flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <p className="max-w-xl text-body-s text-paper-muted text-pretty">{servicesPage.note}</p>
            <WhatsAppLink source="servicios-hub" className={buttonStyles('primary', 'w-full sm:w-auto')}>
              <MessageCircle size={18} aria-hidden="true" />
              Hablar por WhatsApp
            </WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
