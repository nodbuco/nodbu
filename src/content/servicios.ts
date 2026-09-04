import type { LucideIcon } from 'lucide-react';
import { customService, services } from '@/content/services';

/**
 * Paginas de servicio: /servicios/ y /servicios/<slug>/.
 *
 * MISMO PATRON QUE integraciones.ts: una entrada por pagina, con contenido
 * propio y suficiente (problema, como se monta, que te llevas, para quien,
 * preguntas). No es una plantilla con el nombre cambiado.
 *
 * EL TITULO, EL ICONO Y LA FRASE DE RESULTADO NO VIVEN AQUI: salen de
 * services.ts, que es lo que pinta la portada, y se enganchan por `slug`.
 * Asi lo que dice la tarjeta de la home y lo que dice su pagina no pueden
 * separarse. Si un slug de aqui no existe en services.ts, el modulo lanza y
 * el build falla, a proposito.
 *
 * Las reglas de redaccion son las de GUIA.md: h2 en forma de pregunta, nada
 * de cifras inventadas ni promesas de resultado, español neutro, segunda
 * persona.
 */

export type ServiceStep = { label: string; detail: string };
export type ServiceFaq = { q: string; a: string };

export type ServiceContent = {
  /** Tiene que existir en services.ts (servicios) o en customService.builds. */
  slug: string;
  /** El h1: un resultado, no el nombre del servicio. Maximo ~80 caracteres. */
  headline: string;
  /** Meta description. Entre 120 y 165 caracteres. */
  description: string;
  /** Dos parrafos: el problema tal como se vive, y que se monta. */
  intro: string[];
  /** Como se implanta, en orden. Cuatro pasos. */
  steps: ServiceStep[];
  /** Que se lleva el cliente. Entregables concretos, no adjetivos. */
  deliverables: string[];
  /** Para quien tiene sentido. Situaciones, no sectores. */
  forWhom: string[];
  /** De tres a cinco. Alimentan el acordeon y el FAQPage. */
  faq: ServiceFaq[];
  /** Slugs de /integraciones relacionadas. Se validan en el build. */
  integrations: string[];
  /** Slugs de /recursos relacionados. Se validan en el build. */
  articles: string[];
  keywords: string[];
};

/** Copy del hub. El title es su unico h1. */
export const servicesPage = {
  eyebrow: 'Servicios',
  title: 'Cada servicio, explicado como se monta',
  lead:
    'Qué problema resuelve, en qué orden se implanta, qué te llevas al terminar y para quién tiene ' +
    'sentido. Sin herramientas que vender: el flujo concreto que hoy hace alguien a mano.',
  groups: {
    processes: 'Procesos que montamos',
    custom: 'Software a la medida',
  },
  note:
    '¿Tu proceso no está en la lista? Es lo habitual. En el diagnóstico de 15 minutos se mira el ' +
    'proceso real y se dice si se puede automatizar y en qué orden conviene hacerlo.',
  labels: {
    problem: '¿Qué problema resuelve?',
    steps: '¿Cómo se monta?',
    deliverables: '¿Qué te llevas?',
    forWhom: '¿Para quién tiene sentido?',
    faq: 'Preguntas frecuentes',
    integrations: 'Integraciones que lo hacen posible',
    articles: 'Guías relacionadas',
    related: 'Otros servicios',
    cta: 'Ver cómo se monta',
  },
} as const;

