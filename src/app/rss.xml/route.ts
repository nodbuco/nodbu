import { resourcesPage } from '@/content/recursos';
import { site } from '@/content/site';
import { getAllArticles } from '@/lib/articles';
import { absoluteUrl, articleUrl } from '@/lib/seo';

/**
 * Feed RSS de /recursos.
 *
 * `force-static` hace que Next lo resuelva en el build y escriba un archivo
 * `out/rss.xml` de verdad. Comprobado: con `trailingSlash: true` sale como
 * archivo suelto, no como `rss.xml/index.html`, asi que Apache lo sirve tal
 * cual y no hace falta ningun script aparte.
 *
 * Solo GET y sin logica: es lo unico que admite `output: 'export'`.
 */
export const dynamic = 'force-static';

/**
 * Escapa los cinco caracteres que rompen un XML.
 *
 * Hace falta de verdad, no es defensivo: los titulos y descripciones vienen de
 * un frontmatter escrito a mano, y basta un "&" en "Ventas & Marketing" o unas
 * comillas angulares para dejar el feed invalido y que ningun lector lo abra.
 */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Fecha en el formato RFC 822 que pide RSS 2.0. */
function toRfc822(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toUTCString();
}

export function GET() {
  const articles = getAllArticles();
  const self = `${site.url}/rss.xml`;

  const items = articles
    .map((article) => {
      const url = articleUrl(article.slug);
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(article.publishedAt)}</pubDate>
      <description>${escapeXml(article.description)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${resourcesPage.title} · ${site.name}`)}</title>
    <link>${absoluteUrl('/recursos')}</link>
    <description>${escapeXml(resourcesPage.lead)}</description>
    <language>es</language>
    <atom:link href="${self}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
