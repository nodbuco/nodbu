import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

/**
 * Cabecera de seccion: eyebrow en mono + h2 + entradilla opcional.
 * Todas las secciones la usan para que el ritmo vertical sea el mismo.
 */

type SectionHeadingProps = {
  /** Etiqueta corta en mono. Se pone en mayusculas por CSS. */
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Centrada o alineada a la izquierda. */
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn(centered && 'mx-auto text-center', centered ? 'max-w-2xl' : 'max-w-3xl', className)}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal index={1}>
        <h2 className="mt-4 text-display-l">{title}</h2>
      </Reveal>
      {lead ? (
        <Reveal index={2}>
          <p className="mt-5 text-body-l text-paper-muted text-pretty">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
