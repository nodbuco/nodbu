/**
 * Une clases descartando los valores falsos.
 * Suficiente para este proyecto: no hay clases en conflicto que resolver,
 * asi que no hace falta traer clsx ni tailwind-merge.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
