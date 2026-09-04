import { Plus, Workflow } from 'lucide-react';
import { BrandMark } from '@/components/logos/BrandMark';
import { brandMarks } from '@/components/logos';
import type { IntegrationTool } from '@/content/integraciones';
import { cn } from '@/lib/cn';

/**
 * Las dos herramientas de una integracion, una junto a otra con un "+" en
 * medio. Es el elemento que identifica cada pagina del directorio y por eso
 * se dibuja siempre igual, en el hub y en la pagina.
 *
 * Los logotipos son los oficiales a color, del mismo registro que el
 * carrusel de la portada (BrandMark). Una herramienta sin logotipo (como
 * "Facturacion electronica", que es una categoria y no una marca) cae a un
 * icono generico en paper: la pagina no se rompe por no tener un dibujo.
 *
 * Cero naranja propio: los colores que se ven son de las marcas, y el acento
 * de la pagina va en el CTA.
 */

type IntegrationPairProps = {
  tools: [IntegrationTool, IntegrationTool];
  /** `sm` para las tarjetas del hub, `lg` para la cabecera de la pagina. */
  size?: 'sm' | 'lg';
  className?: string;
};

function Tool({ tool, size }: { tool: IntegrationTool; size: 'sm' | 'lg' }) {
  const hasMark = tool.mark !== undefined && tool.mark in brandMarks;
  const box = size === 'lg' ? 'h-16 w-16 sm:h-20 sm:w-20' : 'h-12 w-12';
  const glyph = size === 'lg' ? 'h-8 w-8 sm:h-10 sm:w-10' : 'h-6 w-6';

  return (
    <span
      className={cn('grid shrink-0 place-items-center rounded-glass border border-hairline bg-paper/[.04] text-paper', box)}
      // El nombre va como texto al lado; el dibujo es decorativo.
      aria-hidden="true"
    >
      {hasMark ? (
        <BrandMark slug={tool.mark as string} size={size === 'lg' ? 'lg' : 'sm'} />
      ) : (
        <Workflow className={glyph} strokeWidth={1.6} />
      )}
    </span>
  );
}

export function IntegrationPair({ tools, size = 'sm', className }: IntegrationPairProps) {
  const [a, b] = tools;
  return (
    <span className={cn('inline-flex items-center', size === 'lg' ? 'gap-4 sm:gap-5' : 'gap-3', className)}>
      <Tool tool={a} size={size} />
      <Plus size={size === 'lg' ? 22 : 16} aria-hidden="true" className="shrink-0 text-paper-faint" />
      <Tool tool={b} size={size} />
      <span className="sr-only">
        {a.name} y {b.name}
      </span>
    </span>
  );
}
