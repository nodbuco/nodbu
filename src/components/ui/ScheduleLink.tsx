'use client';

import { CalendarCheck } from 'lucide-react';
import { track } from '@/lib/analytics';
import { site } from '@/content/site';

/**
 * Boton "Agenda tu demo ahora". Abre la agenda de site.scheduling.
 *
 * Solo aparece DOS veces en toda la pagina (hero y justo encima del formulario
 * final). Mas veces satura y deja de destacar.
 */

type ScheduleLinkProps = {
  className?: string;
  /** De donde sale el clic, para saber cual de los dos convierte. */
  source: string;
};

export function ScheduleLink({ className, source }: ScheduleLinkProps) {
  return (
    <a
      href={site.scheduling}
      // La agenda es un sitio externo: se abre en pestana nueva para no perder
      // la pagina que el visitante estaba leyendo.
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track('schedule_click', { source })}
    >
      <CalendarCheck size={18} aria-hidden="true" />
      Agenda tu demo ahora
    </a>
  );
}
