'use client';

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { VerifiedBadge } from '@/components/ui/VerifiedBadge';
import { caseStudies, casesPage, type CaseWithPerson } from '@/content/casos';
import { cn } from '@/lib/cn';

/**
 * Lista de casos de /casos/. Cada tarjeta entra con una rotacion 3D ligada al
 * scroll: llega inclinada hacia atras y se endereza a medida que el lector
 * baja hasta ella.
 *
 * COMO FUNCIONA EL 3D SIN ROMPER NADA:
 *  - El <ol> declara `perspective`; cada tarjeta gira en rotateX sobre su
 *    borde superior. Es un solo transform compuesto (rotateX + y + scale), sin
 *    filtros ni sombras animadas: el navegador lo hace en la GPU.
 *  - El progreso viene de useScroll con la tarjeta como target, y pasa por un
 *    useSpring. El muelle hace dos cosas: suaviza el salto de hidratacion (el
 *    HTML estatico lleva la pose inicial y al montar Framer recalcula) y da
 *    la sensacion de "peso" que separa un scrub premium de uno mecanico.
 *  - En movil la inclinacion es menor: con la tarjeta ocupando casi toda la
 *    pantalla, 15 grados se leen como deformacion, no como profundidad. La
 *    escala inicial tambien baja, porque la perspectiva ENSANCHA el borde
 *    cercano: a 15 grados y escala .965 la tarjeta proyectada mide mas que el
 *    viewport de 375px y se recorta contra los lados durante la entrada.
 *  - Los valores que dependen del ancho (inclinacion, desplazamiento, escala)
 *    son MotionValues y no constantes: `useTransform` no recalcula la salida
 *    cuando cambia el array de rango, solo cuando cambia la entrada, asi que
 *    con constantes el cambio a movil no se aplicaba hasta el primer scroll.
 *  - Con prefers-reduced-motion no se aplica ningun style: la tarjeta se
 *    pinta plana en su sitio.
 *  - NO se anima la opacidad. El HTML exportado tiene que ser legible sin
 *    JavaScript, y una tarjeta al 40% no lo es.
 *
 * GASTO DE NARANJA POR TARJETA: dos. La insignia de verificado y la flecha
 * del bloque de resultado. La linea del flujo y sus nodos van en paper.
 *
 * Reveal NO se apila encima: la propia entrada 3D ya es la aparicion.
 */

