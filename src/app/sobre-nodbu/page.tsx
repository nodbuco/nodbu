import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/recursos/Breadcrumbs';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat';
import { buttonStyles } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ScheduleLink } from '@/components/ui/ScheduleLink';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { countryNames } from '@/content/countries';
import { breadcrumbRoot } from '@/content/recursos';
import { site } from '@/content/site';
import { aboutPage } from '@/content/sobre';
import { aboutGraph, absoluteUrl } from '@/lib/seo';

/**
 * /sobre-nodbu — la pagina de ENTIDAD.
 *
 * No es un "quienes somos" de relleno: es la pagina a la que apuntan el
 * `author` de cada articulo y el nodo Person del JSON-LD. Los buscadores con IA
 * citan lo que pueden atribuir a alguien identificable, y esto es lo que lo
 * hace identificable: nombre, identificacion fiscal, domicilio y cobertura.
 *
 * Todos los datos salen de site.ts y countries.ts. Aqui no hay ni un numero ni
 * un correo escritos a mano.
 */

const description =
  'NODBU es una agencia de automatización de procesos y desarrollo a medida para PyMEs en España ' +
  'y Latinoamérica. Quién está detrás, desde dónde trabaja y cómo se empieza.';

export const metadata: Metadata = {
  title: aboutPage.title,
  description,
  alternates: { canonical: absoluteUrl('/sobre-nodbu') },
  openGraph: {
    type: 'profile',
    url: absoluteUrl('/sobre-nodbu'),
    title: aboutPage.title,
    description,
  },
};

export default function SobreNodbuPage() {
  const { legalEntity } = site;

  const graph = aboutGraph({
    title: aboutPage.title,
    description,
    breadcrumbs: [
      { name: breadcrumbRoot.label, path: breadcrumbRoot.href },
      { name: aboutPage.eyebrow },
    ],
  });

  return (
    <>
      <JsonLd data={graph} />
      <Navbar />

      <main id="contenido" className="pb-section pt-28 sm:pt-32 lg:pt-36">
        <div className="shell max-w-3xl">
          <Breadcrumbs items={[breadcrumbRoot, { label: aboutPage.eyebrow }]} />

          <Reveal className="mt-8 block">
            <p className="eyebrow">{aboutPage.eyebrow}</p>
            <h1 className="mt-4 text-display-l text-balance">{aboutPage.title}</h1>
            <p className="mt-6 text-body-l text-paper-muted text-pretty">{aboutPage.lead}</p>
          </Reveal>

          {aboutPage.sections.map((section, i) => (
            <Reveal key={section.title} className="mt-14 block" index={i}>
              <h2 className="font-display text-display-m font-medium text-paper text-balance">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-4 text-body-l text-paper-muted text-pretty">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          ))}

          {/* ------------------------------------------ datos del titular -- */}
          <Reveal className="mt-16 block">
            <h2 className="font-display text-display-m font-medium text-paper">
              {aboutPage.identityHeading}
            </h2>
            <p className="mt-4 text-body-s text-paper-faint text-pretty">{aboutPage.identityNote}</p>

            <dl className="glass-flat mt-6 grid gap-x-8 gap-y-4 p-6 sm:grid-cols-2 sm:p-7">

              <div>
                <dt className="eyebrow">Correo</dt>
                <dd className="mt-2 text-body-s">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-paper underline underline-offset-4 transition-colors hover:text-paper-muted"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* ------------------------------------------------- cobertura --- */}
          <Reveal className="mt-16 block">
            <h2 className="font-display text-display-m font-medium text-paper">
              {aboutPage.coverageHeading}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {countryNames.map((country) => (
                <li
                  key={country}
                  className="rounded-full border border-hairline px-3.5 py-1.5 font-mono text-mono uppercase text-paper-faint"
                >
                  {country}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ------------------------------------------------------ CTA ---- */}
          <Reveal className="mt-16 block">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <WhatsAppLink source="sobre-nodbu" className={buttonStyles('primary', 'w-full sm:w-auto')}>
                <MessageCircle size={18} aria-hidden="true" />
                Hablar por WhatsApp
              </WhatsAppLink>
              <ScheduleLink source="sobre-nodbu" className={buttonStyles('secondary', 'w-full sm:w-auto')} />
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
