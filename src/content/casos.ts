import { testimonials, type Testimonial } from '@/content/testimonials';

/**
 * Casos de uso de /casos/. Cada uno es UNA reseña real contada en tres
 * tiempos: el problema, el flujo que se implantó y lo que cambió.
 *
 * REGLA QUE NO SE SALTA: todo lo que dice cada caso sale de la cita textual
 * del cliente en testimonials.ts. No se añaden cifras ("ahorró 20 horas"), ni
 * herramientas que el cliente no nombró, ni resultados que no describió. Son
 * personas reales que autorizaron publicar SU reseña, no una historia
 * inventada a su nombre. Si algún día un cliente entrega un dato medido y
 * autoriza publicarlo, va en `metric`, que existe para eso y hoy va vacío.
 *
 * La persona, el cargo, la ciudad, la foto y la cita NO se repiten aqui: se
 * buscan por nombre en testimonials.ts. Si el nombre no existe, el modulo
 * lanza al cargar y el build falla, a proposito.
 */

export type CaseFlowStep = {
  /** Que ocurre. Tres o cuatro palabras. */
  label: string;
  /** Una frase de detalle, en presente. */
  detail: string;
};

export type CaseStudy = {
  /** Nombre EXACTO de la persona en testimonials.ts. */
  name: string;
  /** Sector, para el eyebrow. Se deduce del cargo, no se inventa. */
  sector: string;
  /** Titular del caso: lo que cambio, en pocas palabras. Es el h2. */
  headline: string;
  /** El problema, en tercera persona, sin añadir nada a lo que conto el cliente. */
  problem: string;
  /** El flujo implantado. De tres a cuatro pasos. */
  flow: CaseFlowStep[];
  /** Antes y despues, en dos frases cortas. Es lo que se ve en el bloque de resultado. */
  before: string;
  after: string;
  /**
   * Dato medido y AUTORIZADO por el cliente. Opcional y hoy vacio en todos.
   * Ejemplo: { value: '~6 h', label: 'a la semana, estimacion del cliente' }.
   * Si lleva estimacion, va con "~" y se dice de quien es.
   */
  metric?: { value: string; label: string };
};

/** Copy de la pagina. El title es el unico h1. */
export const casesPage = {
  eyebrow: 'Casos de uso',
  title: 'Seis procesos que dejaron de hacerse a mano',
  lead:
    'El problema tal como lo contó cada cliente, el flujo que se implantó y lo que cambió después. ' +
    'Sin cifras inventadas: si aparece un dato, es del cliente y lo autorizó.',
  /** Etiquetas de los tres bloques de cada caso. */
  labels: {
    problem: 'El problema',
    flow: 'El flujo implementado',
    result: 'El resultado',
    before: 'Antes',
    after: 'Ahora',
  },
  /** Nota al pie de la lista. */
  note:
    'Cada caso sale de una reseña real publicada con autorización. Los pasos del flujo describen ' +
    'lo que el cliente contó; las herramientas concretas de cada proyecto se acuerdan por escrito ' +
    'en el diagnóstico.',
} as const;

