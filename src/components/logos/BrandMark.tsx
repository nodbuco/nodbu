import { cn } from '@/lib/cn';
import { brandMarks } from './index';

/**
 * Logotipo oficial de una herramienta de terceros, a color.
 *
 * Los archivos viven en /public/logos como SVG estaticos y se pintan con
 * <img>, no como componentes: son marcas ajenas con sus colores corporativos
 * fijos, y esos colores NO son tokens del sistema de diseño. La regla "ni un
 * hexadecimal fuera de tailwind.config.ts" es para lo que diseñamos nosotros;
 * un logotipo de Slack es de Slack, y tiene que verse como Slack lo dibuja.
 * Por eso no hay `fill-current` ni `text-*` aqui: nada fuerza el color.
 *
 * DOS TEMAS. La mayoria de las marcas se ven bien sobre oscuro y sobre claro.
 * Las que no (un glifo negro, un amarillo sobre crema) traen una variante
 * para el tema claro (`light`) y se pintan las dos con .theme-dark-only /
 * .theme-light-only, igual que hace <Logo> con el de NODBU: sin JavaScript y
 * sin parpadeo al cambiar de tema.
 *
 * TAMAÑO UNIFORME. La altura es fija por tamaño (24 / 32 / 40 px) y el ancho
 * es igual a la altura salvo en las marcas anchas (`wide`), que reciben un
 * poco mas para que su masa visual no quede raquitica al lado de una
 * cuadrada. `object-contain` centra cada una dentro de su caja, asi que la
 * rejilla se mantiene alineada aunque las proporciones difieran.
 *
 * El dibujo es decorativo: el nombre de la marca va como texto al lado (o en
 * el sr-only del par), asi que `alt` vacio y aria-hidden.
 */

type Size = 'sm' | 'md' | 'lg';

const HEIGHT: Record<Size, string> = { sm: 'h-6', md: 'h-8', lg: 'h-10' };
const WIDTH: Record<Size, string> = { sm: 'w-6', md: 'w-8', lg: 'w-10' };
const WIDE: Record<Size, string> = { sm: 'w-9', md: 'w-11', lg: 'w-14' };
/** Un nombre escrito necesita mucho mas ancho que un simbolo para leerse. */
const WORDMARK: Record<Size, string> = { sm: 'w-16', md: 'w-24', lg: 'w-32' };

export function BrandMark({
  slug,
  size = 'md',
  className,
}: {
  /** Clave en brandMarks. Sin ella no se pinta nada. */
  slug: string;
  size?: Size;
  className?: string;
}) {
  const mark = brandMarks[slug];
  if (!mark) return null;

  const width = mark.wordmark ? WORDMARK[size] : mark.wide ? WIDE[size] : WIDTH[size];
  const box = cn('block shrink-0 object-contain', HEIGHT[size], width, className);

  if (mark.light) {
    return (
      <>
        <img src={mark.src} alt="" aria-hidden="true" decoding="async" loading="lazy" className={cn(box, 'theme-dark-only')} />
        <img src={mark.light} alt="" aria-hidden="true" decoding="async" loading="lazy" className={cn(box, 'theme-light-only')} />
      </>
    );
  }

  return <img src={mark.src} alt="" aria-hidden="true" decoding="async" loading="lazy" className={box} />;
}
