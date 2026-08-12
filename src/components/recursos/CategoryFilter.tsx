'use client';

import { useState } from 'react';
import { ArticleCard } from '@/components/recursos/ArticleCard';
import { categoryLabels, resourcesPage } from '@/content/recursos';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import { ARTICLE_CATEGORIES, type ArticleCategory, type ArticleMeta } from '@/types/article';

/**
 * Rejilla de artículos con filtro por categoria.
 *
 * Es cliente por una sola razon: el useState del filtro. Todo lo demas —las
 * tarjetas, el texto— se renderiza igual en el servidor, asi que quien entre
 * con JavaScript desactivado ve TODOS los articulos y solo se pierde el filtro.
 * Ese es el motivo de filtrar en memoria en vez de por URL: sin JS no hay
 * pagina rota, hay una pagina sin filtro.
 *
 * Sin paginacion: con menos de 12 articulos, paginar esconde contenido a cambio
 * de nada. Cuando se pase de ahi, este es el sitio donde anadirla.
 */

type Filter = ArticleCategory | 'todos';

export function CategoryFilter({ articles }: { articles: ArticleMeta[] }) {
  const [active, setActive] = useState<Filter>('todos');

  const visible = active === 'todos' ? articles : articles.filter((a) => a.category === active);

  // Las categorias se derivan de los articulos que ESTA rejilla muestra, no del
  // total del sitio: si el destacado se saca de la rejilla, sus cuentas tienen
  // que bajar con el. Se recorre ARTICLE_CATEGORIES para respetar el orden
  // canonico en vez del orden de aparicion.
  const categories = ARTICLE_CATEGORIES.map((category) => ({
    category,
    count: articles.filter((article) => article.category === category).length,
  })).filter((entry) => entry.count > 0);

  const chips: { key: Filter; label: string; count: number }[] = [
    { key: 'todos', label: resourcesPage.allCategoriesLabel, count: articles.length },
    ...categories.map(({ category, count }) => ({
      key: category as Filter,
      label: categoryLabels[category].label,
      count,
    })),
  ];

  return (
    <>
      {/* Con una sola categoria el filtro no filtra nada: se oculta. */}
      {categories.length > 1 ? (
        <div role="group" aria-label="Filtrar por categoría" className="mt-8 flex flex-wrap gap-2">
          {chips.map((chip) => {
            const isActive = chip.key === active;
            return (
              <button
                key={chip.key}
                type="button"
                onClick={() => setActive(chip.key)}
                aria-pressed={isActive}
                className={cn(
                  'rounded-full border px-4 py-2 font-mono text-mono uppercase transition-colors',
                  isActive
                    ? 'border-nodbu/40 bg-nodbu/10 text-paper'
                    : 'border-hairline text-paper-faint hover:text-paper-muted',
                )}
              >
                {chip.label} <span aria-hidden="true">({chip.count})</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((article, i) => (
          // El Reveal va en la tarjeta, no dentro de ella: es un bloque de
          // primer nivel de la pagina, que es lo que la regla permite animar.
          <Reveal as="li" key={article.slug} index={i % 3}>
            <ArticleCard article={article} />
          </Reveal>
        ))}
      </ul>
    </>
  );
}
