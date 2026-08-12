/**
 * Formato de fechas de los articulos.
 *
 * Las fechas llegan como "YYYY-MM-DD" (las normaliza articles.ts). Se
 * interpretan SIEMPRE en UTC: si se dejara la zona horaria del sistema, una
 * fecha como 2026-08-05 se convertiria en el 4 de agosto al compilar desde un
 * huso al oeste de Greenwich, y la pagina publicada diria un dia menos que el
 * frontmatter, el sitemap y el JSON-LD.
 */

const formatter = new Intl.DateTimeFormat('es', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const shortFormatter = new Intl.DateTimeFormat('es', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "5 de agosto de 2026". Para el cuerpo del articulo. */
export function formatDate(iso: string): string {
  return formatter.format(new Date(`${iso}T00:00:00Z`));
}

/** "5 ago 2026". Para los eyebrows de las tarjetas, donde no cabe la larga. */
export function formatDateShort(iso: string): string {
  return shortFormatter.format(new Date(`${iso}T00:00:00Z`)).replace(/\./g, '');
}
