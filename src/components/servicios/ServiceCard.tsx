import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { servicesPage, type ServicePage } from '@/content/servicios';
import { servicePath } from '@/lib/seo';

/**
 * Tarjeta del hub de servicios y del bloque "Otros servicios". Misma familia
 * que ArticleCard e IntegrationCard: vidrio sin blur, enlace que cubre la
 * tarjeta con ::after, cero naranja. El icono va en paper-muted, como en la
 * portada: seis acentos en una rejilla dejan sin fuerza al CTA.
 */
export function ServiceCard({ service }: { service: ServicePage }) {
  const Icon = service.icon;
  return (
    <article className="glass-flat group relative flex h-full flex-col p-6 transition-transform duration-300 ease-soft hover:-translate-y-1 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <Icon size={24} strokeWidth={1.6} className="text-paper-muted" aria-hidden="true" />
        <span className="font-mono text-mono uppercase text-paper-faint">
          {service.kind === 'a-medida' ? 'A medida' : 'Proceso'}
        </span>
      </div>

      <h3 className="mt-6 font-display text-body-l font-medium text-paper text-balance">
        <Link href={servicePath(service.slug)} className="after:absolute after:inset-0 after:content-['']">
          {service.title}
        </Link>
      </h3>

      <p className="mt-2 text-body-s text-paper-muted text-pretty">{service.headline}</p>

      <p className="mt-6 flex items-center gap-2 text-body-s font-medium text-paper-faint transition-colors group-hover:text-paper">
        {servicesPage.labels.cta}
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
        />
      </p>
    </article>
  );
}
