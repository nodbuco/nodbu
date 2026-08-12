'use client';

import type { CSSProperties } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { logoRegistry } from '@/components/logos';
import { integrationsRowOne, integrationsRowTwo, integrationsRowThree, type Integration } from '@/content/integrations';

/**
 * Carrusel infinito de herramientas.
 *
 * Dos filas en direcciones opuestas y a velocidades distintas (46s y 54s) para
 * que no se lean como un bloque unico. Se pausa al pasar el raton por encima y
 * los extremos se difuminan con una mascara.
 *
 * El truco del bucle: la lista va duplicada y la animacion desplaza el -50%
 * exacto, asi que el salto cae justo donde el contenido se repite.
 */

function Row({
  items,
  direction,
  duration,
}: {
  items: Integration[];
  direction: 'left' | 'right';
  duration: number;
}) {
  // Duplicada: el -50% de la animacion cae en la costura y el bucle no se ve.
  const loop = [...items, ...items];

  return (
    <div className="marquee-row marquee-mask overflow-hidden">
      <ul
        className={`marquee-track flex w-max items-center ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        {loop.map((item, i) => {
          const Mark = logoRegistry[item.slug];
          return (
            <li
              key={`${item.slug}-${i}`}
              // El segundo juego es una copia visual: se oculta al lector de pantalla.
              aria-hidden={i >= items.length ? true : undefined}
              className="flex shrink-0 items-center gap-4 pr-16 sm:pr-24 text-paper opacity-55 transition-opacity duration-300 hover:opacity-100"
            >
              {Mark ? <Mark className="h-8 w-8 shrink-0" /> : null}
              <span className="whitespace-nowrap text-body-l font-medium">{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Integrations() {
  return (
    <section aria-labelledby="integraciones-titulo" className="py-section">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Integraciones</p>
        </Reveal>
        <Reveal index={1}>
          <h2 id="integraciones-titulo" className="mt-4 max-w-3xl text-display-l">
            Integramos a la perfección con herramientas que ya usas
          </h2>
        </Reveal>
      </div>

      {/* A sangre completa: el marquee no se corta con el contenedor. */}
      <div className="mt-12 flex flex-col gap-8">
        <Row items={integrationsRowOne} direction="left" duration={46} />
        <Row items={integrationsRowTwo} direction="right" duration={54} />
        <Row items={integrationsRowThree} direction="left" duration={50} />
      </div>

      <div className="shell">
        <Reveal>
          <p className="mt-10 max-w-2xl text-body-s text-paper-muted">
            ¿No ves la tuya? Conectamos casi cualquier programa que permita enlazar con otros o
            exportar datos. Si el tuyo es a medida, lo revisamos en el diagnóstico.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
