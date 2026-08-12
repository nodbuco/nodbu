'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { steps } from '@/content/steps';

/**
 * Eje VERTICAL, no cuatro tarjetas en fila.
 *
 * Cuatro tarjetas horizontales se leen como cuatro opciones equivalentes. Aqui
 * la linea se dibuja segun el progreso del scroll y cada paso aparece cuando la
 * linea lo alcanza: el usuario no puede leer el 03 antes que el 02. La
 * numeracion codifica una secuencia real.
 */
export function HowItWorks() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLOListElement>(null);

  // La linea crece mientras la lista atraviesa la ventana.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'end 60%'],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="como-funciona" className="py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Cómo funciona"
          title="Cuatro pasos, en este orden"
          lead="Antes de que pagues nada ya sabes qué se va a automatizar, cuánto tarda y cuánto cuesta."
        />

        <ol ref={trackRef} className="relative mt-16 pl-10 sm:pl-16">
          {/* Rail: el trazo apagado de fondo */}
          <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-2 w-px bg-hairline sm:left-[15px]" />

          {/* Progreso: la parte naranja, que crece con el scroll */}
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-nodbu sm:left-[15px]"
            style={reduced ? { scaleY: 1 } : { scaleY }}
          />

          {steps.map((step, i) => (
            <li key={step.number} className="relative pb-14 last:pb-0">
              {/* Nodo del paso sobre la linea */}
              <span
                aria-hidden="true"
                className="absolute -left-10 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-hairline bg-ink sm:-left-16"
              >
                <span className="h-[5px] w-[5px] rounded-full bg-paper-faint" />
              </span>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-mono-l text-nodbu">{step.number}</span>
                  <h3 className="text-display-m">{step.title}</h3>
                  <span className="font-mono text-mono uppercase text-paper-faint">{step.duration}</span>
                </div>
                <p className="mt-4 max-w-2xl text-body-s text-paper-muted text-pretty">
                  {step.description}
                </p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
