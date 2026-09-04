import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IntegrationPair } from '@/components/integraciones/IntegrationPair';
import { integrationsPage, type Integration } from '@/content/integraciones';
import { integrationPath } from '@/lib/seo';

/**
 * Tarjeta del hub de integraciones. Misma familia que ArticleCard: vidrio sin
 * blur, el enlace cubre la tarjeta entera con ::after, cero naranja.
 *
 * El h3 es el nombre del par ("HubSpot + WhatsApp"), que es lo que la gente
 * busca; el titular de resultado va debajo como texto.
 */
export function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <article className="glass-flat group relative flex h-full flex-col p-6 transition-transform duration-300 ease-soft hover:-translate-y-1 sm:p-7">
      <IntegrationPair tools={integration.tools} />

      <h3 className="mt-6 font-display text-body-l font-medium text-paper text-balance">
        <Link
          href={integrationPath(integration.slug)}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {integration.title}
        </Link>
      </h3>

      <p className="mt-2 text-body-s text-paper-muted text-pretty">{integration.headline}</p>

      <p className="mt-6 flex items-center gap-2 text-body-s font-medium text-paper-faint transition-colors group-hover:text-paper">
        {integrationsPage.labels.cta}
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
        />
      </p>
    </article>
  );
}
