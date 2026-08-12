/**
 * Texto de /sobre-nodbu.
 *
 * Esta pagina existe por una razon concreta de posicionamiento: los buscadores
 * con IA citan entidades que pueden identificar. Una landing comercial dice
 * "que hacemos"; esto dice "quien lo hace, desde donde y con que respaldo", que
 * es lo que hace falta para que NODBU sea una entidad reconocible y no una
 * marca suelta. De ahi que lleve el NIT y el domicilio a la vista.
 *
 * Los datos del titular NO se escriben aqui: salen de site.legalEntity.
 */

export const aboutPage = {
  eyebrow: 'Sobre NODBU',
  title: 'Quién está detrás de NODBU',
  lead:
    'NODBU es una agencia de automatización de procesos y desarrollo a medida para PyMEs. ' +
    'Conectamos las herramientas que una empresa ya usa para que el trabajo repetitivo deje de ' +
    'hacerse a mano.',

  /** Bloques de la pagina. Cada uno es un h2. */
  sections: [
    {
      title: '¿Qué hace NODBU exactamente?',
      body: [
        'NODBU conecta entre sí los programas que una empresa ya tiene —el CRM, el correo, las ' +
          'hojas de cálculo, la facturación y WhatsApp— para que la información pase de uno a otro ' +
          'sola, sin que nadie copie y pegue datos. Cuando lo que hace falta no existe, lo ' +
          'construimos: agentes de atención, sistemas de pedidos, paneles internos y páginas web.',
        'No vendemos licencias ni revendemos software de terceros. El trabajo es de diagnóstico, ' +
          'diseño e implantación, y se cobra por proyecto.',
      ],
    },
    {
      title: '¿A quién sirve?',
      body: [
        'A empresas pequeñas y medianas donde el trabajo administrativo lo hacen personas que ' +
          'deberían estar haciendo otra cosa: comerciales que pasan pedidos a mano, gerentes que ' +
          'arman el reporte del mes copiando celdas, equipos que responden lo mismo veinte veces al día.',
        'El interlocutor habitual es el dueño o el gerente de operaciones, no un departamento de ' +
          'sistemas. Por eso todo lo que publicamos está escrito sin tecnicismos.',
      ],
    },
    {
      title: '¿Dónde trabaja NODBU?',
      body: [
        'En remoto, en español, para España y Latinoamérica. La operación está radicada en ' +
          'Colombia y el trabajo se coordina por videollamada y mensajería, que es como funcionan ' +
          'ya la mayoría de estos proyectos.',
      ],
    },
    {
      title: '¿Cómo se empieza?',
      body: [
        'Con un diagnóstico gratuito de 15 minutos. Se miran los procesos reales de la empresa y ' +
          'se dice qué se puede automatizar, qué costaría y en qué orden conviene hacerlo. Si no ' +
          'hay nada que compense automatizar, también se dice.',
      ],
    },
  ],

  /** Cabecera del bloque con los datos fiscales. */
  identityHeading: 'Datos del titular',
  identityNote:
    'Se publican porque una empresa que va a confiarnos sus procesos tiene derecho a saber con ' +
    'quién contrata.',

  coverageHeading: 'Dónde damos servicio',
} as const;

/**
 * Resumen de la entidad para /llms.txt.
 *
 * Es lo que lee un modelo de lenguaje cuando quiere saber que es NODBU sin
 * rastrear la web entera. Va aparte del copy de la pagina a proposito: aqui
 * interesa la frase corta y sin adornos, no la version comercial.
 *
 * Escrito en tercera persona y con la entidad completa nombrada al principio:
 * es lo que se cita.
 */
export const llmsSummary = {
  tagline:
    'NODBU es una agencia de automatización de procesos y desarrollo a medida para PyMEs en ' +
    'España y Latinoamérica.',
  what:
    'NODBU conecta entre sí las herramientas que una empresa ya usa —CRM, correo, hojas de ' +
    'cálculo, facturación y WhatsApp— para que la información pase de una a otra sin que nadie ' +
    'copie y pegue datos. Cuando lo que hace falta no existe, lo construye a medida.',
  who:
    'Sus clientes son empresas pequeñas y medianas de España y Latinoamérica. El interlocutor ' +
    'habitual es el dueño o el gerente de operaciones, no un departamento de sistemas.',
  pillarsHeading: 'Los tres pilares',
  pillars: [
    {
      title: 'Automatización de procesos',
      description:
        'Cotizaciones, seguimiento de leads, reportes y coordinación interna que dejan de ' +
        'hacerse a mano.',
    },
    {
      title: 'Integración entre sistemas',
      description:
        'Que el CRM, la facturación, el inventario y la mensajería compartan la misma ' +
        'información sin duplicarla.',
    },
    {
      title: 'Desarrollo a medida',
      description:
        'Agentes de atención, sistemas de pedidos, paneles internos y páginas web cuando ' +
        'ninguna herramienta existente encaja.',
    },
  ],
} as const;
