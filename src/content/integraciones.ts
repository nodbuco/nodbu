/**
 * Directorio de integraciones: /integraciones/ y /integraciones/<slug>/.
 *
 * SEO PROGRAMATICO, PERO CON CONTENIDO DE VERDAD. Cada entrada de este array
 * es una pagina completa (problema, flujo, usos, requisitos y preguntas). No
 * es una plantilla con dos nombres de herramienta cambiados: una pagina de
 * 80 palabras repetida seis veces es lo que Google llama "thin content" y lo
 * que hunde un dominio entero. Si no hay 400 palabras propias que decir de un
 * par de herramientas, ese par no se publica.
 *
 * COMO SE ANADE UN PAR: una entrada nueva aqui y `npm run build`. Entra sola
 * en el hub, el sitemap, el llms.txt y el pie. Los slugs de `tools.mark` tienen
 * que existir en components/logos/index.ts; si una herramienta no tiene logo,
 * se deja `mark` vacio y sale un icono generico.
 *
 * Las reglas de redaccion son las de los articulos (GUIA.md): h2 en forma de
 * pregunta, nada de cifras inventadas, nada de promesas de resultado, español
 * neutro y segunda persona.
 */

export type IntegrationTool = {
  /** Nombre visible, tal cual se escribe la marca. */
  name: string;
  /** Clave en brandMarks (components/logos/index.ts). Sin ella, icono generico. */
  mark?: string;
};

export type IntegrationStep = {
  label: string;
  detail: string;
};

export type IntegrationFaq = {
  q: string;
  /** Respuesta autocontenida: se lee sin haber visto la pagina. */
  a: string;
};

export type Integration = {
  /** Es la URL: /integraciones/<slug>/. Minusculas y guiones. */
  slug: string;
  /** "HubSpot + WhatsApp". Aparece en el hub, las migas y el JSON-LD. */
  title: string;
  /** El h1: un resultado, no un nombre. Maximo ~70 caracteres. */
  headline: string;
  /** Meta description. Entre 120 y 165 caracteres. */
  description: string;
  tools: [IntegrationTool, IntegrationTool];
  /** Dos o tres parrafos: para quien es y que problema resuelve. */
  intro: string[];
  /** El flujo, paso a paso. De cuatro a seis. */
  flow: IntegrationStep[];
  /** Usos concretos. Frases cortas. */
  useCases: string[];
  /** Que hace falta tener antes de conectar nada. */
  requirements: string[];
  /** De tres a cinco. Alimentan el acordeon y el FAQPage. */
  faq: IntegrationFaq[];
  /** Slugs de /recursos relacionados. Se validan en el build. */
  articles: string[];
  /** Para el meta keywords de la pagina. */
  keywords: string[];
};

/** Copy del hub. El title es su unico h1. */
export const integrationsPage = {
  eyebrow: 'Integraciones',
  title: 'Qué pasa cuando conectas dos herramientas que ya usas',
  lead:
    'Cada página explica una combinación concreta: qué problema resuelve, cómo fluye la ' +
    'información de una herramienta a la otra y qué hace falta tener antes de empezar.',
  /** Debajo de la rejilla. */
  note:
    '¿Tu combinación no está? Conectamos casi cualquier programa que permita enlazar con otros ' +
    'o exportar datos. Cuéntanos cuáles usas y te decimos si se puede.',
  /** Etiquetas de las secciones de cada pagina. */
  labels: {
    problem: '¿Qué problema resuelve?',
    flow: '¿Cómo funciona el flujo?',
    useCases: '¿Para qué se usa?',
    requirements: '¿Qué hace falta tener?',
    faq: 'Preguntas frecuentes',
    articles: 'Guías relacionadas',
    related: 'Otras integraciones',
    cta: 'Ver cómo funciona',
  },
} as const;

