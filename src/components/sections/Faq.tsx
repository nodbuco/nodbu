import { Accordion } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faq } from '@/content/faq';

/**
 * Seccion de preguntas de la landing.
 *
 * El acordeon vive en components/ui/Accordion.tsx porque los articulos de
 * /recursos usan el mismo. Aqui solo queda la seccion: cabecera, ancho y datos.
 */
export function Faq() {
  return (
    <section id="faq" className="py-section">
      <div className="shell">
        <SectionHeading eyebrow="Preguntas" title="Lo que suelen preguntarnos antes de empezar" />

        <Accordion
          idPrefix="faq"
          className="mx-auto mt-14 max-w-3xl"
          items={faq.map((item) => ({ question: item.question, answer: item.answer }))}
        />
      </div>
    </section>
  );
}
