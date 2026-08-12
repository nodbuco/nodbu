'use client';

import type { MouseEvent } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionGlow } from '@/components/ui/SectionGlow';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { buttonStyles } from '@/components/ui/Button';
import { guarantee, plans } from '@/content/plans';
import { cn } from '@/lib/cn';

/**
 * Tres niveles. Sin precios cerrados: el precio sale del diagnostico.
 *
 * El plan central lleva borde naranja y etiqueta "Más elegido". Son los dos
 * unicos gastos de naranja de la seccion, asi que los botones de los planes no
 * destacados van en vidrio.
 */
export function Plans() {
  function handleMove(event: MouseEvent<HTMLElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  return (
    <section id="planes" className="relative overflow-hidden py-section">
      {/* Resplandor 2 de 3. Ancla el plan destacado, que esta centrado en la
          rejilla: es el punto donde se toma la decision de precio. */}
      <SectionGlow className="left-1/2 top-[42%] h-[58vh] w-[92vw] -translate-x-1/2 lg:w-[68vw]" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Planes"
          align="center"
          title="Tres formas de empezar"
          lead="El precio depende de cuántos sistemas hay que conectar. Te lo damos cerrado y por escrito después del diagnóstico."
        />

        <ul className="mt-14 grid items-start gap-4 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal as="li" key={plan.name} index={i}>
              <article
                className={cn(
                  'group relative flex h-full flex-col transition-transform duration-300 ease-soft hover:-translate-y-1',
                  plan.featured && 'lg:-mt-4'
                )}
              >
                {/* Capa de fondo con Spotlight y recorte (overflow-hidden) */}
                <div
                  onMouseMove={handleMove}
                  className={cn(
                    'absolute inset-0 spotlight overflow-hidden glass-flat rounded-glass',
                    plan.featured && 'border-nodbu/60'
                  )}
                />

                {plan.featured ? (
                  <span className="absolute -top-3 left-7 z-20 rounded-full bg-nodbu px-3 py-1 font-mono text-mono uppercase text-ink shadow-md">
                    Más elegido
                  </span>
                ) : null}
                
                <div className={cn("relative z-10 flex h-full flex-col p-7 sm:p-8", plan.featured && "lg:pb-10")}>
                  <p className="font-mono text-mono uppercase text-paper-faint">{plan.price}</p>
                  <h3 className="mt-3 text-display-m">{plan.name}</h3>
                  <p className="mt-3 text-body-s text-paper-muted text-pretty">{plan.audience}</p>

                  <ul className="mt-7 flex flex-1 flex-col gap-3 border-t border-hairline pt-6">
                    {plan.deliverables.map((item) => (
                      <li key={item} className="flex gap-3 text-body-s text-paper-muted">
                        <Check
                          size={16}
                          strokeWidth={2}
                          aria-hidden="true"
                          className="mt-0.5 shrink-0 text-paper-faint"
                        />
                        <span className="text-pretty">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <WhatsAppLink
                    source={`plan-${plan.name}`}
                    message={`Hola NODBU, me interesa el plan "${plan.name}" y quiero automatizar un proceso en mi empresa`}
                    className={buttonStyles(plan.featured ? 'primary' : 'secondary', 'mt-8 w-full')}
                  >
                    {plan.cta}
                  </WhatsAppLink>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Garantia: ultimo punto de duda antes de decidir, justo donde el
            visitante compara precio contra riesgo. Franja, no cuarta tarjeta:
            no es un plan y no debe leerse como tal. Sin naranja — la seccion ya
            gasta sus dos en el plan destacado y su etiqueta. Ver DESIGN.md §8.3. */}
        <Reveal>
          <div className="mt-4 flex flex-col items-start gap-4 rounded-glass border border-hairline bg-paper/[.03] p-6 sm:flex-row sm:items-center sm:gap-5 sm:p-7">
            <ShieldCheck
              size={26}
              strokeWidth={1.5}
              aria-hidden="true"
              className="shrink-0 text-paper-muted"
            />
            <div>
              <p className="font-mono text-mono uppercase text-paper-faint">{guarantee.title}</p>
              <p className="mt-2 text-body-s text-paper-muted text-pretty">{guarantee.text}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
