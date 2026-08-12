import { MessageCircle } from 'lucide-react';
import { LeadForm } from './LeadForm';
import { Reveal } from '@/components/ui/Reveal';
import { SectionGlow } from '@/components/ui/SectionGlow';
import { ScheduleLink } from '@/components/ui/ScheduleLink';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { buttonStyles } from '@/components/ui/Button';
import { site } from '@/content/site';

/**
 * CTA final a ancho completo con resplandor naranja de fondo.
 *
 * Dos gastos de naranja: el resplandor y el boton de envio del formulario. Por
 * eso el enlace a WhatsApp de esta seccion va en vidrio, no en naranja.
 */
export function FinalCta() {
  return (
    <section id="contacto" className="relative overflow-hidden py-section">
      {/* Resplandor 3 de 3. Ancla el formulario, que en escritorio ocupa las 7
          columnas de la derecha. Antes iba centrado y a 110vw de ancho: se
          cortaba en seco contra los dos bordes de la pantalla. */}
      <SectionGlow
        intensity="strong"
        className="left-1/2 top-1/2 h-[72vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 lg:left-[62%] lg:w-[78vw]"
      />

      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ---- argumento ---- */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Diagnóstico gratuito</p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-4 text-display-l">Cuéntanos qué proceso te quita más tiempo</h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-5 text-body-l text-paper-muted text-pretty">
              Te decimos en una llamada de 15 minutos si se puede automatizar, cuánto tiempo
              ahorrarías y qué no conviene tocar. Sin propuesta comercial en esa llamada.
            </p>
          </Reveal>

          {/* Segunda y ULTIMA aparicion del CTA de agenda. En movil esta
              columna se apila encima del formulario, asi que este boton cae
              justo antes de los campos. */}
          <Reveal index={3}>
            <div className="mt-9 rounded-glass border border-hairline bg-paper/[.03] p-5 sm:p-6">
              <p className="text-body-s text-paper text-pretty">
                ¿Prefieres verlo en vivo? Reserva {site.callMinutes} minutos y te enseñamos cómo
                quedaría tu proceso.
              </p>
              <ScheduleLink source="cta-final" className={buttonStyles('secondary', 'mt-4 w-full sm:w-auto')} />
            </div>
          </Reveal>

          <Reveal index={4}>
            <div className="mt-8 border-t border-hairline pt-8">
              <p className="text-body-s text-paper-muted">
                ¿Prefieres escribir directamente? Te respondemos por WhatsApp en horario laboral.
              </p>
              <WhatsAppLink source="cta-final" className={buttonStyles('secondary', 'mt-5')}>
                <MessageCircle size={18} aria-hidden="true" />
                Hablar por WhatsApp
              </WhatsAppLink>
              <p className="mt-6 font-mono text-mono uppercase text-paper-faint">
                O escríbenos a{' '}
                <a href={`mailto:${site.email}`} className="text-paper-muted transition-colors hover:text-paper">
                  {site.email}
                </a>
              </p>
            </div>
          </Reveal>
        </div>

        {/* ---- formulario ---- */}
        <div className="lg:col-span-7">
          <Reveal>
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
