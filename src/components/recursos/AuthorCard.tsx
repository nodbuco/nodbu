import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { authorCard } from '@/content/recursos';
import { site } from '@/content/site';

/**
 * Ficha de autor al pie del artículo.
 *
 * No es decoracion: los buscadores con IA valoran que un contenido tenga un
 * autor identificable con una entidad detras. El nombre y el cargo salen de
 * site.legalEntity, que es la misma fuente que alimenta el nodo Person del
 * JSON-LD, asi que lo que se lee y lo que se marca no pueden divergir.
 *
 * El enlace a /sobre-nodbu/ es ademas uno de los enlaces internos obligatorios.
 */
export function AuthorCard() {
  return (
    <aside className="border-t border-hairline pt-8">
      <p className="eyebrow">{authorCard.heading}</p>

      <p className="mt-4 font-display text-body-l font-medium text-paper">
        {site.legalEntity.holder}
      </p>
      <p className="mt-1 text-body-s text-paper-faint">{site.legalEntity.role}</p>

      <p className="mt-4 max-w-2xl text-body-s text-paper-muted text-pretty">{authorCard.bio}</p>

      <Link
        href="/sobre-nodbu/"
        className="group mt-5 inline-flex items-center gap-2 text-body-s font-medium text-paper transition-colors hover:text-paper-muted"
      >
        {authorCard.linkLabel}
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
        />
      </Link>
    </aside>
  );
}
