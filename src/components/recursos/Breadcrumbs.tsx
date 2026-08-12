import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/**
 * Migas de pan.
 *
 * El ultimo nivel NO es un enlace (ya estas ahi) y lleva aria-current="page".
 * El separador es decorativo y va aria-hidden: un lector de pantalla ya anuncia
 * la lista, no necesita oir "mayor que" entre cada nivel.
 *
 * El BreadcrumbList del JSON-LD se construye aparte, en lib/seo.ts, a partir de
 * los mismos datos.
 */

export type Crumb = {
  label: string;
  /** Sin href = nivel actual. */
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Migas de pan">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-mono uppercase text-paper-faint">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-paper">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-paper-muted">
                  {item.label}
                </span>
              )}
              {isLast ? null : <ChevronRight size={12} aria-hidden="true" className="shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