export const integrations: Integration[] = [
  /* ------------------------------------------------------- HubSpot + WhatsApp */
  {
    slug: 'hubspot-whatsapp',
    title: 'HubSpot + WhatsApp',
    headline: 'Cada conversación de WhatsApp, registrada en HubSpot sin copiar nada',
    description:
      'Conectar WhatsApp con HubSpot para que cada contacto nuevo entre solo en el CRM, con su conversación, su origen y su tarea de seguimiento ya creada.',
    tools: [
      { name: 'HubSpot', mark: 'hubspot' },
      { name: 'WhatsApp', mark: 'whatsapp' },
    ],
    intro: [
      'La mayoría de las PyMEs que venden por WhatsApp tienen el mismo agujero: el cliente escribe, ' +
        'alguien le responde desde el móvil, y nada de eso llega al CRM. Cuando esa persona se va de ' +
        'vacaciones o deja la empresa, se va con las conversaciones.',
      'Esta integración conecta el número de WhatsApp Business de la empresa con HubSpot. Cada ' +
        'conversación crea o actualiza su contacto, deja registrado qué se habló y dispara el ' +
        'seguimiento que toque. El equipo sigue atendiendo por WhatsApp; lo que cambia es que ' +
        'HubSpot se entera de todo.',
    ],
    flow: [
      { label: 'Llega un mensaje', detail: 'Un cliente escribe al número de WhatsApp Business de la empresa.' },
      { label: 'Se busca el contacto', detail: 'El flujo comprueba si ese número ya existe en HubSpot. Si no, lo crea con origen "WhatsApp".' },
      { label: 'Se registra la conversación', detail: 'Los mensajes quedan en la ficha del contacto, en su línea de tiempo.' },
      { label: 'Se asigna y se avisa', detail: 'El contacto entra en el embudo que corresponde y su comercial recibe la notificación.' },
      { label: 'Se programa el seguimiento', detail: 'Si nadie responde en el plazo acordado, HubSpot crea la tarea y recuerda.' },
    ],
    useCases: [
      'Contactos que llegan por WhatsApp desde una campaña y hay que atribuir a esa campaña.',
      'Equipos comerciales de varias personas que necesitan ver el historial de cada cliente.',
      'Seguimientos que hoy se olvidan porque viven en el chat de una sola persona.',
      'Respuesta automática al primer mensaje fuera de horario, con registro en el CRM.',
    ],
    requirements: [
      'Un número de WhatsApp Business verificado, migrado a la API oficial de Meta (se conserva el número).',
      'Una cuenta de HubSpot con el embudo de ventas definido: etapas, propietarios y qué es un lead.',
      'Acordado por escrito qué se responde en automático y qué pasa a una persona.',
      'Consentimiento de los contactos a los que se vaya a escribir primero.',
    ],
    faq: [
      {
        q: '¿Hace falta cambiar de número de WhatsApp?',
        a: 'No. El número de WhatsApp Business se migra a la API oficial conservando el mismo número. Lo que cambia es desde dónde se responde: en vez de la aplicación del móvil, desde una bandeja compartida que sí puede hablar con HubSpot.',
      },
      {
        q: '¿Funciona con el HubSpot gratuito?',
        a: 'Para crear contactos, registrar conversaciones y crear tareas, sí. Las automatizaciones más avanzadas dentro de HubSpot (secuencias, flujos de trabajo) requieren sus planes de pago; en el diagnóstico se revisa qué plan tiene la empresa y qué parte del flujo conviene montar fuera de HubSpot.',
      },
      {
        q: '¿Los mensajes antiguos se importan?',
        a: 'Depende de cómo esté hoy el número. Si ya estaba en la API, el historial se conserva. Si está en la aplicación de WhatsApp Business, Meta permite sincronizar el historial reciente al migrar en modo de coexistencia, siempre que la empresa lo autorice desde su propio teléfono.',
      },
      {
        q: '¿Se pueden enviar mensajes desde HubSpot?',
        a: 'Sí, dentro de las reglas de WhatsApp: para iniciar una conversación hace falta una plantilla aprobada por Meta y el consentimiento del contacto. Las respuestas dentro de una conversación abierta no tienen esa limitación.',
      },
    ],
    articles: ['automatizar-whatsapp-pyme', 'cotizaciones-automaticas-crm-whatsapp'],
    keywords: ['integrar HubSpot con WhatsApp', 'WhatsApp CRM', 'registrar conversaciones de WhatsApp en HubSpot'],
  },

  /* --------------------------------------------- Stripe + Facturación electrónica */
  {
    slug: 'stripe-facturacion',
    title: 'Stripe + Facturación electrónica',
    headline: 'Cobras con Stripe y la factura sale sola',
    description:
      'Conectar Stripe con el sistema de facturación electrónica para que cada cobro genere su factura, la envíe al cliente y quede conciliado sin tocar nada.',
    tools: [{ name: 'Stripe', mark: 'stripe' }, { name: 'Facturación electrónica' }],
    intro: [
      'Cobrar con Stripe es fácil. Lo que no es fácil es lo de después: entrar al panel, ver qué ' +
        'pagos entraron, hacer la factura en el sistema de facturación, mandarla al cliente y ' +
        'cuadrar a fin de mes que todo lo cobrado está facturado. Ese trabajo se hace a mano en casi ' +
        'todas las empresas que lo tienen.',
      'Esta integración lo hace al revés: el cobro es lo que dispara la factura. Cuando Stripe ' +
        'confirma un pago, el flujo toma los datos del cliente, emite la factura electrónica en el ' +
        'sistema que ya usa la empresa y la envía. La conciliación deja de ser una tarea porque ' +
        'cada factura nace ya asociada a su pago.',
    ],
    flow: [
      { label: 'Stripe confirma el cobro', detail: 'Un pago pasa a "completado", sea por enlace, suscripción o pasarela en la web.' },
      { label: 'Se recogen los datos fiscales', detail: 'El flujo toma los datos del cliente de Stripe o los pide si faltan (identificación fiscal, dirección).' },
      { label: 'Se emite la factura', detail: 'La factura electrónica se genera en el sistema de facturación con el concepto, el importe y los impuestos correctos.' },
      { label: 'Se envía al cliente', detail: 'El cliente recibe la factura por correo, con el enlace o el PDF, sin que nadie la adjunte.' },
      { label: 'Queda conciliado', detail: 'La factura lleva la referencia del pago de Stripe. A fin de mes, cobros y facturas cuadran solos.' },
    ],
    useCases: [
      'Servicios que se cobran por enlace de pago y hoy se facturan a mano al día siguiente.',
      'Suscripciones mensuales que generan la misma factura cada mes, cliente a cliente.',
      'Tiendas o cursos en línea que cobran con Stripe y facturan en otro sistema.',
      'Empresas que hoy pierden horas a fin de mes cuadrando Stripe contra facturación.',
    ],
    requirements: [
      'Una cuenta de Stripe activa, con acceso para crear la conexión (no hace falta compartir contraseñas).',
      'Un sistema de facturación electrónica que permita conectarse o importar: la mayoría de los homologados lo permiten.',
      'Definido qué datos fiscales son obligatorios en tu país y en qué momento se piden al cliente.',
      'Un criterio claro para los reembolsos: si se anula la factura o se emite una nota de crédito.',
    ],
    faq: [
      {
        q: '¿Con qué sistema de facturación funciona?',
        a: 'Con cualquiera que permita conectarse desde fuera o importar datos. Los sistemas de facturación electrónica homologados en Colombia, México, España y otros países suelen ofrecerlo. Si el tuyo es a medida o muy antiguo, se revisa en el diagnóstico y se te dice con franqueza si se puede.',
      },
      {
        q: '¿Qué pasa si el cliente no dio sus datos fiscales al pagar?',
        a: 'El flujo se los pide. Lo habitual es un mensaje automático con un formulario corto después del pago; hasta que no los entrega, la factura queda en espera y no se emite con datos incompletos. Cada país tiene sus reglas sobre qué es obligatorio, y se configuran al montarlo.',
      },
      {
        q: '¿Y con los reembolsos?',
        a: 'Se acuerda antes de conectar nada. Lo normal es que un reembolso total genere una nota de crédito o anule la factura, según lo que exija la normativa local, y que uno parcial genere una nota por la diferencia. El flujo hace lo que se decidió, no improvisa.',
      },
    ],
    articles: ['cuanto-cuesta-automatizar-procesos', 'conectar-excel-crm-facturacion'],
    keywords: ['integrar Stripe con facturación electrónica', 'factura automática Stripe', 'conciliar Stripe'],
  },

  /* ------------------------------------------------------- Shopify + WhatsApp */
  {
    slug: 'shopify-whatsapp',
    title: 'Shopify + WhatsApp',
    headline: 'Avisos de pedido y envío por WhatsApp, directos desde Shopify',
    description:
      'Conectar Shopify con WhatsApp para confirmar pedidos, avisar del envío y recuperar carritos abandonados por el canal que el cliente sí lee.',
    tools: [
      { name: 'Shopify', mark: 'shopify' },
      { name: 'WhatsApp', mark: 'whatsapp' },
    ],
    intro: [
      'Los correos de "tu pedido ha sido enviado" se abren poco. El mismo aviso por WhatsApp se ' +
        'lee casi siempre, y el cliente puede responder en el sitio en el que ya está preguntando ' +
        '"¿dónde está mi pedido?".',
      'Esta integración conecta los eventos de Shopify (pedido creado, pagado, enviado, entregado) ' +
        'con el número de WhatsApp Business de la tienda. Cada evento envía la plantilla aprobada ' +
        'que corresponde, y si el cliente contesta, la conversación llega a quien atiende, con el ' +
        'pedido delante.',
    ],
    flow: [
      { label: 'Ocurre algo en Shopify', detail: 'Un pedido se crea, se paga, se prepara o sale a reparto.' },
      { label: 'Se elige la plantilla', detail: 'Cada evento tiene su mensaje aprobado por Meta, con los datos del pedido rellenados.' },
      { label: 'Se envía por WhatsApp', detail: 'El cliente recibe el aviso en su chat, con número de pedido y, si aplica, enlace de seguimiento.' },
      { label: 'Si contesta, alguien atiende', detail: 'La respuesta llega a la bandeja del equipo con el pedido y el historial del cliente visibles.' },
      { label: 'Todo queda registrado', detail: 'Shopify guarda qué avisos se enviaron y cuándo, por pedido.' },
    ],
    useCases: [
      'Confirmación de pedido y de pago en el momento, sin que el cliente tenga que mirar el correo.',
      'Aviso de envío con el enlace de rastreo del transportista.',
      'Recordatorio de carrito abandonado a quien dio su consentimiento para recibirlo.',
      'Consultas de "¿dónde está mi pedido?" respondidas con el dato real, sin buscar nada.',
    ],
    requirements: [
      'Una tienda en Shopify con los estados de pedido bien definidos (qué significa "preparado", "enviado").',
      'Un número de WhatsApp Business en la API oficial de Meta y las plantillas de mensaje aprobadas.',
      'Consentimiento del cliente para recibir avisos por WhatsApp, recogido en el proceso de compra.',
      'Decidido quién atiende las respuestas y en qué horario.',
    ],
    faq: [
      {
        q: '¿Puedo mandar promociones por WhatsApp a mis compradores?',
        a: 'Solo a quienes hayan aceptado recibirlas y con plantillas aprobadas por Meta. Los avisos de pedido son mensajes de servicio y tienen menos restricciones; las promociones son marketing y WhatsApp las controla mucho más. Enviar promociones a quien no las pidió es la vía rápida a que bloqueen el número.',
      },
      {
        q: '¿Funciona con los mensajes de la app de Shopify?',
        a: 'Esta integración usa la API de WhatsApp Business, no la aplicación del móvil. Es lo que permite que los mensajes salgan solos a partir de un evento de la tienda y que varias personas atiendan las respuestas. La aplicación normal no puede hacer ninguna de las dos cosas.',
      },
      {
        q: '¿Qué pasa con los pedidos que ya existían?',
        a: 'Nada retroactivo: los avisos se envían a partir de los eventos que ocurren desde que se activa la integración. Un pedido antiguo que cambie de estado después de activarla sí genera su aviso.',
      },
    ],
    articles: ['automatizar-whatsapp-pyme', 'procesos-automatizar-con-ia'],
    keywords: ['integrar Shopify con WhatsApp', 'avisos de pedido por WhatsApp', 'Shopify WhatsApp Business'],
  },

  /* --------------------------------------------------------- Excel + HubSpot */
  {
    slug: 'excel-hubspot',
    title: 'Excel + HubSpot',
    headline: 'La hoja de cálculo y el CRM con los mismos datos, siempre',
    description:
      'Sincronizar Excel o Google Sheets con HubSpot en las dos direcciones, para que nadie vuelva a copiar contactos a mano ni haya dos versiones del mismo cliente.',
    tools: [
      { name: 'Excel', mark: 'excel' },
      { name: 'HubSpot', mark: 'hubspot' },
    ],
    intro: [
      'Casi toda empresa que adopta un CRM sigue teniendo una hoja de cálculo al lado: la lista de ' +
        'un evento, el reporte que pide el gerente, el archivo que manda un proveedor. Y alguien ' +
        'pasa datos de un lado al otro, con el resultado de siempre: tres versiones del mismo ' +
        'cliente, ninguna completa.',
      'Esta integración mantiene Excel (o Google Sheets) y HubSpot sincronizados. Lo que entra ' +
        'en la hoja aparece en el CRM; lo que cambia en el CRM se refleja en la hoja. La hoja deja ' +
        'de ser una copia que envejece y pasa a ser una vista más de los mismos datos.',
    ],
    flow: [
      { label: 'Se define qué columna es qué', detail: 'Cada columna de la hoja se corresponde con una propiedad de HubSpot. Se acuerda una vez.' },
      { label: 'Entra una fila nueva', detail: 'Al añadir un contacto en la hoja, el flujo lo crea en HubSpot, o lo actualiza si ya existía.' },
      { label: 'Cambia algo en HubSpot', detail: 'Si un comercial actualiza una etapa o un dato, la hoja lo refleja.' },
      { label: 'Se evitan duplicados', detail: 'El flujo compara por correo o teléfono antes de crear nada nuevo.' },
      { label: 'Los reportes salen de la hoja', detail: 'El gerente sigue abriendo su Excel de siempre, pero con datos del día.' },
    ],
    useCases: [
      'Listas de contactos de ferias o eventos que hay que subir al CRM sin pasarlas a mano.',
      'Reportes semanales en Excel que hoy se arman copiando datos del CRM.',
      'Equipos donde parte de la gente trabaja en el CRM y parte en la hoja, y ninguna ve lo de la otra.',
      'Migración progresiva de una empresa que lleva todo en hojas y quiere empezar con un CRM.',
    ],
    requirements: [
      'Una hoja con columnas fijas y un encabezado claro. Una hoja donde cada semana cambian las columnas no se puede sincronizar.',
      'Un campo que identifique al contacto sin dudas: correo o teléfono.',
      'Acceso a HubSpot con permiso para crear y editar contactos.',
      'Decidido quién manda cuando los dos lados dicen algo distinto del mismo cliente.',
    ],
    faq: [
      {
        q: '¿Funciona con Google Sheets además de Excel?',
        a: 'Sí, y de hecho es más sencillo: Google Sheets está en la nube y se conecta directamente. Con Excel hace falta que el archivo esté en OneDrive o SharePoint, no en el disco de un ordenador, para que el flujo pueda leerlo.',
      },
      {
        q: '¿Qué pasa si dos personas cambian el mismo dato a la vez?',
        a: 'Se acuerda una regla antes de conectar: normalmente el CRM manda, porque es el sistema donde el equipo comercial trabaja. El flujo aplica esa regla siempre igual. Lo que no puede hacer es adivinar cuál de los dos tiene razón.',
      },
      {
        q: '¿Se puede sincronizar solo en una dirección?',
        a: 'Sí, y muchas veces conviene. Una hoja que solo alimenta al CRM (lista de un evento) no necesita recibir cambios de vuelta. Se decide por hoja, no por integración.',
      },
    ],
    articles: ['conectar-excel-crm-facturacion', 'que-procesos-automatizar-pyme'],
    keywords: ['sincronizar Excel con HubSpot', 'Google Sheets HubSpot', 'importar contactos a HubSpot automáticamente'],
  },

  /* --------------------------------------------------- MercadoPago + WhatsApp */
  {
    slug: 'mercadopago-whatsapp',
    title: 'MercadoPago + WhatsApp',
    headline: 'Cobrar por WhatsApp con un enlace y confirmar sin mirar el panel',
    description:
      'Conectar MercadoPago con WhatsApp para enviar el enlace de pago dentro de la conversación y confirmar al cliente en cuanto el cobro entra, sin revisar nada a mano.',
    tools: [
      { name: 'MercadoPago', mark: 'mercadopago' },
      { name: 'WhatsApp', mark: 'whatsapp' },
    ],
    intro: [
      'En buena parte de Latinoamérica la venta se cierra por WhatsApp y el cobro se hace con ' +
        'MercadoPago. El problema está en medio: alguien genera el enlace a mano, lo pega en el ' +
        'chat, y luego revisa el panel cada rato para ver si ya pagaron y avisar al cliente.',
      'Esta integración une los dos pasos. Desde la conversación se genera el enlace de pago con el ' +
        'importe correcto, y cuando MercadoPago confirma el cobro, el cliente recibe la confirmación ' +
        'por WhatsApp y el pedido pasa a preparación sin que nadie mire ningún panel.',
    ],
    flow: [
      { label: 'Se acuerda el pedido en el chat', detail: 'El cliente confirma qué quiere y el importe queda definido.' },
      { label: 'Se genera el enlace de pago', detail: 'El flujo crea la preferencia de pago en MercadoPago con el importe y la referencia del pedido.' },
      { label: 'El enlace llega por WhatsApp', detail: 'El cliente lo recibe en la misma conversación y paga desde el móvil.' },
      { label: 'MercadoPago confirma', detail: 'Cuando el pago se aprueba, la notificación llega al flujo al instante.' },
      { label: 'Se confirma y se avanza', detail: 'El cliente recibe el "pago recibido" por WhatsApp y el pedido pasa al siguiente paso.' },
    ],
    useCases: [
      'Ventas cerradas por chat que hoy se cobran mandando un enlace hecho a mano.',
      'Reservas y señas que hay que confirmar rápido para no perder el cupo.',
      'Negocios que revisan el panel de MercadoPago varias veces al día para ver quién pagó.',
      'Cobros recurrentes a clientes habituales, con el enlace enviado el día que toca.',
    ],
    requirements: [
      'Una cuenta de MercadoPago de vendedor, con acceso para crear la conexión.',
      'Un número de WhatsApp Business en la API oficial y una plantilla aprobada para el envío del enlace.',
      'Definido cómo se identifica cada pedido (número, referencia) para que el pago y el chat coincidan.',
      'Decidido qué pasa si el pago se rechaza o expira: cuántos recordatorios y con qué texto.',
    ],
    faq: [
      {
        q: '¿En qué países funciona?',
        a: 'En los que opera MercadoPago: Argentina, Brasil, Chile, Colombia, México, Perú y Uruguay, entre otros. Cada país tiene sus medios de pago disponibles (tarjeta, transferencia, efectivo en puntos de pago) y el enlace ofrece los que estén activos en la cuenta.',
      },
      {
        q: '¿El cliente necesita tener cuenta de MercadoPago?',
        a: 'No. El enlace de pago permite pagar como invitado con tarjeta en la mayoría de los países. Tener cuenta hace el pago más rápido, pero no es obligatorio.',
      },
      {
        q: '¿Qué pasa si paga dos veces por error?',
        a: 'El flujo asocia cada pago a la referencia del pedido: si llega un segundo pago de la misma referencia, lo marca como duplicado y avisa a quien atiende para gestionar la devolución desde MercadoPago. No lo devuelve solo: esa decisión se queda con una persona.',
      },
    ],
    articles: ['automatizar-whatsapp-pyme', 'cotizaciones-automaticas-crm-whatsapp'],
    keywords: ['cobrar por WhatsApp con MercadoPago', 'enlace de pago MercadoPago WhatsApp', 'confirmar pago automático'],
  },

  /* ---------------------------------------------- Google Calendar + WhatsApp */
  {
    slug: 'google-calendar-whatsapp',
    title: 'Google Calendar + WhatsApp',
    headline: 'Citas confirmadas y recordadas por WhatsApp sin que nadie llame',
    description:
      'Conectar Google Calendar con WhatsApp para que cada cita se confirme, se recuerde y se reprograme desde el chat, y las inasistencias dejen de ser una sorpresa.',
    tools: [
      { name: 'Google Calendar', mark: 'google-workspace' },
      { name: 'WhatsApp', mark: 'whatsapp' },
    ],
    intro: [
      'Toda empresa que trabaja con citas conoce la escena: el cliente reservó hace una semana, ' +
        'nadie le recordó, y el hueco se queda vacío. O peor: alguien del equipo dedica la tarde a ' +
        'llamar uno por uno para confirmar las citas de mañana.',
      'Esta integración conecta la agenda de Google Calendar con el WhatsApp de la empresa. Al ' +
        'reservar, el cliente recibe la confirmación; el día anterior, el recordatorio; y si no ' +
        'puede, responde en el chat y la cita se mueve. La agenda sigue siendo Google Calendar. Lo ' +
        'que desaparece es la tarde de llamadas.',
    ],
    flow: [
      { label: 'Se crea la cita', detail: 'La reserva entra en Google Calendar, sea desde la web, por teléfono o desde el propio WhatsApp.' },
      { label: 'Confirmación inmediata', detail: 'El cliente recibe por WhatsApp la fecha, la hora y el lugar, con la opción de cambiarla.' },
      { label: 'Recordatorio programado', detail: 'A la hora acordada (el día antes, dos horas antes) sale el recordatorio con plantilla aprobada.' },
      { label: 'Si responde, se gestiona', detail: 'Un "no puedo" abre la reprogramación: el flujo ofrece huecos libres y actualiza la agenda.' },
      { label: 'La agenda queda al día', detail: 'Confirmaciones, cambios y cancelaciones se reflejan en Google Calendar sin que nadie las anote.' },
    ],
    useCases: [
      'Consultas, clínicas y centros que confirman por teléfono las citas del día siguiente.',
      'Talleres y servicios a domicilio que necesitan avisar de la hora de llegada.',
      'Reuniones comerciales agendadas desde la web que hoy se confirman a mano.',
      'Recordatorios de renovación o revisión periódica a clientes habituales.',
    ],
    requirements: [
      'Una agenda en Google Calendar con los huecos disponibles bien definidos (horarios, duración, personas).',
      'Un número de WhatsApp Business en la API oficial y plantillas aprobadas para confirmación y recordatorio.',
      'El consentimiento del cliente para recibir avisos por WhatsApp, recogido al reservar.',
      'Decididas las reglas: con cuánta antelación se puede cancelar y qué pasa si nadie responde al recordatorio.',
    ],
    faq: [
      {
        q: '¿Puede el cliente reservar directamente por WhatsApp?',
        a: 'Sí. El flujo puede ofrecer los huecos libres en el chat y crear la cita en Google Calendar cuando el cliente elige uno. Es la versión completa; muchas empresas empiezan solo con confirmaciones y recordatorios y añaden la reserva después.',
      },
      {
        q: '¿Funciona con varias agendas o personas?',
        a: 'Sí. Cada persona o sala tiene su calendario y el flujo consulta el que corresponda. Lo que hace falta es que los calendarios estén al día: un hueco que en la agenda aparece libre y en realidad no lo está se ofrecerá al cliente.',
      },
      {
        q: '¿Se puede usar otra agenda que no sea Google Calendar?',
        a: 'Sí, con Microsoft Outlook, Calendly o herramientas de reserva del sector se monta el mismo flujo. Google Calendar es el caso más frecuente y por eso esta página habla de él, pero la lógica no cambia.',
      },
    ],
    articles: ['automatizar-agendamiento-citas', 'automatizar-whatsapp-pyme'],
    keywords: ['recordatorio de citas por WhatsApp', 'Google Calendar WhatsApp', 'reducir inasistencias citas'],
  },
];
