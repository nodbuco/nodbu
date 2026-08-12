import type { ReactNode } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat';

/**
 * Envoltorio comun del hub y de los articulos.
 *
 * Va aqui y no en el layout raiz porque la landing y las paginas legales ya
 * montan la navbar y el pie por su cuenta (page.tsx y LegalShell): subirlo a la
 * raiz los duplicaria en esas rutas.
 */
export default function RecursosLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="contenido">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
