import type { ReactNode } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat';

/**
 * Envoltorio comun del hub de integraciones y de cada pagina de par. Mismo
 * motivo que en /recursos: la landing y las legales montan navbar y pie por
 * su cuenta, asi que esto no puede subir al layout raiz.
 */
export default function IntegracionesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="contenido">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
