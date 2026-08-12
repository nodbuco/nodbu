import { site } from '@/content/site';

/**
 * Texto del formulario de contacto que no es una etiqueta de campo.
 *
 * NO SOY ABOGADO Y ESTO NO ES ASESORÍA LEGAL. `consentRecord` es una base
 * razonable para dejar constancia de que la persona aceptó el tratamiento de
 * sus datos antes de enviarlos (Ley 1581 de 2012, Colombia), pero que lo
 * revise quien lleve la asesoría del negocio antes de depender de él como
 * prueba formal.
 */

export const leadForm = {
  /**
   * Texto junto a la casilla de consentimiento. Se corta en tres trozos para
   * poder meter el enlace a la política de privacidad en medio sin escribir
   * HTML aquí: el componente arma `prefix + <a>linkLabel</a> + suffix`.
   */
  consent: {
    prefix:
      'Acepto que NODBU guarde estos datos para responderme. Puedo pedir que los borren cuando quiera. Más detalle en la ',
    linkLabel: 'política de privacidad',
    suffix: '.',
  },

  /**
   * Lo que se manda a Web3Forms como prueba de que hubo consentimiento. Va
   * dentro del correo que llega, junto a la fecha exacta del envío: es la
   * declaración que la persona aceptó, no solo un "sí" suelto.
   *
   * El dominio sale de `site.domain`: escribirlo a mano aquí violaría la
   * regla de que ese dato vive solo en site.ts.
   */
  get consentRecord() {
    return `Sí, acepta que ${site.name} trate estos datos para responderle, según la política de privacidad de ${site.domain}.`;
  },
} as const;

/** Texto de /gracias/, a donde llega quien envía el formulario con éxito. */
export const thanksPage = {
  eyebrow: 'Mensaje enviado',
  title: 'Recibimos tu mensaje',
  lead:
    'Te responderemos hoy mismo a tu correo. Si prefieres ir más rápido, escríbenos por WhatsApp y seguimos por ahí.',
  backLabel: 'Volver al inicio',
} as const;
