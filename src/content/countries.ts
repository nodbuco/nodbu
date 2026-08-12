/**
 * Paises donde NODBU atiende. Se usan en tres sitios a la vez:
 *  1. los chips de la seccion "Cobertura"
 *  2. el <select> del formulario de contacto
 *  3. el metadata (keywords) y el areaServed del JSON-LD
 *
 * Anadir un pais aqui lo anade en los tres. Sin banderas: solo el nombre.
 * `code` es ISO 3166-1 alfa-2, obligatorio para el JSON-LD.
 */

export type Country = {
  /** Nombre en espanol, tal cual se muestra. */
  name: string;
  /** ISO 3166-1 alfa-2. */
  code: string;
};

export const countries: Country[] = [
  { name: 'España', code: 'ES' },
  { name: 'México', code: 'MX' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Chile', code: 'CL' },
  { name: 'Perú', code: 'PE' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Costa Rica', code: 'CR' },
  { name: 'Panamá', code: 'PA' },
  { name: 'República Dominicana', code: 'DO' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'Paraguay', code: 'PY' },
  { name: 'Bolivia', code: 'BO' },
];

/** Opcion extra del formulario para quien escribe desde fuera de la lista. */
export const OTHER_COUNTRY = 'Otro país';

/** Nombres sueltos, para keywords y para el <select>. */
export const countryNames: string[] = countries.map((c) => c.name);