const content: ServiceContent[] = [
  /* ------------------------------------------- Captacion y seguimiento -- */
  {
    slug: 'seguimiento-de-leads',
    headline: 'Cada contacto entra en tu CRM con su origen y su seguimiento ya puesto',
    description:
      'Captación y seguimiento de leads automatizados: cada contacto de la web, WhatsApp o una campaña entra en el CRM con su origen y su recordatorio, sin copiarlo.',
    intro: [
      'El contacto llega por el formulario de la web, por WhatsApp o por un anuncio, y alguien lo ' +
        'copia al CRM. O no lo copia, porque ese día había prisa. Tres semanas después nadie sabe ' +
        'quién era, por dónde llegó ni si alguien le respondió. El lead más caro es el que se pagó ' +
        'en publicidad y se perdió en una bandeja de entrada.',
      'Lo que se monta es el camino completo: cada canal de entrada conectado al CRM, el contacto ' +
        'creado con su origen, asignado a quien toca y con la tarea de seguimiento programada. Si ' +
        'nadie responde en el plazo acordado, el CRM avisa. El comercial sigue haciendo lo suyo; ' +
        'lo que desaparece es la copia a mano y el olvido.',
    ],
    steps: [
      { label: 'Se listan las entradas', detail: 'Web, WhatsApp, campañas, correo: por dónde llega hoy un contacto y qué datos trae cada vía.' },
      { label: 'Se define qué es un lead', detail: 'Qué datos mínimos hacen falta, quién lo atiende y en cuánto tiempo. Se escribe, no se supone.' },
      { label: 'Se conectan los canales al CRM', detail: 'Cada entrada crea o actualiza el contacto, con su origen y su campaña, sin duplicados.' },
      { label: 'Se activa el seguimiento', detail: 'Asignación automática, tarea con fecha y aviso si el plazo se pasa. Se prueba con contactos reales antes de encender.' },
    ],
    deliverables: [
      'Todos los canales de entrada conectados al CRM, con el origen registrado en cada contacto.',
      'Reglas de asignación y de seguimiento escritas y funcionando.',
      'Un panel con los contactos sin responder y cuánto llevan esperando.',
      'Guía corta para el equipo comercial: qué cambia y qué no.',
    ],
    forWhom: [
      'Empresas que invierten en anuncios y no saben cuántos de esos contactos llegaron a hablar con alguien.',
      'Equipos comerciales de dos o más personas donde el seguimiento depende de la memoria de cada uno.',
      'Negocios que reciben contactos por varios canales y los tienen en varios sitios.',
    ],
    faq: [
      {
        q: '¿Necesito tener ya un CRM?',
        a: 'Ayuda, pero no es obligatorio. Si hoy llevas los contactos en una hoja de cálculo, se puede empezar ahí y pasar a un CRM cuando el volumen lo pida. Lo que sí hace falta es un único sitio donde vivan los contactos; si hay tres, lo primero es decidir cuál manda.',
      },
      {
        q: '¿Y si el contacto llega por un canal que no tiene conexión?',
        a: 'Casi todos la tienen: formularios, WhatsApp Business, anuncios de Meta y Google, correo. Cuando uno no la tiene, se busca la vía de exportación o se revisa en el diagnóstico si compensa. Lo que no se hace es prometer una conexión que no existe.',
      },
      {
        q: '¿El comercial pierde el control de sus contactos?',
        a: 'Al revés: los ve todos, con su historial, y deja de perder los que no anotó. La asignación sigue las reglas que la empresa decide; el flujo no elige a quién le toca cada cliente por su cuenta.',
      },
    ],
    integrations: ['hubspot-whatsapp', 'excel-hubspot'],
    articles: ['automatizar-whatsapp-pyme', 'procesos-automatizar-con-ia'],
    keywords: ['automatizar seguimiento de leads', 'leads al CRM automáticamente', 'captación de leads PyME'],
  },

  /* ----------------------------------------- Cotizaciones y facturacion -- */
  {
    slug: 'cotizaciones-y-facturacion',
    headline: 'La cotización sale con tu formato y se convierte en factura sin reescribir nada',
    description:
      'Automatización de cotizaciones y facturación: la cotización se monta con los datos del CRM, se envía en minutos y se convierte en factura sin volver a copiar nada.',
    intro: [
      'Cotizar a mano es buscar los datos del cliente, abrir la plantilla, copiar los precios, ' +
        'exportar el PDF y enviarlo. Diez minutos y un error de copia cada tantas. Facturar es ' +
        'repetir la mitad de esos pasos en otro sistema. Y a fin de mes, cuadrar que todo lo ' +
        'cotizado y aceptado esté facturado.',
      'Lo que se monta es una cadena: el trato en el CRM dispara la cotización, que sale con tu ' +
        'formato y tus precios; cuando el cliente acepta, la factura electrónica se emite con los ' +
        'mismos datos y queda enlazada al cobro. Tú apruebas con un clic al principio y decides el ' +
        'precio cuando hay excepciones. El resto ocurre solo.',
    ],
    steps: [
      { label: 'Los precios se ponen en un solo sitio', detail: 'Productos, servicios y reglas de descuento en el CRM, no en la cabeza de cada comercial.' },
      { label: 'Se define la plantilla y el disparador', detail: 'Tu formato de cotización con sus huecos, y el momento del CRM que la dispara.' },
      { label: 'Se conecta cotización, envío y factura', detail: 'La cotización se monta sola y se envía por correo o WhatsApp; al aceptarse, se emite la factura electrónica.' },
      { label: 'Se prueba en espera y se suelta', detail: 'Las primeras semanas cada cotización espera un clic tuyo. Cuando dejas de corregir, se decide qué sale sola.' },
    ],
    deliverables: [
      'Cotizaciones generadas desde el CRM con tu formato, numeradas y archivadas en la carpeta del cliente.',
      'Envío automático por el canal que uses, con registro de fecha y estado en el CRM.',
      'Factura electrónica emitida desde la cotización aceptada, enlazada a su cobro.',
      'Reglas de precios y descuentos escritas, para que el flujo no invente.',
    ],
    forWhom: [
      'Empresas que cotizan varias veces al día y tardan minutos en cada una.',
      'Negocios donde cotización, factura y cobro viven en tres sistemas que no se hablan.',
      'Quien pierde tiempo a fin de mes cuadrando lo cotizado con lo facturado.',
    ],
    faq: [
      {
        q: '¿Funciona con mi sistema de facturación electrónica?',
        a: 'Con la mayoría de los homologados en Colombia, México, España y otros países, que permiten conectarse o importar. Si el tuyo es a medida o muy antiguo, se revisa en el diagnóstico y se dice con franqueza si se puede.',
      },
      {
        q: '¿Las cotizaciones salen sin que nadie las revise?',
        a: 'Al principio no: el flujo las prepara y una persona las aprueba con un clic. Cuando llevan semanas saliendo sin correcciones, se decide qué tipos (las estándar, sin descuentos) salen solas y cuáles siguen pasando por alguien.',
      },
      {
        q: '¿Qué pasa con los descuentos y las condiciones especiales?',
        a: 'Se quedan con quien vende. El flujo aplica solo las reglas escritas (por volumen, por tipo de cliente); cualquier excepción es criterio comercial y la decide una persona antes de que la cotización salga.',
      },
    ],
    integrations: ['stripe-facturacion', 'mercadopago-whatsapp'],
    articles: ['cotizaciones-automaticas-crm-whatsapp', 'cuanto-cuesta-automatizar-procesos'],
    keywords: ['automatizar cotizaciones', 'cotización a factura automática', 'facturación electrónica automática'],
  },

  /* ----------------------------------------------- Onboarding de clientes -- */
  {
    slug: 'onboarding-de-clientes',
    headline: 'El alta de un cliente dispara correos, carpetas, accesos y tareas, en orden',
    description:
      'Onboarding de clientes automatizado: al cerrar un trato se crean carpeta, accesos y tareas, salen los correos y se agenda la primera reunión, sin olvidos.',
    intro: [
      '"¿Alguien mandó ya el contrato?" "¿Le dimos acceso a la carpeta?" "¿Quién le va a llamar?" ' +
        'Cada cliente nuevo repite las mismas diez cosas, en el mismo orden, y cada vez alguna se ' +
        'olvida porque ese día había otro incendio. El cliente lo nota el primer día, que es el ' +
        'peor día para notarlo.',
      'Lo que se monta es la secuencia completa disparada por el cierre del trato: carpeta con la ' +
        'estructura estándar, accesos, correo de bienvenida con su nombre y su contacto, formulario ' +
        'para los datos que faltan, tareas a cada responsable con fecha, reunión de arranque ' +
        'agendada y recordatorios si algo se queda pendiente. La bienvenida la sigue dando una ' +
        'persona; la coordinación ocurre sola.',
    ],
    steps: [
      { label: 'Se lista lo que pasa hoy', detail: 'Con quien hace el onboarding: cada paso, quién lo hace y cuánto tarda. Esa lista es el flujo.' },
      { label: 'Se fija el disparador', detail: 'El trato marcado como ganado en el CRM. Sin disparador claro, todo vuelve a depender de que alguien se acuerde.' },
      { label: 'Se conectan carpetas, correo y tareas', detail: 'Cada paso de la lista se convierte en una acción automática con su responsable y su plazo.' },
      { label: 'Se añaden los recordatorios', detail: 'Si el cliente no rellena el formulario o alguien no cierra su tarea, el flujo avisa antes de que se note.' },
    ],
    deliverables: [
      'Flujo de alta completo, del cierre del trato a la reunión de arranque, funcionando sin intervención.',
      'Plantillas de correo escritas una vez, con el tono de la empresa y el nombre del contacto.',
      'Estructura de carpetas y accesos estándar por cliente.',
      'Panel con los onboardings en curso y qué tiene cada uno pendiente.',
    ],
    forWhom: [
      'Empresas que cierran varios clientes al mes y el alta depende de la memoria de una persona.',
      'Servicios donde el primer día del cliente implica accesos, documentos y varias personas del equipo.',
      'Equipos que han perdido un cliente por un arranque desordenado, aunque el trabajo fuera bueno.',
    ],
    faq: [
      {
        q: '¿Sirve también para la incorporación de empleados?',
        a: 'Sí, es el mismo tipo de flujo con dos diferencias: los plazos cuentan hacia atrás desde el primer día y los datos son sensibles, así que se guardan donde solo RRHH llega. Está explicado paso a paso en la guía de onboarding.',
      },
      {
        q: '¿El cliente nota que es automático?',
        a: 'Nota que todo llega a tiempo y con su nombre bien escrito. Los correos se redactan una vez y con cuidado; la reunión de arranque y las conversaciones reales siguen siendo de una persona, y eso es lo que se percibe como trato.',
      },
      {
        q: '¿Qué pasa si mi proceso de alta no está escrito?',
        a: 'Escribirlo es el primer paso, y no es un trabajo de software. Casi siempre destapa pasos que se pueden eliminar sin automatizar nada. Se hace en el diagnóstico y en el diseño del flujo, antes de conectar ninguna herramienta.',
      },
    ],
    integrations: ['hubspot-whatsapp', 'google-calendar-whatsapp'],
    articles: ['automatizar-onboarding-clientes-empleados', 'que-procesos-automatizar-pyme'],
    keywords: ['onboarding de clientes automatizado', 'alta de clientes automática', 'flujo de bienvenida'],
  },

  /* ------------------------------------------------- Reportes automaticos -- */
  {
    slug: 'reportes-automaticos',
    headline: 'El lunes a las ocho, el reporte en tu correo, sin que nadie arme la hoja',
    description:
      'Reportes automáticos para PyMEs: ventas, pendientes y lo que se atascó, sacados de tus sistemas y enviados el lunes a las ocho sin que nadie copie una celda.',
    intro: [
      'El reporte del lunes se arma el lunes: alguien abre la hoja de ventas, el CRM y la pasarela ' +
        'de pago, copia celdas, cuadra totales y lo manda a las once. Tres horas cada semana para ' +
        'saber qué pasó la semana pasada, y cuando llega ya es tarde para hacer nada con ello.',
      'Lo que se monta es la conexión entre las fuentes y el reporte: los datos se sacan solos de ' +
        'cada sistema, se cruzan con las reglas acordadas y el reporte llega hecho, a la hora que ' +
        'digas, a quien digas. Con lo que se sale de lo normal marcado. La interpretación sigue ' +
        'siendo tuya; el armado deja de existir.',
    ],
    steps: [
      { label: 'Se decide qué se mira', detail: 'Las diez cifras que de verdad usas para decidir, no las cuarenta que caben en la hoja.' },
      { label: 'Se localiza cada dato', detail: 'De qué sistema sale cada cifra y cómo se calcula. Si vive en la cabeza de alguien, primero se escribe.' },
      { label: 'Se conectan las fuentes', detail: 'CRM, facturación, pasarela, hoja: el flujo lee cada una y cruza los datos con las reglas acordadas.' },
      { label: 'Se programa y se prueba', detail: 'Día, hora y destinatarios. Dos semanas en paralelo con el reporte manual para comprobar que cuadran.' },
    ],
    deliverables: [
      'Reporte periódico (diario, semanal o mensual) enviado solo, en el formato que uses.',
      'Avisos cuando un dato se sale del rango normal, sin esperar al reporte.',
      'Un panel con los mismos datos al día, para consultarlos entre reportes.',
      'Documentación de dónde sale cada cifra y cómo se calcula.',
    ],
    forWhom: [
      'Gerentes que dedican horas cada semana a juntar datos de varios sistemas.',
      'Empresas con varias sedes o equipos que reportan cada uno a su manera.',
      'Quien se entera de un problema por el reporte del mes, cuando ya no tiene arreglo.',
    ],
    faq: [
      {
        q: '¿Puede el reporte explicar los números, no solo listarlos?',
        a: 'Sí. Se puede añadir un resumen en lenguaje llano de qué subió, qué bajó y qué se sale de lo esperado, generado a partir de los datos. Lo que no hace es interpretar el porqué: eso es conocimiento del negocio y lo pone la persona que lo lee.',
      },
      {
        q: '¿Y si los datos de origen están mal?',
        a: 'El reporte saldrá mal, igual que el manual, pero más rápido. Por eso las dos primeras semanas se compara con el reporte hecho a mano: casi siempre aparecen diferencias que revelan un dato mal registrado en origen, y se corrige ahí.',
      },
      {
        q: '¿Sirve con una hoja de cálculo como fuente?',
        a: 'Sí, siempre que tenga columnas fijas y esté en la nube (Google Sheets, OneDrive). Una hoja en el disco de un ordenador no se puede leer; una hoja donde cada semana cambian las columnas, tampoco.',
      },
    ],
    integrations: ['excel-hubspot', 'stripe-facturacion'],
    articles: ['procesos-automatizar-con-ia', 'conectar-excel-crm-facturacion'],
    keywords: ['reportes automáticos', 'reporte de ventas automático', 'dashboard PyME'],
  },

  /* --------------------------------------------------- Atencion WhatsApp -- */
  {
    slug: 'atencion-por-whatsapp',
    headline: 'Las preguntas repetidas se responden solas; las que importan llegan a una persona',
    description:
      'Atención por WhatsApp automatizada: respuestas al instante a lo repetitivo, historial compartido y las conversaciones que importan en manos de una persona.',
    intro: [
      'El número funciona, los clientes escriben, y responder se ha convertido en un trabajo a ' +
        'tiempo completo que nadie planificó. Las mismas cinco preguntas veinte veces al día, ' +
        'mensajes sin contestar porque llegaron un domingo, y ninguna forma de saber qué se le ' +
        'prometió a quién.',
      'Lo que se monta no es "un bot": es el número de siempre, migrado a la API oficial ' +
        'conservando el número, conectado a donde vive la información. Lo repetitivo y verificable ' +
        '(horarios, estado de un pedido, primer filtro) se responde solo y al instante; lo que ' +
        'decide, negocia o se queja llega a una persona con el historial delante.',
    ],
    steps: [
      { label: 'Se escribe lo que hoy se responde a mano', detail: 'Las diez preguntas más frecuentes y su respuesta acordada, no la que da cada uno.' },
      { label: 'Se migra el número a la API oficial', detail: 'Verificación ante Meta y migración conservando el número. Se atiende desde una bandeja compartida.' },
      { label: 'Se conectan los datos', detail: 'CRM, pedidos, agenda: lo que hace falta consultar para responder con el dato real.' },
      { label: 'Se activan los flujos, de uno en uno', detail: 'Primero la respuesta fuera de horario; después el filtro del contacto nuevo; luego las consultas. Cada uno medido dos semanas.' },
    ],
    deliverables: [
      'Número de WhatsApp Business en la API oficial, con bandeja compartida para todo el equipo.',
      'Flujos de respuesta automática para lo repetitivo, con derivación a una persona cuando no hay respuesta.',
      'Cada conversación registrada en el CRM con su contacto y su historial.',
      'Plantillas de mensaje aprobadas por Meta para confirmaciones y avisos.',
    ],
    forWhom: [
      'Negocios donde una sola persona responde WhatsApp desde su móvil y es el cuello de botella.',
      'Equipos donde lo que se le prometió a un cliente vive en el chat de quien le atendió.',
      'Empresas que pierden ventas por responder tarde, no por responder mal.',
    ],
    faq: [
      {
        q: '¿Hace falta cambiar de número?',
        a: 'No. El número de WhatsApp Business se migra a la API oficial conservando el mismo número y el historial de la cuenta. Lo que cambia es desde dónde se responde: una bandeja compartida en vez de la aplicación del móvil.',
      },
      {
        q: '¿Qué no se debe automatizar en WhatsApp?',
        a: 'Las quejas, las negociaciones y cualquier cosa que requiera criterio. Se automatiza lo que tiene una respuesta correcta y verificable; el resto llega a una persona, y el flujo lo dice en vez de fingir que hay alguien escribiendo.',
      },
      {
        q: '¿Se pueden enviar mensajes a mi lista de clientes?',
        a: 'Solo con plantillas aprobadas por Meta y a personas que dieron su consentimiento. Comprar listas o escribir a quien no te ha contactado es la vía rápida a que bloqueen el número, además del problema legal de protección de datos.',
      },
    ],
    integrations: ['hubspot-whatsapp', 'shopify-whatsapp', 'google-calendar-whatsapp'],
    articles: ['automatizar-whatsapp-pyme', 'automatizar-agendamiento-citas'],
    keywords: ['automatizar WhatsApp empresa', 'atención al cliente por WhatsApp', 'WhatsApp Business API PyME'],
  },

  /* ------------------------------------------- Sincronizacion de sistemas -- */
  {
    slug: 'sincronizacion-entre-sistemas',
    headline: 'Cambias un dato en un sitio y aparece en el resto',
    description:
      'Sincronización entre sistemas: CRM, facturación, inventario y hojas de cálculo con la misma información, sin copiar datos ni tres versiones del mismo cliente.',
    intro: [
      'El cliente cambia de teléfono y alguien lo actualiza en el CRM. En la facturación sigue el ' +
        'viejo. En la hoja de reparto, el anterior al viejo. Tres versiones del mismo cliente, ' +
        'ninguna completa, y cada semana alguien pierde una hora buscando cuál es la buena.',
      'Lo que se monta es la sincronización entre los sistemas que ya usas: se acuerda qué campo ' +
        'de cada uno corresponde a qué, cuál manda cuando dos dicen cosas distintas, y el flujo ' +
        'mantiene todo alineado en las direcciones que se decidan. Nadie cambia de herramienta; ' +
        'lo que cambia es que dejan de estar aisladas.',
    ],
    steps: [
      { label: 'Se dibuja el mapa', detail: 'Qué sistemas hay, qué datos comparten y en qué dirección tiene que viajar cada uno.' },
      { label: 'Se decide quién manda', detail: 'Para cada dato, qué sistema es la fuente de verdad cuando dos no coinciden. Se escribe.' },
      { label: 'Se conectan y se limpian', detail: 'Se enlazan los sistemas y se hace una pasada inicial para unificar duplicados y datos viejos.' },
      { label: 'Se vigila', detail: 'El flujo avisa cuando algo no se pudo sincronizar (un formato raro, un dato que falta) en vez de dejarlo pasar.' },
    ],
    deliverables: [
      'Sistemas conectados con la sincronización en las direcciones acordadas.',
      'Un mapa escrito de qué dato vive dónde y cuál es la fuente de verdad.',
      'Datos unificados: sin duplicados ni versiones viejas al arrancar.',
      'Avisos de lo que no se pudo sincronizar, para corregirlo en origen.',
    ],
    forWhom: [
      'Empresas con CRM, facturación e inventario en herramientas distintas que no se hablan.',
      'Equipos donde parte de la gente trabaja en una herramienta y parte en otra, y ninguna ve lo de la otra.',
      'Negocios que han crecido a base de añadir programas y ahora tienen la información repartida.',
    ],
    faq: [
      {
        q: '¿Hay que cambiar de herramientas para sincronizarlas?',
        a: 'No. Se sincroniza lo que ya usas. Solo si un sistema no permite conectarse de ninguna forma (ni conexión ni exportación) se plantea sustituirlo, y eso se dice en el diagnóstico, no a mitad del proyecto.',
      },
      {
        q: '¿Qué pasa cuando dos sistemas dicen cosas distintas del mismo dato?',
        a: 'Se aplica la regla que se decidió antes de conectar nada: normalmente manda el sistema donde el equipo trabaja ese dato. El flujo la aplica siempre igual; lo que no puede hacer es adivinar cuál tiene razón.',
      },
      {
        q: '¿Se sincroniza todo en las dos direcciones?',
        a: 'No necesariamente, y muchas veces conviene que no. Una hoja que solo alimenta al CRM no necesita recibir cambios de vuelta. Se decide por dato y por sistema, no en general.',
      },
    ],
    integrations: ['excel-hubspot', 'stripe-facturacion', 'shopify-whatsapp'],
    articles: ['conectar-excel-crm-facturacion', 'make-vs-zapier-vs-n8n'],
    keywords: ['sincronizar CRM con facturación', 'integrar sistemas PyME', 'datos duplicados entre sistemas'],
  },

  /* --------------------------------------------------- Chatbots de ventas -- */
  {
    slug: 'chatbots-de-ventas',
    headline: 'Responde, pregunta lo que hay que preguntar y pasa la venta cuando hay intención',
    description:
      'Chatbots de ventas a medida: responden lo de siempre a cualquier hora, cualifican al contacto y pasan la conversación a una persona cuando hay intención real.',
    intro: [
      'Los mensajes llegan a todas horas: precio, disponibilidad, envío, horario. Cuando alguien ' +
        'responde, el cliente ya preguntó en otro sitio. Y cuando por fin hay una venta de verdad, ' +
        'está enterrada entre cuarenta consultas que se resolvían con una línea.',
      'Lo que se monta es un chatbot construido sobre la información de tu negocio, no un menú de ' +
        'opciones: responde lo repetitivo con el dato real, hace las preguntas que un buen ' +
        'vendedor haría primero, y cuando detecta intención de compra pasa la conversación a una ' +
        'persona con todo el contexto. Si no sabe algo, lo dice y deriva. Nunca inventa.',
    ],
    steps: [
      { label: 'Se recoge lo que el chatbot tiene que saber', detail: 'Catálogo, precios, condiciones, preguntas frecuentes y sus respuestas acordadas. Escrito.' },
      { label: 'Se diseña la conversación', detail: 'Qué pregunta, en qué orden, y qué señales significan que hay intención de compra.' },
      { label: 'Se conecta a los datos y al canal', detail: 'WhatsApp, web o redes; CRM para registrar cada contacto; pedidos o agenda si hace falta consultar.' },
      { label: 'Se prueba con conversaciones reales', detail: 'Dos semanas leyendo lo que respondió y corrigiendo. Después se amplía lo que hace solo.' },
    ],
    deliverables: [
      'Chatbot desplegado en el canal que uses, con la información de tu negocio y sin respuestas inventadas.',
      'Derivación a una persona con el contexto de la conversación cuando hay intención o cuando no sabe.',
      'Cada contacto registrado en el CRM con lo que preguntó y en qué punto está.',
      'Registro de las conversaciones para revisar qué responde y mejorarlo.',
    ],
    forWhom: [
      'Negocios que venden por chat y no dan abasto para responder a tiempo.',
      'Empresas con un catálogo o unas condiciones que se preguntan siempre igual.',
      'Equipos comerciales que quieren recibir solo las conversaciones con intención real.',
    ],
    faq: [
      {
        q: '¿El chatbot cierra la venta o la pasa a una persona?',
        a: 'Depende de lo que vendas. Un pedido estándar de catálogo puede tomarlo entero, con el cobro incluido. Una venta con negociación, condiciones o criterio se pasa a una persona en cuanto hay intención. Se decide por tipo de venta, no en general.',
      },
      {
        q: '¿Usa inteligencia artificial?',
        a: 'Para entender lo que el cliente escribe y responder con naturalidad, sí. Para inventar información, no: solo responde con lo que está en la información de tu negocio, y cuando no lo sabe, lo dice y deriva. Esa instrucción es la más importante de todo el montaje.',
      },
      {
        q: '¿Los clientes notan que hablan con un sistema?',
        a: 'Lo saben, porque el chatbot lo dice. Notan que la respuesta llega al instante y con el dato correcto, y eso es una ventaja siempre que sea honesto. Un mensaje que finge ser humano se descubre a la tercera pregunta y pierde la confianza.',
      },
    ],
    integrations: ['hubspot-whatsapp', 'mercadopago-whatsapp'],
    articles: ['automatizar-whatsapp-pyme', 'procesos-automatizar-con-ia'],
    keywords: ['chatbot de ventas', 'chatbot WhatsApp para negocio', 'chatbot a medida PyME'],
  },

  /* ---------------------------------------------------- Gestion de pedidos -- */
  {
    slug: 'gestion-de-pedidos',
    headline: 'Un solo sitio donde ves qué se pidió, qué salió y qué falta',
    description:
      'Sistema de pedidos a medida: cada pedido entra una vez, avanza por sus estados sin escribirlo a mano y el equipo ve qué falta por preparar, enviar o cobrar.',
    intro: [
      'El pedido llega por WhatsApp, se apunta en una hoja, se pasa a almacén por correo, se ' +
        'factura en otro sistema y el cliente pregunta "¿ya salió?" a alguien que tiene que ' +
        'consultar tres sitios para responder. Cuando hay veinte pedidos al día, alguno se pierde ' +
        'entre medias.',
      'Lo que se construye es un sistema propio de pedidos, hecho para cómo trabaja tu negocio: ' +
        'el pedido entra una vez, desde el canal que sea, y avanza por sus estados (recibido, ' +
        'preparado, enviado, cobrado) con cada cambio registrado y comunicado a quien toca. El ' +
        'equipo ve en un panel qué hay pendiente; el cliente recibe el aviso sin preguntar.',
    ],
    steps: [
      { label: 'Se dibujan los estados', detail: 'Por qué pasa un pedido desde que entra hasta que se cobra, quién lo mueve y qué puede fallar.' },
      { label: 'Se conectan las entradas', detail: 'WhatsApp, web, tienda en línea o formulario: todo pedido acaba en el mismo sitio, con sus datos completos.' },
      { label: 'Se construye el panel y los avisos', detail: 'Lo que ve el equipo, lo que recibe el cliente en cada cambio de estado, y lo que pasa a facturación.' },
      { label: 'Se arranca en paralelo', detail: 'Dos semanas con el sistema nuevo y el método antiguo a la vez, para comprobar que no se pierde nada.' },
    ],
    deliverables: [
      'Sistema de pedidos propio, tuyo, con los estados y las reglas de tu operación.',
      'Entradas conectadas: cada pedido registrado una vez, venga por donde venga.',
      'Avisos automáticos al cliente en cada cambio de estado, por el canal que uses.',
      'Conexión con facturación y, si aplica, con inventario.',
    ],
    forWhom: [
      'Negocios que reciben pedidos por varios canales y los llevan en una hoja o en la memoria.',
      'Operaciones donde preparar, enviar y cobrar lo hacen personas distintas que no ven lo mismo.',
      'Empresas cuya herramienta de pedidos no encaja con cómo trabajan de verdad.',
    ],
    faq: [
      {
        q: '¿Por qué a medida y no una herramienta del mercado?',
        a: 'Porque cuando el proceso encaja en una herramienta existente, esa es la recomendación, y se dice en el diagnóstico. El sistema a medida es para cuando el flujo tiene pasos, estados o reglas que ninguna herramienta contempla sin retorcerla.',
      },
      {
        q: '¿El sistema es mío o dependo de NODBU?',
        a: 'Es tuyo. Una vez abonado el precio acordado, el sistema, sus datos y su documentación son del cliente, y puede mantenerlo con quien quiera. Está en las condiciones del servicio.',
      },
      {
        q: '¿Se conecta con el inventario?',
        a: 'Sí, si hay un inventario con el que conectarse. Un pedido puede reservar stock al entrar y descontarlo al salir, y avisar cuando un producto baja del mínimo. Si el inventario vive en una hoja, se empieza por ordenarla.',
      },
    ],
    integrations: ['shopify-whatsapp', 'mercadopago-whatsapp'],
    articles: ['que-procesos-automatizar-pyme', 'cuanto-cuesta-automatizar-procesos'],
    keywords: ['sistema de gestión de pedidos', 'software de pedidos a medida', 'control de pedidos PyME'],
  },

  /* -------------------------------------------------------- Paginas web -- */
  {
    slug: 'paginas-web',
    headline: 'Una web que carga rápido, se lee en el móvil y manda cada formulario a tu CRM',
    description:
      'Páginas web para PyMEs hechas para convertir: rápidas, legibles en el móvil y con cada formulario conectado al CRM, no a un correo que nadie abre.',
    intro: [
      'La web existe, pero tarda en cargar, en el móvil se lee mal y el formulario de contacto ' +
        'manda un correo a una bandeja que nadie mira. Los contactos que llegan por ahí se pierden ' +
        'antes de que alguien sepa que existieron.',
      'Lo que se construye es una web pensada desde el primer día como parte del flujo comercial: ' +
        'carga rápida, se lee en cualquier pantalla, dice claro qué haces y para quién, y cada ' +
        'formulario o botón de WhatsApp entra directo en el CRM con su origen. La web deja de ser ' +
        'un folleto y pasa a ser la primera pieza de la captación.',
    ],
    steps: [
      { label: 'Se define qué tiene que conseguir', detail: 'Contactos, cotizaciones, reservas: qué acción tiene que provocar la web y a dónde va ese contacto.' },
      { label: 'Se escribe antes de diseñar', detail: 'Los textos primero: qué haces, para quién, por qué tú. El diseño va sobre el texto, no al revés.' },
      { label: 'Se construye y se conecta', detail: 'Rápida, accesible y con los formularios y botones enlazados al CRM y a WhatsApp.' },
      { label: 'Se publica y se mide', detail: 'Se sube al alojamiento que tengas, con analítica que diga de dónde llegan los contactos.' },
    ],
    deliverables: [
      'Web publicada en tu dominio, rápida y legible en móvil, con textos escritos para tu cliente.',
      'Formularios y botones de WhatsApp conectados al CRM, con el origen de cada contacto.',
      'Medición de las acciones que importan (contacto, WhatsApp, agenda).',
      'El código y los accesos son tuyos; puedes mantenerla con quien quieras.',
    ],
    forWhom: [
      'Empresas cuya web actual no genera contactos, o los genera y se pierden.',
      'Negocios que arrancan y quieren que la web sea el primer paso del flujo, no un folleto.',
      'Quien tiene una web lenta o que no se lee en el móvil y no sabe por dónde empezar.',
    ],
    faq: [
      {
        q: '¿Con qué se construye la web?',
        a: 'Con lo que mejor encaje con el caso: una web estática rápida cuando lo que hace falta es presencia y captación, o un gestor de contenidos cuando el cliente va a publicar mucho por su cuenta. Se decide en el diagnóstico, no por defecto.',
      },
      {
        q: '¿Incluye los textos?',
        a: 'Sí, y de hecho se escriben antes de diseñar. Una web con buen diseño y textos de relleno no convierte. Los textos salen de una conversación sobre qué haces, para quién y qué te preguntan siempre.',
      },
      {
        q: '¿Puedo actualizarla yo después?',
        a: 'Sí. Se entrega con una guía corta de cómo cambiar textos e imágenes, y el código y los accesos son tuyos. Si prefieres que lo hagamos, existe el acompañamiento mensual, sin permanencia.',
      },
    ],
    integrations: ['hubspot-whatsapp', 'excel-hubspot'],
    articles: ['que-procesos-automatizar-pyme', 'cotizaciones-automaticas-crm-whatsapp'],
    keywords: ['página web para PyME', 'web que convierte', 'formulario conectado al CRM'],
  },
];

/** Una pagina de servicio con lo que la portada ya sabe de el. */
export type ServicePage = ServiceContent & {
  title: string;
  /** La frase de resultado de la tarjeta de la portada. */
  result: string;
  icon: LucideIcon;
  /** Los seis de la rejilla, o los tres de "Software a la medida". */
  kind: 'proceso' | 'a-medida';
};

/**
 * Engancha cada entrada con services.ts. Lanza si el slug no existe en la
 * portada: una pagina de servicio sin su tarjeta es un servicio que no se
 * ofrece.
 */
export const servicePages: ServicePage[] = content.map((entry) => {
  const process = services.find((service) => service.slug === entry.slug);
  if (process) {
    return { ...entry, title: process.title, result: process.result, icon: process.icon, kind: 'proceso' };
  }
  const build = customService.builds.find((item) => item.slug === entry.slug);
  if (build) {
    return { ...entry, title: build.name, result: build.result, icon: customService.icon, kind: 'a-medida' };
  }
  throw new Error(
    `servicios.ts: "${entry.slug}" no existe en services.ts. Cada pagina de servicio tiene que corresponder a una tarjeta de la portada.`,
  );
});
