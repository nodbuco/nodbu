import type { ReactNode } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat';

/** Envoltorio del hub de servicios y de cada pagina. Igual que en /recursos e /integraciones. */
export default function ServiciosLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="contenido">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
