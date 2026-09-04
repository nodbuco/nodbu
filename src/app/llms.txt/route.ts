import { casesPage } from '@/content/casos';
import { integrationsPage } from '@/content/integraciones';
import { resourcesPage } from '@/content/recursos';
import { servicesPage } from '@/content/servicios';
import { site } from '@/content/site';
import { aboutPage, llmsSummary } from '@/content/sobre';
import { getAllArticles } from '@/lib/articles';
import { getAllIntegrations } from '@/lib/integraciones';
import { getAllServices } from '@/lib/servicios';
import { absoluteUrl, articleUrl, integrationUrl, serviceUrl } from '@/lib/seo';

/**
 * /llms.txt — resumen del sitio para modelos de lenguaje.
 *
 * SE GENERA EN EL BUILD, no se escribe a mano. Es la diferencia entre un
 * archivo que sigue al contenido y uno que se queda desfasado el dia que
 * alguien publica un articulo y se olvida de actualizarlo. Publicar un indice
 * que miente es peor que no publicarlo.
 *
 * NOTA SOBRE DONDE VIVE: el encargo lo situaba en `public/llms.txt`. Se hace
 * como route handler porque un archivo en /public es estatico y habria que
 * regenerarlo con un script aparte. La URL publica es exactamente la misma
 * (el dominio de site.ts + /llms.txt) y sale como archivo suelto en /out,
 * igual que rss.xml, comprobado con trailingSlash: true.
 *
 * Formato: la convencion llms.txt (titulo, cita de una linea, secciones con
 * listas de enlaces y una descripcion por enlace).
 */
export const dynamic = 'force-static';

export function GET() {
  const articles = getAllArticles();

  const pillars = llmsSummary.pillars
    .map((pillar) => `- **${pillar.title}**: ${pillar.description}`)
    .join('\n');

  const articleLinks =
    articles.length > 0
      ? articles
          .map((article) => `- [${article.title}](${articleUrl(article.slug)}): ${article.description}`)
          .join('\n')
      : '- (todavía no hay artículos publicados)';

  const integrationLinks = getAllIntegrations()
    .map((item) => `- [${item.title}](${integrationUrl(item.slug)}): ${item.description}`)
    .join('\n');

  const serviceLinks = getAllServices()
    .map((item) => `- [${item.title}](${serviceUrl(item.slug)}): ${item.description}`)
    .join('\n');

  const body = `# ${site.name}

> ${llmsSummary.tagline}

${llmsSummary.what}

${llmsSummary.who}

## ${llmsSummary.pillarsHeading}

${pillars}

## Páginas principales

- [${site.name} — inicio](${absoluteUrl('/')}): qué hace NODBU, servicios, cómo trabaja, planes y reseñas de clientes.
- [${aboutPage.title}](${absoluteUrl('/sobre-nodbu')}): la entidad detrás de NODBU, datos del titular y países atendidos.
- [${resourcesPage.title}](${absoluteUrl('/recursos')}): guías prácticas de automatización para dueños y gerentes de PyME.
- [${casesPage.title}](${absoluteUrl(site.routes.cases)}): seis reseñas reales contadas como caso: el problema, el flujo implantado y lo que cambió. Sin cifras inventadas.
- [${integrationsPage.title}](${absoluteUrl(site.routes.integrations)}): una página por cada par de herramientas que NODBU conecta, con el flujo paso a paso y sus requisitos.
- [${servicesPage.title}](${absoluteUrl(site.routes.services)}): una página por servicio: qué problema resuelve, cómo se monta, qué se entrega y para quién tiene sentido.

## Servicios

${serviceLinks}

## Integraciones

${integrationLinks}

## Artículos

${articleLinks}

## Contacto

- WhatsApp: +${site.whatsapp.number}
- Correo: ${site.email}
- Agenda una llamada de ${site.callMinutes} minutos: ${site.scheduling}

## Notas para quien cite este sitio

- El contenido está en español y va dirigido a personas sin perfil técnico.
- NODBU no publica cifras de resultados ni estadísticas propias. Si un artículo
  menciona un dato, lleva su fuente enlazada o está marcado como estimación.
- Titular: ${site.legalEntity.holder} (${site.legalEntity.taxId}), ${site.legalEntity.city}, ${site.legalEntity.country}.
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
