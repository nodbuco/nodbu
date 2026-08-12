import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { body, display, mono } from './fonts';
import './globals.css';
import { Analytics } from '@/components/Analytics';
import { JsonLd } from '@/components/JsonLd';
import { Background } from '@/components/ui/Background';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { countryNames } from '@/content/countries';
import { site } from '@/content/site';
import { absoluteUrl, globalGraph } from '@/lib/seo';
import { themeInitScript } from '@/lib/theme';

const description =
  'Conectamos las herramientas que ya usas —CRM, correo, hojas de cálculo, facturación y ' +
  'mensajería— para que los pedidos, las cotizaciones y el seguimiento a clientes dejen de ' +
  'hacerse a mano. Diagnóstico gratuito de 15 minutos.';

export const metadata: Metadata = {
  // Base para que las URL relativas de OG y canonical salgan absolutas.
  metadataBase: new URL(site.url),
  title: {
    default: 'NODBU · Automatizaciones e integraciones para empresas',
    template: '%s · NODBU',
  },
  description,
  applicationName: site.name,
  keywords: [
    'automatización de procesos',
    'integraciones entre sistemas',
    'automatizar WhatsApp empresa',
    'conectar CRM con facturación',
    'automatizar cotizaciones',
    'automatizar seguimiento de leads',
    'reportes automáticos',
    'eliminar trabajo manual',
    'chatbots de ventas',
    'sistema de gestión de pedidos',
    'páginas web para empresas',
    'software a la medida',
    // Una variante por pais atendido
    ...countryNames.map((country) => `automatización de procesos ${country}`),
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  // Con barra final, como TODAS las URL del sitio: se compila con
  // trailingSlash: true y el sitemap tambien la escribe asi. Declararla sin
  // barra aqui seria anunciar dos URL distintas para la misma pagina.
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: absoluteUrl('/'),
    siteName: site.name,
    title: 'NODBU · Automatizaciones e integraciones para empresas',
    description,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'NODBU — automatizaciones e integraciones para empresas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NODBU · Automatizaciones e integraciones para empresas',
    description,
    images: ['/og.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: 'business',
};

/**
 * Grafo global: Organization, WebSite y Person.
 *
 * Va en el layout, asi que aparece en TODAS las paginas. Cada ruta anade
 * despues su propio grafo (BlogPosting, CollectionPage...) referenciando estos
 * nodos por @id en vez de repetirlos. El detalle esta en lib/seo.ts.
 */
const jsonLd = globalGraph(description);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" data-theme="dark" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {/* Aplica el tema guardado ANTES de que React hidrate. Sin esto la
            pagina pinta en oscuro y salta a claro al hidratar, con parpadeo.
            Va aqui arriba del todo, sin defer, a proposito. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        {/*
          Sin JavaScript, <Reveal> deja sus bloques en opacity:0 (es el estado
          inicial pensado para que Framer Motion los anime al entrar en
          pantalla; sin motor que los anime, se quedan invisibles aunque el
          texto siga en el HTML). Un rastreador que no ejecuta scripts ya lo
          lee igual — se comprobó en su momento —, pero una persona con
          JavaScript desactivado no lo vería.

          NO PUEDE VIVIR SOLO EN globals.css: no existe ningun selector CSS
          que distinga "el navegador no ejecuta JavaScript" de "lo ejecuta".
          <noscript> es el unico mecanismo del propio HTML para eso — su
          contenido es INERTE mientras haya scripting activo, así que esta
          regla no toca nada de la animación normal. La comprobamos con y sin
          JS: con JS, Framer Motion sustituye el estilo inicial en cuanto
          hidrata y esta regla ni se aplica.

          El selector es una igualdad EXACTA con el `style` que emite Reveal
          (comprobado en el HTML compilado), no una coincidencia parcial: un
          selector por substring como [style*="opacity:0"] también
          engancharía cosas como "opacity:0.62", que sí deben seguir así.
        */}
        <noscript>
          <style>
            {'[style="opacity:0;transform:translateY(24px)"]{opacity:1 !important;transform:none !important}'}
          </style>
        </noscript>

        <JsonLd data={jsonLd} />

        <Analytics />

        {/* Salto al contenido: primer elemento enfocable de la pagina. */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-nodbu focus:px-5 focus:py-3 focus:text-body-s focus:font-medium focus:text-ink"
        >
          Saltar al contenido
        </a>

        <Background />
        <ScrollProgress />

        {children}

        {/* Máscara de degradado inferior fija (Gradient Mask) */}
        <div 
          className="fixed bottom-0 left-0 right-0 h-8 sm:h-12 pointer-events-none z-[60] bg-ink/80 backdrop-blur-[2px]" 
          style={{ 
            maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </body>
    </html>
  );
}