const cases: CaseStudy[] = [
  {
    name: 'Sofía López',
    sector: 'Consultoría ambiental',
    headline: 'El reporte de normativas se arma solo',
    problem:
      'Consolidar los reportes de normativas ambientales llevaba semanas: la información vivía en ' +
      'varias bases de datos y se cruzaba a mano, con el riesgo de error que eso implica en un ' +
      'documento que se entrega a un cliente.',
    flow: [
      { label: 'Fuentes conectadas', detail: 'Se enlazan las bases de datos donde vive la información normativa.' },
      { label: 'Extracción automática', detail: 'El sistema saca los datos que el reporte necesita, sin copiar celdas.' },
      { label: 'Cruce y validación', detail: 'Las fuentes se contrastan entre sí antes de armar nada.' },
      { label: 'Documento final', detail: 'El reporte sale montado, listo para revisar y entregar.' },
    ],
    before: 'Semanas cruzando datos a mano',
    after: 'El documento final se arma sin errores',
  },
  {
    name: 'Sandra Alvarado',
    sector: 'Planta de producción',
    headline: 'El inventario dice lo que hay en la línea',
    problem:
      'El control de inventarios en planta dependía de hojas de cálculo que siempre se ' +
      'desactualizaban: lo que decía la hoja y lo que había en la línea de producción no coincidían.',
    flow: [
      { label: 'Cada movimiento registrado', detail: 'Entradas, salidas y consumos se capturan en el momento en que ocurren.' },
      { label: 'Inventario al instante', detail: 'El stock se actualiza solo, sin esperar a que alguien pase la hoja.' },
      { label: 'Producción con el dato real', detail: 'La línea trabaja con lo que hay hoy, no con lo que había ayer.' },
    ],
    before: 'Hojas que siempre iban atrasadas',
    after: 'Cada movimiento se refleja al instante',
  },
  {
    name: 'Geral Torres',
    sector: 'Logística internacional',
    headline: 'Los despachos se rastrean y avisan solos',
    problem:
      'Gestionar los despachos implicaba enviar correos manuales a cada proveedor y agente de ' +
      'aduanas: rastreo, actualización de tarifas y notificaciones, uno a uno, todo el día.',
    flow: [
      { label: 'Rastreo automático', detail: 'El estado de cada despacho se consulta y se registra sin escribir correos.' },
      { label: 'Tarifas al día', detail: 'Las tarifas se actualizan solas cuando cambian.' },
      { label: 'Aviso a cada parte', detail: 'Proveedores y agentes de aduanas reciben la notificación que les toca, cuando toca.' },
    ],
    before: 'Todo el día enviando correos',
    after: 'Rastreo, tarifas y avisos automáticos',
  },
  {
    name: 'Alex Flórez',
    sector: 'Ventas por redes sociales',
    headline: 'Solo llegan pedidos para despachar',
    problem:
      'Atender por redes sociales era un caos: no daba abasto y se perdían ventas por no responder ' +
      'a tiempo a quien ya quería comprar.',
    flow: [
      { label: 'Primer contacto atendido', detail: 'Un chatbot responde las preguntas de siempre a cualquier hora.' },
      { label: 'Cierre en automático', detail: 'Cuando hay intención real de compra, el flujo toma el pedido.' },
      { label: 'Pedido listo para enviar', detail: 'Al equipo solo le llega lo que hay que despachar.' },
    ],
    before: 'Ventas perdidas por no dar abasto',
    after: 'El chatbot responde y cierra; el equipo despacha',
  },
  {
    name: 'Laura Cadena',
    sector: 'Despacho jurídico',
    headline: 'Los contratos salen hechos y las fechas avisan',
    problem:
      'Redactar documentos base y controlar los vencimientos de cada caso quitaba horas valiosas ' +
      'cada semana, con el riesgo permanente de que una fecha límite se pasara.',
    flow: [
      { label: 'Datos capturados una vez', detail: 'Los datos del cliente entran una sola vez y sirven para todo lo demás.' },
      { label: 'Contrato estándar generado', detail: 'El documento base sale con los datos ya puestos.' },
      { label: 'Alertas de vencimiento', detail: 'El sistema avisa antes de cada fecha límite del caso.' },
    ],
    before: 'Horas cada semana en documentos y fechas',
    after: 'Contratos generados y alertas automáticas',
  },
  {
    name: 'Andrés Castaño',
    sector: 'Clínica',
    headline: 'Cita, datos y expediente, conectados',
    problem:
      'El registro de pacientes y la asignación de historiales era un cuello de botella: cada cita ' +
      'implicaba capturar datos a mano y buscar el expediente correcto.',
    flow: [
      { label: 'Agendamiento', detail: 'La cita se reserva y queda registrada sin intervención manual.' },
      { label: 'Recepción de datos', detail: 'Los datos del paciente entran directos al sistema.' },
      { label: 'Expediente actualizado', detail: 'Todo fluye al historial correcto sin buscarlo a mano.' },
    ],
    before: 'Un cuello de botella en recepción',
    after: 'El agendamiento y los datos fluyen al expediente',
  },
];

/** Un caso con su persona ya resuelta. */
export type CaseWithPerson = CaseStudy & { person: Testimonial };

/**
 * Resuelve cada caso contra testimonials.ts. Lanza si el nombre no existe:
 * un caso sin persona real detrás no se publica.
 */
export const caseStudies: CaseWithPerson[] = cases.map((item) => {
  const person = testimonials.find((t) => t.name === item.name);
  if (!person) {
    throw new Error(
      `casos.ts: "${item.name}" no existe en testimonials.ts. Cada caso tiene que salir de una reseña real.`,
    );
  }
  return { ...item, person };
});
