'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import type { ArticleHeading } from '@/types/article';

/**
 * Indice del artículo, pegajoso en la columna lateral desde `lg`.
 *
 * Oculto en movil a proposito: en una pantalla estrecha un indice o empuja el
 * texto media pantalla hacia abajo o se convierte en un desplegable que nadie
 * abre. El articulo ya tiene su TL;DR arriba, que cumple la misma funcion de
 * "de que va esto" en un solo bloque.
 *
 * El apartado activo se marca con IntersectionObserver, no escuchando el
 * scroll: el navegador ya sabe que hay en pantalla y avisa solo cuando cambia,
 * asi que no se ejecuta nada en cada pixel de desplazamiento.
 */

export function TableOfContents({ headings }: { headings: ArticleHeading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // De todos los encabezados visibles, el activo es el mas alto de la
        // pagina. Sin esto, al entrar uno nuevo por abajo el indice saltaria
        // hacia adelante mientras todavia se lee el anterior.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // La franja activa es el tercio superior del viewport, por debajo de la
        // navbar flotante.
        rootMargin: '-96px 0px -66% 0px',
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav aria-label="Contenido del artículo" className="sticky top-28">
      <p className="eyebrow">En esta página</p>
      <ul className="mt-4 flex flex-col gap-2.5 border-l border-hairline">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  '-ml-px block border-l py-0.5 text-body-s transition-colors',
                  heading.level === 3 ? 'pl-7' : 'pl-4',
                  isActive
                    ? 'border-nodbu text-paper'
                    : 'border-transparent text-paper-faint hover:text-paper-muted',
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
