/**
 * Pinta un bloque de datos estructurados.
 *
 * Va en el <body> y no en el <head> porque en el App Router es donde Next lo
 * deja intacto en el HTML exportado.
 *
 * El `<` se escapa a < antes de serializar. No es paranoia gratuita: si un
 * titulo de artículo llegara a contener la secuencia `</script`, el navegador
 * cerraria el bloque ahi y el resto del JSON se interpretaria como HTML. Es
 * barato y quita el problema de raiz.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
