/**
 * Tres niveles. Sin precios cerrados: el precio sale del diagnostico, y poner
 * una cifra aqui obligaria a mantenerla al dia en un sitio estatico.
 *
 * `featured: true` marca el plan destacado (borde naranja + etiqueta).
 * Debe haber exactamente uno.
 */

export type Plan = {
  name: string;
  /** Como se presenta el precio: "Desde", "A medida", "Empresarial". */
  price: string;
  /** Para quien es. Una linea. */
  audience: string;
  /** Que se lleva. Entregables concretos, no adjetivos. */
  deliverables: string[];
  /** Texto del boton. Dice exactamente que ocurre al pulsarlo. */
  cta: string;
  featured?: boolean;
};

/**
 * Garantia de satisfaccion, debajo de las tres tarjetas.
 *
 * OJO AL REDACTARLA: no prometas nada numerico que no puedas cumplir
 * ("devolucion del 100%", "en 30 dias", "gratis para siempre"). Una garantia
 * con cifra es una obligacion contractual; esta se compromete a lo unico que
 * siempre esta en tu mano: seguir ajustando hasta que el flujo haga lo que se
 * acordo por escrito.
 *
 * "sin cargo adicional" se entiende igual en Espana y en Latinoamerica;
 * "coste" suena a Espana y "costo" a Latinoamerica.
 */
export const guarantee = {
  title: 'Garantía de satisfacción',
  text: 'Si el flujo no funciona como lo acordamos por escrito, lo ajustamos sin cargo adicional hasta que funcione. Un proyecto no se cierra hasta que hace lo que dijimos que iba a hacer.',
};

export const plans: Plan[] = [
  {
    name: 'Automatización puntual',
    price: 'Desde',
    audience: 'Un proceso concreto que ya sabes que te está costando horas.',
    deliverables: [
      'Diagnóstico y dibujo del flujo',
      'Un proceso automatizado de principio a fin',
      'Conexión de hasta 3 herramientas',
      'Guía corta para tu equipo',
      '3 meses de soporte incluidos',
    ],
    cta: 'Hablar por WhatsApp',
  },
  {
    name: 'Operación conectada',
    price: 'A medida',
    audience: 'Varias áreas que hoy no se hablan entre sí: ventas, administración y entrega.',
    deliverables: [
      'Todo lo del plan anterior',
      'De 3 a 6 procesos automatizados',
      'Herramientas sin límite de número',
      'Reportes automáticos por correo',
      'Panel con el estado de cada flujo',
      'Formación en vivo con tu equipo',
      '6 meses de soporte incluidos',
    ],
    cta: 'Hablar por WhatsApp',
    featured: true,
  },
  {
    name: 'Acompañamiento continuo',
    price: 'Empresarial',
    audience: 'Varias sedes o equipos, con procesos que cambian cada trimestre.',
    deliverables: [
      'Todo lo del plan anterior',
      'Revisión trimestral de procesos',
      'Persona de contacto asignada',
      'Tiempo de respuesta acordado por contrato',
      'Acuerdo de confidencialidad y tratamiento de datos',
      'Documentación técnica entregada',
    ],
    cta: 'Hablar por WhatsApp',
  },
];
