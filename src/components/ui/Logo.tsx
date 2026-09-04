import { cn } from '@/lib/cn';

/**
 * Logotipo horizontal real del kit de marca (v2.0, NODBU_BRAND_KIT_FINAL).
 *
 * El kit trae las DOS variantes y las dos estan en /public/brand:
 *   nodbu-logotipo-blanco.svg  letras en blanco -> modo oscuro
 *   nodbu-logotipo.svg         letras en negro  -> modo claro
 * El punto naranja es el mismo en las dos: va dentro del SVG del kit, asi que
 * es el naranja de marca y no cambia con el tema (a diferencia del token
 * `nodbu`, que en claro se oscurece para cumplir contraste).
 *
 * Se pintan las dos y se enseña una segun data-theme, en vez de cambiar el src
 * con JavaScript: asi no hay parpadeo ni salto al hidratar, y quien entre sin
 * JS ve la que corresponde al tema por defecto.
 *
 * Los archivos van TAL CUAL salen del kit: ya vienen con el viewBox ajustado al
 * trazo (el v1 traia lienzo vacio y habia que recortarlo a mano) y con
 * role="img" + <title> dentro. Ese title no molesta al alt de los <img>: un SVG
 * cargado como imagen no expone su arbol interno al lector de pantalla.
 */

// 668.718 x 166.724 en el archivo -> relacion 4.011.
// OJO: el v1 media 685 x 182 (3.764). Si cambias de archivo, recalcula esto o
// el ancho reservado no cuadra con lo que se pinta.
const RATIO = 668.718 / 166.724;

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
        src="/brand/nodbu-logotipo-blanco.svg"
        alt="NODBU"
        height={height}
        width={width}
        style={{ height }}
        decoding="async"
        className={cn(common, 'theme-dark-only')}
      />
      <img
        src="/brand/nodbu-logotipo.svg"
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
