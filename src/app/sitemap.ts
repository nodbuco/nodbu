import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { absoluteUrl, articleUrl } from '@/lib/seo';

/**
 * Con output: 'export' esto se resuelve en el build y deja un sitemap.xml
 * estatico en /out. No hay revalidacion ni nada dinamico.
 *
 * TODAS las URL salen de absoluteUrl()/articleUrl(), asi que llevan barra final
 * y coinciden EXACTAMENTE con la canonica que declara cada pagina. Una URL en
 * el sitemap que no coincida con su canonica es una contradiccion: le dice al
 * buscador "indexa esta" y la propia pagina le responde "no, la otra".
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  // Fecha del build para lo que no tiene fecha propia. Los articulos SI la
  // tienen: usan su updatedAt, que es un dato real y no "cuando se compilo".
  const buildDate = new Date();
  const asDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

  return [
    {
      url: absoluteUrl('/'),
      lastModified: buildDate,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl('/recursos'),
      // El hub cambia cuando cambia su artículo mas reciente.
      lastModified: articles[0] ? asDate(articles[0].updatedAt) : buildDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...articles.map((article) => ({
      url: articleUrl(article.slug),
      lastModified: asDate(article.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: absoluteUrl('/sobre-nodbu'),
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: absoluteUrl('/privacidad'),
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: absoluteUrl('/aviso-legal'),
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: absoluteUrl('/terminos'),
      lastModified: buildDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
