/**
 * Eventos para Google Tag Manager.
 *
 * No hace nada si GTM no esta configurado: empuja al dataLayer igualmente y,
 * si el contenedor no existe, el array simplemente se queda en memoria. Asi se
 * puede conectar Google Ads mas adelante sin tocar los componentes.
 *
 * Los dos eventos que miden conversion son `whatsapp_click` y `lead_submit`.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type TrackedEvent =
  | 'whatsapp_click' // cualquier clic que abre WhatsApp
  | 'schedule_click' // clic en "Agenda tu demo ahora"
  | 'lead_submit' // el formulario se envio y Web3Forms respondio bien
  | 'lead_submit_error'; // el envio fallo (util para detectar la clave mal puesta)

export function track(event: TrackedEvent, payload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}
