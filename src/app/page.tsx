import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { ValueShowcase } from '@/components/sections/ValueShowcase';
import { Integrations } from '@/components/sections/Integrations';
import { Services } from '@/components/sections/Services';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Testimonials } from '@/components/sections/Testimonials';
import { Plans } from '@/components/sections/Plans';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat';

/**
 * Una sola pagina larga con anclas. El orden es el argumento de venta:
 * que hacemos -> que te duele -> con que se conecta -> que resolvemos ->
 * como -> quien lo dice -> cuanto -> contacto -> dudas que queden.
 *
 * El FAQ va DESPUES del formulario a proposito: quien ya se decidio no tiene
 * que pasar por encima de seis objeciones para llegar a los campos, y quien
 * todavia duda encuentra las respuestas justo debajo.
 *
 * Se quitaron dos secciones: "Casos de uso" (los testimonios reales cumplen la
 * misma funcion de prueba social) y "Cobertura" (los 14 paises siguen en el
 * metadata, en el JSON-LD y en el <select> del formulario, que es donde de
 * verdad servian).
 */
export default function Home() {
  return (
    <>
      <Navbar />

      <main id="contenido">
        <Hero />
        <ValueShowcase />
        <Integrations />
        <Services />
        <HowItWorks />
        <Testimonials />
        <Plans />
        <FinalCta />
        <Faq />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
