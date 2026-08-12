import { cn } from '@/lib/cn';

/**
 * Logotipo horizontal real del kit de marca.
 *
 * El kit trae las DOS variantes y las dos estan en /public/brand:
 *   logo-full-white.svg  trazos en blanco -> modo oscuro
 *   logo-full.svg        trazos en negro  -> modo claro
 * El punto naranja es el mismo en las dos: es la marca y no se toca.
 *
 * Se pintan las dos y se enseña una segun data-theme, en vez de cambiar el src
 * con JavaScript: asi no hay parpadeo ni salto al hidratar, y quien entre sin
 * JS ve la que corresponde al tema por defecto.
 *
 * El unico cambio respecto a los archivos originales es el viewBox, recortado
 * para quitar el lienzo vacio que traian a la derecha; los trazos no se tocaron.
 */

// 685 x 182 en el archivo -> relacion 3.764
const RATIO = 685 / 182;

type LogoProps = {
  /** Alto en px. El ancho se calcula solo para que no haya salto de layout. */
  height?: number;
  className?: string;
};

export function Logo({ height = 26, className }: LogoProps) {
  const width = Math.round(height * RATIO);
  const common = 'block h-auto w-auto';

  return (
    <span className={cn('inline-block', className)} style={{ height }}>
      <img
        src="/brand/logo-full-white.svg"
        alt="NODBU"
        height={height}
        width={width}
        style={{ height }}
        decoding="async"
        className={cn(common, 'theme-dark-only')}
      />
      <img
        src="/brand/logo-full.svg"
        alt="NODBU"
        height={height}
        width={width}
        style={{ height }}
        decoding="async"
        className={cn(common, 'theme-light-only')}
      />
    </span>
  );
}
