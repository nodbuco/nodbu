/**
 * FUENTE UNICA DE VERDAD de los datos de contacto y del sitio.
 *
 * Si cambias el WhatsApp, el email o el dominio, cambialo AQUI y en ningun
 * otro archivo: el resto del proyecto importa siempre desde este modulo.
 * Recuerda que el sitio es estatico -> hay que volver a compilar y subir.
 */

const WHATSAPP_E164 = '573137938618'; // sin + ni espacios, formato de wa.me

export const site = {
  name: 'NODBU',
  /** Dominio con protocolo, sin barra final. Se usa en canonical, OG y JSON-LD. */
  url: 'https://nodbu.com',
  domain: 'nodbu.com',
  email: 'hola@nodbu.com',

  whatsapp: {
    /** Numero en E.164 sin simbolos, tal y como lo quiere wa.me. */
    number: WHATSAPP_E164,
    /** Como se muestra en pantalla. */
    display: '+57 313 793 8618',
    /** Texto que aparece ya escrito al abrir el chat. */
    message: 'Hola NODBU, quiero automatizar un proceso en mi empresa',
  },

  /**
   * Enlace de la agenda para la demo. Lo usan los dos botones
   * "Agenda tu demo ahora" (hero y encima del formulario final).
   * Si lo cambias, cambia en los dos sitios a la vez.
   */
  scheduling: 'https://cal.com/nodbu/15min',

  /** Duracion de la llamada de diagnostico. Se dice igual en toda la pagina. */
  callMinutes: 15,

  /**
   * Titular del negocio. Es la ENTIDAD que los buscadores tienen que reconocer:
   * alimenta la pagina /sobre-nodbu y el nodo Person del JSON-LD.
   *
   * Las paginas legales (privacidad y aviso legal) todavia lo llevan escrito en
   * su propio texto: ahi va dentro de frases juridicas y no conviene trocearlo
   * en variables. Si cambia algun dato, hay que tocar los tres sitios.
   */
  legalEntity: {
    holder: 'Diego Alonso Torres Alvarado',
    taxId: '1005259304',
    address: 'CR 1 G # 38 Sur - 09',
    city: 'Bogotá',
    country: 'Colombia',
    /** Como se firma en la pagina de autor. */
    role: 'Fundador de NODBU',
  },

  /** Redes sociales. Deja la cadena vacia para ocultar el enlace. */
  social: {
    linkedin: '',
    instagram: '',
    youtube: '',
  },

  /**
   * Rutas fijas del sitio. TODAS con barra final, como manda trailingSlash.
   *
   * Existen para que ningun componente construya una ruta a mano: si manana
   * /recursos pasa a llamarse de otra forma, se cambia aqui y no hay que ir
   * buscando cadenas sueltas por los componentes.
   */
  routes: {
    home: '/',
    resources: '/recursos/',
    about: '/sobre-nodbu/',
    privacy: '/privacidad/',
    /** Ancla del formulario de contacto, en la landing. */
    contact: '/#contacto',
    /** A donde va el envío correcto del formulario. `noindex`, fuera del sitemap. */
    thanks: '/gracias/',
  },

  /**
   * Enlaces del menu principal.
   *
   * LAS ANCLAS VAN EN FORMA ABSOLUTA (`/#servicios`, no `#servicios`) Y ESO NO
   * ES COSMETICO: desde /recursos/un-articulo/, un `#servicios` a secas busca
   * esa seccion DENTRO del articulo, no la encuentra y no pasa nada. Con la
   * barra delante, el navegador va a la portada y baja a la seccion.
   *
   * Las secciones ancladas tienen que coincidir con los id de la landing.
   */
  nav: [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Cómo funciona', href: '/#como-funciona' },
    { label: 'Planes', href: '/#planes' },
    { label: 'Recursos', href: '/recursos/' },
    { label: 'Preguntas', href: '/#faq' },
  ],

  /** Columna legal del pie. */
  legalNav: [
    { label: 'Política de privacidad', href: '/privacidad/' },
    { label: 'Aviso legal', href: '/aviso-legal/' },
    { label: 'Términos y condiciones', href: '/terminos/' },
  ],
} as const;

/**
 * URL de WhatsApp con el mensaje ya escrito.
 * Se genera a partir de site.whatsapp para que cambiar el numero en un solo
 * sitio lo cambie en toda la pagina.
 */
export function whatsappUrl(message: string = site.whatsapp.message): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Enlace mailto al buzon comercial. */
export const mailtoUrl = `mailto:${site.email}`;
