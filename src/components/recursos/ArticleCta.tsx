import { MessageCircle } from 'lucide-react';
import { buttonStyles } from '@/components/ui/Button';
import { ScheduleLink } from '@/components/ui/ScheduleLink';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { articleCta } from '@/content/recursos';

/**
 * Bloque de cierre de cada artículo.
 *
 * Los dos destinos salen de site.ts a traves de WhatsAppLink y ScheduleLink:
 * aqui no hay ni un numero ni una URL escritos a mano.
 *
 * Gasta el UNICO naranja del artículo (el boton primario). Por eso las tarjetas
 * del hub, el indice y las migas van en tonos de paper: si el articulo tuviera
 * mas acentos, este boton dejaria de ser el sitio donde va el ojo.
 */
export function ArticleCta({ source }: { source: string }) {
  return (
    <aside className="glass-flat p-7 sm:p-9">
      <p className="eyebrow">{articleCta.eyebrow}</p>
      <h2 className="mt-4 font-display text-display-m font-medium text-paper text-balance">
        {articleCta.title}
      </h2>
      <p className="mt-4 max-w-xl text-body-s text-paper-muted text-pretty">{articleCta.lead}</p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <WhatsAppLink source={source} className={buttonStyles('primary', 'w-full sm:w-auto')}>
          <MessageCircle size={18} aria-hidden="true" />
          Hablar por WhatsApp
        </WhatsAppLink>
        <ScheduleLink source={source} className={buttonStyles('secondary', 'w-full sm:w-auto')} />
      </div>
    </aside>
  );
}
