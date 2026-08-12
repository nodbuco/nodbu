'use client';

import type { MouseEvent } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { customService, services } from '@/content/services';

/**
 * Rejilla de seis servicios, 3x2 en escritorio y 1 columna en movil.
 *
 * Detalles que la sacan de la rejilla de features por defecto:
 *  - indice en mono arriba a la derecha: es un inventario numerado, no seis
 *    tarjetas sueltas
 *  - la frase de resultado va separada por una hairline y empieza por lo que
 *    deja de pasarle al cliente
 *
 * Los iconos van en blanco al 62%, NO en naranja: seis acentos aqui dejarian
 * sin fuerza al CTA. El unico naranja de la seccion es el resplandor que sigue
 * al cursor, y solo en la tarjeta que esta debajo del puntero.
 *
 * Las tarjetas usan glass-flat (sin backdrop-filter): son seis a la vez y seis
 * capas de blur hunden los FPS en moviles de gama baja.
 *
 * Debajo del grid va el SEPTIMO servicio ("Software a la medida") a ancho
 * completo y con tratamiento distinto, porque no es un paquete mas de la lista.
 * Ver DESIGN.md §8.2.
 */

const CustomIcon = customService.icon;

export function Services() {
  // Traslada la posicion del raton a variables CSS que lee .spotlight
  function handleMove(event: MouseEvent<HTMLElement>) {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }

  return (
    <section id="servicios" className="py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Servicios"
          title="Los procesos que dejan de comerte la semana"
          lead="No vendemos herramientas: montamos el flujo concreto que hoy hace alguien a mano. Y si tu caso no encaja en ninguno, lo construimos a medida."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal as="li" key={service.title} index={i % 3}>
                <article
                  onMouseMove={handleMove}
                  className="spotlight group relative h-full overflow-hidden glass-flat p-7 transition-transform duration-300 ease-soft hover:-translate-y-1"
                >
                  {/* El contenido va por encima del ::before del resplandor. */}
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <Icon size={24} strokeWidth={1.6} className="text-paper-muted" aria-hidden="true" />
                      <span className="font-mono text-mono text-paper-faint">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-6 text-display-m">{service.title}</h3>

                    <p className="mt-5 border-t border-hairline pt-5 text-body-s text-paper-muted text-pretty">
                      {service.result}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        {/* Septimo servicio a ancho completo. */}
        <Reveal>
          <article
            onMouseMove={handleMove}
            className="spotlight group relative mt-4 overflow-hidden rounded-glass border border-nodbu/30 bg-glass p-7 shadow-glass transition-transform duration-300 ease-soft hover:-translate-y-1 sm:p-9"
          >
            <div className="relative grid gap-7 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <div className="flex items-center gap-3">
                  <CustomIcon
                    size={24}
                    strokeWidth={1.6}
                    className="shrink-0 text-paper-muted"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-mono uppercase text-paper-faint">
                    {customService.label}
                  </span>
                </div>

                <h3 className="mt-6 text-display-m">{customService.title}</h3>

                <p className="mt-5 text-body-s text-paper-muted text-pretty">
                  {customService.result}
                </p>
              </div>

              {/* Cada cosa que construimos, con su nombre y su resultado. El
                  nombre en paper y el resultado en paper-muted: se puede leer
                  solo la columna de nombres y ya se entiende la oferta. */}
              <ul className="flex flex-col gap-5 border-t border-hairline pt-6 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                {customService.builds.map((build) => (
                  <li key={build.name}>
                    <p className="text-body-s font-medium text-paper">{build.name}</p>
                    <p className="mt-1 text-body-s text-paper-muted text-pretty">{build.result}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
