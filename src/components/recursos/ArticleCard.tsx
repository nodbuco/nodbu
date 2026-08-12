import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categoryLabels } from '@/content/recursos';
import { formatDateShort } from '@/lib/dates';
import { articlePath } from '@/lib/seo';
import { cn } from '@/lib/cn';
import type { ArticleMeta } from '@/types/article';

/**
 * Tarjeta de artículo del hub.
 *
 * Vidrio SIN blur (`glass-flat`): en el hub hay una rejilla entera de estas y
 * seis backdrop-filter a la vez hunden los FPS en movil de gama baja. Es la
 * misma decision que en servicios, resenas y planes.
 *
 * `featured` la pinta a lo ancho con mas jerarquia. No cambia de componente
 * para que el eyebrow y el formato de fecha no se separen entre las dos.
 *
 * Cero naranja: la seccion gasta su acento en el CTA del final. La flecha va en
 * paper-faint y solo se aviva al pasar por encima.
 */

export function ArticleCard({
  article,
  featured = false,
}: {
  article: ArticleMeta;
  featured?: boolean;
}) {
  const category = categoryLabels[article.category];

  return (
    <article
      className={cn(
        'glass-flat group relative flex h-full flex-col p-6 transition-transform duration-300 ease-soft hover:-translate-y-1 sm:p-7',
        featured && 'sm:p-9',
      )}
    >
      <p className="eyebrow">
        {category.label} · {formatDateShort(article.publishedAt)} · {article.readingMinutes} min
      </p>

      <h3
        className={cn(
          'mt-4 font-display font-medium text-paper text-balance',
          featured ? 'text-display-m' : 'text-body-l',
        )}
      >
        {/* El enlace cubre la tarjeta entera con ::after, asi que toda ella es
            pulsable sin anidar un <a> gigante alrededor del contenido. */}
        <Link
          href={articlePath(article.slug)}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {article.title}
        </Link>
      </h3>

      <p
        className={cn(
          'mt-3 text-paper-muted text-pretty',
          featured ? 'text-body-l' : 'text-body-s',
        )}
      >
        {featured ? article.tldr : article.description}
      </p>

      <p className="mt-6 flex items-center gap-2 text-body-s font-medium text-paper-faint transition-colors group-hover:text-paper">
        Leer
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
        />
      </p>
    </article>
  );
}
