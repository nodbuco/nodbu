'use client';

import type { ReactNode } from 'react';
import { track } from '@/lib/analytics';
import { whatsappUrl } from '@/content/site';

/**
 * Todo enlace a WhatsApp de la pagina pasa por aqui.
 *
 * Dos razones: la URL sale siempre de site.ts (cambiar el numero en un sitio lo
 * cambia en todos) y cada clic empuja el evento `whatsapp_click` al dataLayer
 * para poder medir la conversion en Google Ads.
 */

type WhatsAppLinkProps = {
  children: ReactNode;
  className?: string;
  /** De donde sale el clic. Viaja con el evento para saber que CTA convierte. */
  source: string;
  /** Mensaje ya escrito. Por defecto, el de site.ts. */
  message?: string;
  'aria-label'?: string;
};

export function WhatsAppLink({
  children,
  className,
  source,
  message,
  'aria-label': ariaLabel,
}: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={() => track('whatsapp_click', { source })}
    >
      {children}
    </a>
  );
}
