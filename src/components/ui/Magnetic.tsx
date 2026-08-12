'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';

/**
 * Efecto magnetico leve para botones primarios: el boton se acerca al cursor
 * un maximo de 6px. Envuelve, no sustituye: el hijo sigue siendo un <a> o un
 * <button> normal, asi que el foco de teclado y el clic no cambian.
 *
 * Con prefers-reduced-motion no se monta nada.
 */

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Desplazamiento maximo en px. */
  strength?: number;
};

export function Magnetic({ children, className, strength = 6 }: MagneticProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  function handleMove(event: React.MouseEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Posicion relativa al centro, normalizada a [-1, 1].
    const relX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, relX)) * strength);
    y.set(Math.max(-1, Math.min(1, relY)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: 'inline-flex' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.span>
  );
}