/** Solo para decidir la intensidad; el layout lo resuelve CSS. */
function useIsNarrow(): boolean {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setNarrow(mq.matches);
    update();
    // Las dos fuentes: `change` de la media query es lo correcto, y `resize`
    // es la red de seguridad para entornos que no lo disparan (emulacion de
    // dispositivo, algunos WebView). Un setState con el mismo valor no
    // vuelve a renderizar, asi que escuchar los dos no cuesta nada.
    mq.addEventListener('change', update);
    window.addEventListener('resize', update, { passive: true });
    return () => {
      mq.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return narrow;
}

const SPRING = { stiffness: 110, damping: 22, mass: 0.6 };

function CaseCard({
  item,
  index,
  reduced,
  narrow,
}: {
  item: CaseWithPerson;
  index: number;
  reduced: boolean | null;
  narrow: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);

  // 0 cuando el borde superior de la tarjeta entra por abajo; 1 cuando llega
  // al 40% de la ventana. A partir de ahi se queda plana mientras se lee.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 96%', 'start 40%'],
  });

  // Pose inicial (progreso 0). Arrancan con los valores de escritorio, que
  // son los que lleva el HTML exportado; al montar, si la pantalla es
  // estrecha, se ajustan y las salidas se recalculan al instante.
  const tilt = useMotionValue(15);
  const lift = useMotionValue(56);
  const shrink = useMotionValue(0.965);

  useEffect(() => {
    tilt.set(narrow ? 7 : 15);
    lift.set(narrow ? 28 : 56);
    shrink.set(narrow ? 0.95 : 0.965);
  }, [narrow, tilt, lift, shrink]);

  const rotateX = useSpring(
    useTransform([scrollYProgress, tilt], ([p, t]: number[]) => (1 - p) * t),
    SPRING,
  );
  const y = useSpring(
    useTransform([scrollYProgress, lift], ([p, l]: number[]) => (1 - p) * l),
    SPRING,
  );
  const scale = useSpring(
    useTransform([scrollYProgress, shrink], ([p, s]: number[]) => s + (1 - s) * p),
    SPRING,
  );

  const { person } = item;
  const number = String(index + 1).padStart(2, '0');
  const labels = casesPage.labels;

  return (
    <li ref={ref} className="[transform-style:preserve-3d]">
      <motion.article
        aria-labelledby={`caso-${index}-titulo`}
        style={reduced ? undefined : { rotateX, y, scale, transformOrigin: '50% 0%' }}
        className="glass-flat overflow-hidden will-change-transform"
      >
        <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
          {/* ------------------------------------------ quien y que cambio -- */}
          <div className="flex flex-col lg:col-span-5">
            <p className="eyebrow">
              Caso {number} · {item.sector}
            </p>
            <h2 id={`caso-${index}-titulo`} className="mt-4 text-display-m text-balance">
              {item.headline}
            </h2>

            <blockquote className="mt-6 border-l border-hairline pl-5 text-body-s text-paper-muted text-pretty">
              {person.quote}
            </blockquote>

            {/* items-start, no center: hay cargos a dos lineas en movil. */}
            <figure className="mt-auto flex items-start gap-3 pt-8">
              {person.photo ? (
                <img
                  src={person.photo}
                  alt={`Foto de ${person.name}`}
                  width={44}
                  height={44}
                  loading="lazy"
                  decoding="async"
                  className="h-11 w-11 shrink-0 rounded-full border border-hairline object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline font-mono text-mono-l text-paper-muted"
                >
                  {person.initials}
                </span>
              )}
              <figcaption className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="truncate text-body-s font-medium text-paper">{person.name}</span>
                  <VerifiedBadge size={16} className="shrink-0" />
                </span>
                <span className="block text-body-s text-paper-faint text-pretty">{person.role}</span>
                <span className="mt-1 block font-mono text-mono uppercase text-paper-faint">
                  {person.city}, {person.country}
                </span>
              </figcaption>
            </figure>
          </div>

          {/* --------------------------------- problema, flujo, resultado -- */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            <section aria-label={labels.problem}>
              <p className="eyebrow">{labels.problem}</p>
              <p className="mt-3 text-body-s text-paper-muted text-pretty">{item.problem}</p>
            </section>

            <section aria-label={labels.flow}>
              <p className="eyebrow">{labels.flow}</p>
              <ol className="relative mt-4 flex flex-col gap-4 pl-8">
                {/* Rail del flujo, en paper: el naranja va en el resultado. */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-[7px] top-3 w-px bg-hairline"
                />
                {item.flow.map((step, i) => (
                  <li key={step.label} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-8 top-1 grid h-[15px] w-[15px] place-items-center rounded-full border border-hairline bg-ink"
                    >
                      <span className="h-[5px] w-[5px] rounded-full bg-paper-faint" />
                    </span>
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                      <span className="font-mono text-mono text-paper-faint">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-body-s font-medium text-paper">{step.label}</span>
                    </span>
                    <span className="mt-1 block text-body-s text-paper-muted text-pretty">{step.detail}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-label={labels.result} className="rounded-glass border border-hairline bg-paper/[.03] p-5 sm:p-6">
              <p className="eyebrow">{labels.result}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div>
                  <p className="font-mono text-mono uppercase text-paper-faint">{labels.before}</p>
                  <p className="mt-1.5 text-body-s text-paper-muted text-pretty">{item.before}</p>
                </div>
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className={cn('text-nodbu', 'rotate-90 justify-self-start sm:rotate-0 sm:justify-self-center')}
                />
                <div>
                  <p className="font-mono text-mono uppercase text-paper-faint">{labels.after}</p>
                  <p className="mt-1.5 text-body-s font-medium text-paper text-pretty">{item.after}</p>
                </div>
              </div>

              {/* Solo con dato real y autorizado. Hoy ningun caso lo trae. */}
              {item.metric ? (
                <p className="mt-5 border-t border-hairline pt-4">
                  <span className="font-display text-display-m text-paper">{item.metric.value}</span>
                  <span className="ml-3 font-mono text-mono uppercase text-paper-faint">{item.metric.label}</span>
                </p>
              ) : null}
            </section>
          </div>
        </div>
      </motion.article>
    </li>
  );
}

export function CaseStudies() {
  const reduced = useReducedMotion();
  const narrow = useIsNarrow();

  return (
    // data-narrow expone el estado al DOM: sirve para verificarlo en el
    // navegador sin instrumentar nada, y no tiene coste.
    <ol data-narrow={narrow ? '' : undefined} className="mt-14 flex flex-col gap-8 sm:gap-12 [perspective:1400px]">
      {caseStudies.map((item, i) => (
        <CaseCard key={item.name} item={item} index={i} reduced={reduced} narrow={narrow} />
      ))}
    </ol>
  );
}
