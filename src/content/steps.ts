/**
 * Los cuatro pasos del proceso. El orden importa: la seccion los revela segun
 * avanza el scroll, asi que la numeracion codifica una secuencia real, no una
 * lista de opciones equivalentes.
 */

export type Step = {
  /** Numero visible, en mono. Dos digitos. */
  number: string;
  title: string;
  description: string;
  /** Duracion orientativa. Se muestra como etiqueta mono junto al titulo. */
  duration: string;
};

export const steps: Step[] = [
  {
    number: '01',
    title: 'Diagnóstico gratuito',
    description:
      'Una llamada de 15 minutos. Nos cuentas qué proceso te está comiendo el tiempo y te decimos si se puede automatizar, cuánto ahorraría y qué no conviene tocar. Sin compromiso y sin propuesta comercial en esa llamada.',
    duration: '15 minutos',
  },
  {
    number: '02',
    title: 'Diseño del flujo',
    description:
      'Te enseñamos en un dibujo qué pasa con cada dato: de dónde sale, dónde entra y qué ocurre si algo falla. Lo revisas y lo apruebas antes de que escribamos una sola línea. Aquí es donde se decide el alcance y el precio.',
    duration: '2 a 5 días',
  },
  {
    number: '03',
    title: 'Implementación',
    description:
      'Conectamos tus herramientas y lo probamos con datos reales antes de encenderlo. Tu equipo recibe una guía corta de qué cambia en su día a día. No paramos tu operación para hacer el cambio.',
    duration: '1 a 4 semanas',
  },
  {
    number: '04',
    title: 'Soporte y mejora continua',
    description:
      'Vigilamos que siga funcionando y te avisamos nosotros si algo se rompe. Cuando cambies de herramienta o de proceso, lo ajustamos. Puedes cancelar el acompañamiento cuando quieras y todo lo hecho se queda en tus cuentas.',
    duration: 'Continuo',
  },
];
