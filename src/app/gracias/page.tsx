import type { Metadata } from 'next';
import { Check, MessageCircle } from 'lucide-react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat';
import { buttonStyles } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ScheduleLink } from '@/components/ui/ScheduleLink';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { thanksPage } from '@/content/form';
import { site } from '@/content/site';

/**
 * Destino del formulario tras un envío correcto.
 *
 * Existe por dos motivos, no por estética:
 *  1. Es una URL real, así que GTM puede medirla como conversión. Un panel
 *     que sustituye al formulario en la misma página no deja rastro en la
 *     barra de direcciones.
 *  2. No está pensada para llegar por enlace ni por buscador: `noindex`,
 *     fuera de `sitemap.ts` y fuera de la lista que arma `llms.txt`.
 *
 * La cancelación de la canónica heredada (`alternates.canonical: null`) sigue
 * el mismo patrón que `not-found.tsx`: sin esto, la página declararía la
 * portada como su propia canónica.
 */

export const metadata: Metadata = {
  title: thanksPage.title,
  alternates: { canonical: null },
  robots: { index: false, follow: true },
};

export default function GraciasPage() {
  return (
    <>
      <Navbar />

      <main id="contenido" className="pb-section pt-28 text-center sm:pt-32 lg:pt-36">
        <div className="shell max-w-xl">
          <Reveal>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-nodbu/15">
              <Check size={26} className="text-nodbu" aria-hidden="true" />
            </span>
            <p className="eyebrow mt-6">{thanksPage.eyebrow}</p>
            <h1 className="mt-4 text-display-l">{thanksPage.title}</h1>
            <p className="mx-auto mt-5 max-w-md text-body-l text-paper-muted text-pretty">
              {thanksPage.lead}
            </p>
          </Reveal>

          <Reveal
            index={1}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <WhatsAppLink source="gracias" className={buttonStyles('primary', 'w-full sm:w-auto')}>
              <MessageCircle size={18} aria-hidden="true" />
              Hablar por WhatsApp
            </WhatsAppLink>
            <ScheduleLink source="gracias" className={buttonStyles('secondary', 'w-full sm:w-auto')} />
          </Reveal>

          <Reveal index={2} className="mt-8 block">
            <a
              href={site.routes.home}
              className="text-body-s text-paper-faint underline underline-offset-4 transition-colors hover:text-paper"
            >
              {thanksPage.backLabel}
            </a>
          </Reveal>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
