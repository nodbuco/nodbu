import type { ReactNode } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat';

/**
 * Envoltorio de las paginas legales: mismo fondo, misma navbar y mismo footer
 * que la landing, con el texto a una columna estrecha para que se lea.
 */
export function LegalShell({
  eyebrow,
  title,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Fecha de la ultima revision, ya formateada. */
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main id="contenido" className="pb-section pt-36 sm:pt-44">
        <div className="shell max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-display-l">{title}</h1>
          <p className="mt-5 font-mono text-mono uppercase text-paper-faint">
            Última revisión: {updatedAt}
          </p>

          <div className="legal mt-4">{children}</div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
