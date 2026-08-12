'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * UNICO componente de aparicion de la pagina.
 *
 * Fade + 24px de subida, easeOut, .6s, una sola vez. Para escalonar hermanos,
 * pasa `index`: cada uno espera 70ms mas que el anterior.
 *
 * Con prefers-reduced-motion NO se monta la animacion: el contenido se pinta
 * directamente en su sitio, sin desplazamiento ni opacidad diferida.
 */

type RevealProps = {
  children: ReactNode;
  /** Posicion entre hermanos. Genera el stagger de 70ms. */
  index?: number;
  /** Retraso extra en segundos, encima del stagger. */
  delay?: number;
  className?: string;
  /** Etiqueta a renderizar. Por defecto un div. */
  as?: 'div' | 'li' | 'article' | 'section';
};

const STAGGER = 0.07; // 70ms, dentro del rango 60-80 del encargo

const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  section: motion.section,
} as const;

export function Reveal({ children, index = 0, delay = 0, className, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  // Mapa explicito en vez de motion[as]: indexar el proxy con una union hace
  // que TypeScript infiera una union de componentes y se atragante con props.
  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * STAGGER + delay }}
    >
      {children}
    </MotionTag>
  );
}
