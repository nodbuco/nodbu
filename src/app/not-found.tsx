import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat';
import { buttonStyles } from '@/components/ui/Button';
import { site } from '@/content/site';

/**
 * Pagina 404. Con output: 'export' Next la deja como /out/404.html, que es
 * justo el archivo al que apunta ErrorDocument en el .htaccess.
 */

/**
 * `noindex` explicito.
 *
 * Sin esto la 404 hereda la canonica del layout raiz y acaba declarando que su
 * version buena es la portada, que es falso: le estaria diciendo al buscador
 * que cualquier URL rota del dominio es la home. Con noindex la canonica deja
 * de importar y la pagina no entra en el indice.
 *
 * `follow` se mantiene para que los enlaces de la navbar y el pie sigan
 * transmitiendo desde aqui.
 */
export const metadata: Metadata = {
  title: 'Página no encontrada',
  // `null` BORRA el valor heredado del layout raiz, no lo sustituye por vacio.
  alternates: { canonical: null },
  // Next ya pinta un noindex propio en las paginas not-found, pero el layout
  // declara `index: true` y hay que anularlo explicitamente aqui.
  robots: { index: false, follow: true },
};
export default function NotFound() {
  return (
    <>
      <Navbar />

      <main id="contenido" className="grid min-h-[70vh] place-items-center px-gutter py-section">
        <div className="max-w-lg text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-4 text-display-l">Esta página no existe</h1>
          <p className="mt-5 text-body-l text-paper-muted text-pretty">
            El enlace que has seguido está roto o la página cambió de sitio. Desde el inicio llegas
            a todo en un par de clics.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href={site.routes.home} className={buttonStyles('primary')}>
              Volver al inicio
            </Link>
            <Link href={site.routes.resources} className={buttonStyles('secondary')}>
              Ver los recursos
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
