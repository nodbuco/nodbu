/**
 * Reglas comunes a las doce marcas del carrusel de integraciones:
 *
 *  - viewBox 0 0 24 24 y color heredado con `currentColor`, para que quien las
 *    use controle color y opacidad desde una sola clase.
 *  - aria-hidden: el nombre de la marca lo pone el contexto como texto real,
 *    asi que el dibujo es decorativo y el lector de pantalla debe saltarlo.
 *
 * Aceptan x/y/width/height ademas de className porque se usan en dos sitios
 * muy distintos: como iconos HTML en el carrusel (basta className) y anidadas
 * dentro del SVG del lienzo del hero, donde hacen falta coordenadas.
 *
 * Son representaciones geometricas simplificadas, NO los archivos oficiales de
 * cada empresa. Si alguna marca exige su asset original, se sustituye solo su
 * componente y el resto no se entera.
 */

export type MarkProps = {
  className?: string;
  /** Solo al anidarlas dentro de otro SVG. */
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export function markSvgProps({ className, x, y, width, height }: MarkProps) {
  return {
    className,
    x,
    y,
    width,
    height,
    viewBox: '0 0 24 24',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
    focusable: 'false',
  } as const;
}
