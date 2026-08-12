'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * Contador que anima una sola vez, al entrar en el viewport.
 *
 * OJO CON EL VALOR INICIAL: el sitio es un export estatico, asi que lo que se
 * renderiza en el servidor queda escrito en el HTML. Si arrancara en 0, quien
 * abra la pagina sin JavaScript (o antes de que hidrate) leeria "~0 h a la
 * semana", que es un dato falso. Por eso el primer render pinta el valor FINAL
 * y solo se baja a 0 al montar en cliente, cuando el elemento todavia esta
 * fuera de pantalla y nadie lo ve.
 *
 * Con prefers-reduced-motion no se toca nada: se queda el valor final.
 */

type CounterProps = {
  to: number;
  /** Segundos que dura la cuenta. */
  duration?: number;
  className?: string;
};

export function Counter({ to, duration = 1.4, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  // Primer render (y HTML estatico): el numero de verdad.
  const [value, setValue] = useState(to);
  const armed = useRef(false);

  // Al montar, si el elemento aun no se ve, se pone a cero para poder contar.
  useEffect(() => {
    if (reduced || armed.current) return;
    if (!inView) {
      armed.current = true;
      setValue(0);
    }
  }, [inView, reduced]);

  useEffect(() => {
    // Si no llego a armarse (ya estaba en pantalla al cargar) no hay cuenta:
    // mejor el numero correcto de golpe que un salto raro a cero.
    if (reduced || !armed.current || !inView) return;

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, to, duration, reduced]);

  // tabular-nums evita que el ancho baile mientras cuenta.
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {value}
    </span>
  );
}
