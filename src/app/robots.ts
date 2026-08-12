import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

/** Se resuelve en el build y deja un robots.txt estatico en /out. */
export const dynamic = 'force-static';

/**
 * Rastreadores de los buscadores con IA.
 *
 * `User-agent: *` ya los permite a todos, asi que nombrarlos es REDUNDANTE a
 * efectos tecnicos. Se hace igualmente por dos motivos:
 *
 *  1. Es una declaracion de intenciones explicita y auditable. Muchos sitios
 *     bloquean estos bots; que aqui aparezcan permitidos uno a uno deja claro
 *     que es una decision tomada y no un descuido.
 *  2. Protege de un cambio futuro. El dia que alguien restrinja el `*` para
 *     frenar a un raspador, estas reglas siguen abiertas y no se pierde la
 *     presencia en ChatGPT, Perplexity o Claude sin querer.
 *
 * Que hace cada uno:
 *  - GPTBot          entrena modelos de OpenAI
 *  - OAI-SearchBot   indexa para la busqueda de ChatGPT
 *  - ChatGPT-User    entra cuando un usuario pide abrir un enlace concreto
 *  - ClaudeBot       rastrea para Anthropic
 *  - Claude-SearchBot busca en tiempo real para Claude
 *  - PerplexityBot   indexa para Perplexity
 *  - Google-Extended NO es un rastreador: es la senal de si Google puede usar
 *    lo ya rastreado para Gemini y las respuestas generadas
 *  - Applebot-Extended  lo mismo para Apple Intelligence
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
