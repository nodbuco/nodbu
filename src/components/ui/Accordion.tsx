'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * Acordeon con un solo panel abierto a la vez. Sin datos dentro: los recibe.
 *
 * Lo usan la FAQ de la landing y el bloque de preguntas de cada artículo, que
 * es justo por lo que se extrajo de Faq.tsx: dos acordeones identicos en dos
 * sitios se separan en cuanto alguien toca uno de los dos.
 *
 * Accesibilidad (viene de la version original y no se toca): cada cabecera es
 * un <button> real dentro de un encabezado, con aria-expanded y aria-controls
 * apuntando a su panel. Se navega con tabulador y se abre con Enter o Espacio.
 *
 * `idPrefix` es obligatorio porque los id tienen que ser unicos en el
 * documento: si dos acordeones de la misma pagina usaran "panel-0", el
 * aria-controls del segundo apuntaria al panel del primero.
 */

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Prefijo de los id. Unico por acordeon dentro de la pagina. */
  idPrefix: string;
  /**
   * Nivel del encabezado que envuelve al boton. Tiene que encajar en el
   * esquema de la pagina: h3 si el acordeon cuelga de un h2 de seccion.
   */
  headingLevel?: 'h3' | 'h4';
  /** Indice abierto al cargar. `null` para empezar todo cerrado. */
  defaultOpen?: number | null;
  className?: string;
};

export function Accordion({
  items,
  idPrefix,
  headingLevel: Heading = 'h3',
  defaultOpen = 0,
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduced = useReducedMotion();

  return (
    <ul className={cn('w-full', className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.question} className="border-b border-hairline">
            <Heading>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-panel-${i}`}
                id={`${idPrefix}-boton-${i}`}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    'font-display text-body-l transition-colors',
                    isOpen ? 'text-paper' : 'text-paper-muted',
                  )}
                >
                  {item.question}
                </span>
                <Plus
                  size={20}
                  aria-hidden="true"
                  className={cn(
                    'mt-1 shrink-0 transition-all duration-300 ease-soft',
                    isOpen ? 'rotate-45 text-nodbu' : 'text-paper-faint',
                  )}
                />
              </button>
            </Heading>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={`${idPrefix}-panel-${i}`}
                  role="region"
                  aria-labelledby={`${idPrefix}-boton-${i}`}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-7 pr-10 text-body-s text-paper-muted text-pretty">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
