'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { automationNodes } from '@/content/automation';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Seccion 2: un MacBook dibujado con CSS puro, con seis pasos de un flujo real
 * desplazandose por su pantalla al ritmo del scroll.
 *
 * El copy de los pasos vive en `content/automation.ts`, no aqui.
 * La carcasa usa los tokens `device-*` y los iconos los `node-*`: son la unica
 * excepcion razonada al acento naranja unico, y estan explicados en
 * tailwind.config.ts y en DESIGN.md §13.4. Aqui no hay ni un color literal.
 */
export function ValueShowcase() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // El scroll de la sección controla la posición Y del contenido dentro de la pantalla.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Mapeamos el progreso del scroll (0→1) a un desplazamiento vertical.
  // Cuando el usuario empieza a ver la sección, los nodos están abajo;
  // conforme hace scroll, suben hasta mostrar los últimos pasos.
  const contentY = useTransform(scrollYProgress, [0, 1], ['10%', '-60%']);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="valor-titulo"
      className="relative py-section overflow-hidden"
    >
      <div className="shell relative z-10">
        <SectionHeading
          eyebrow="Piloto automático"
          title={<span id="valor-titulo">Tu empresa operando mientras duermes</span>}
          lead="Conectamos todas tus herramientas para que la información fluya sin que nadie tenga que copiar y pegar datos."
          align="center"
        />

        <Reveal>
          {/* Contenedor del MacBook */}
          <div className="relative mx-auto mt-16 max-w-4xl flex flex-col items-center px-4 sm:px-8">
            {/* Tapa Superior (Bisel negro con borde ultra delgado de aluminio) */}
            <div className="relative w-[96%] rounded-t-2xl sm:rounded-t-[1.75rem] border-[1.5px] border-b-0 border-device-edge bg-device-bezel p-2 pb-4 sm:p-3 sm:pb-6 shadow-2xl">
              {/* Pantalla (Cristal interno) */}
              <div className="relative overflow-hidden rounded-t-xl rounded-b-sm bg-ink aspect-[16/10] ring-1 ring-device-glass/5">

                {/* Notch */}
                <div className="absolute left-1/2 top-0 z-20 h-4 w-28 -translate-x-1/2 rounded-b-[10px] bg-device-bezel sm:h-5 sm:w-36 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-device-lens shadow-device-lens flex items-center justify-center">
                    <div className="h-0.5 w-0.5 rounded-full bg-device-led/40" />
                  </div>
                </div>

                {/* Gradientes para suavizar la entrada y salida de nodos */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{ background: 'linear-gradient(to bottom, rgb(var(--c-ink)) 0%, transparent 18%, transparent 82%, rgb(var(--c-ink)) 100%)' }}
                />

                {/* Contenido — animado por scroll */}
                <motion.div
                  className="absolute inset-x-0 flex flex-col items-center gap-3 sm:gap-5 px-4 sm:px-10 pt-10"
                  style={reduced ? {} : { y: contentY }}
                >
                  {automationNodes.map((node, i) => {
                    const Icon = node.icon;
                    const isLast = i === automationNodes.length - 1;
                    return (
                      <div key={i} className="flex flex-col items-center w-full max-w-sm">
                        <div className="group glass-flat p-3 sm:p-4 rounded-xl w-full flex items-center gap-3 sm:gap-4 border border-hairline bg-ink-raised/60 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-nodbu/30 hover:shadow-node-hover cursor-default">
                          <div className={`${node.bg} p-2 sm:p-2.5 rounded-lg ${node.color} shrink-0 transition-transform duration-300 ease-out group-hover:scale-110`}>
                            <Icon size={18} className="sm:hidden" />
                            <Icon size={22} className="hidden sm:block" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] sm:text-body-s font-medium text-paper leading-tight">{node.title}</p>
                            <p className="text-[10px] sm:text-[12px] text-paper-muted mt-0.5 leading-tight">{node.desc}</p>
                          </div>
                        </div>

                        {/* Conector (excepto el último) */}
                        {!isLast && (
                          <div className="flex flex-col items-center py-1 sm:py-2">
                            <div className="h-4 sm:h-6 w-px border-l-2 border-dashed border-nodbu/25" />
                            <ArrowDown size={12} className="text-nodbu/40 -mt-1" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            {/* Base del portátil (Chasis que sobresale ligeramente) */}
            <div className="relative z-20 -mt-[1px] h-3 sm:h-4 w-full rounded-b-xl sm:rounded-b-2xl bg-gradient-to-b from-device-base-top to-device-base-bottom shadow-device-base flex justify-center">
              {/* Muesca central para abrir (Thumb lip) */}
              <div className="h-1 sm:h-1.5 w-20 sm:w-28 rounded-b-sm bg-device-lip shadow-inner" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
