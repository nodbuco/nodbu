/**
 * Seis preguntas del acordeon. Cubren las objeciones reales antes de que el
 * visitante escriba: plazo, precio, herramientas, seguridad, esfuerzo suyo y
 * que pasa despues. Respuestas directas; si la respuesta es "depende", se dice
 * de que depende.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: '¿Cuánto tarda en estar funcionando?',
    answer:
      'Un proceso concreto —por ejemplo, que los formularios de la web entren en tu CRM— suele estar listo en una o dos semanas. Algo que toca varias áreas, como pedidos y facturación juntos, va de tres a seis semanas. En la llamada gratuita de 15 minutos te damos el plazo antes de que decidas nada.',
  },
  {
    question: '¿Cuánto cuesta?',
    answer:
      'Depende de cuántos sistemas hay que conectar y de si tus herramientas permiten conexión directa. Trabajamos con precio cerrado por proyecto: lo sabes antes de empezar y no cambia salvo que tú amplíes el alcance. Después del diagnóstico te pasamos la cifra por escrito, sin cuotas ocultas.',
  },
  {
    question: 'No uso ninguna de las herramientas que aparecen. ¿Sirve igual?',
    answer:
      'Sí. Esas son las más habituales, pero conectamos casi cualquier programa que tenga conexión con otros o permita exportar datos. Si tu sistema es antiguo o hecho a medida, lo revisamos en el diagnóstico y te decimos con franqueza si se puede o si no compensa.',
  },
  {
    question: '¿Qué pasa con la seguridad de mis datos?',
    answer:
      'Todo se monta dentro de tus propias cuentas: las conexiones y los datos son tuyos y quedan a tu nombre. Usamos accesos con los permisos mínimos necesarios y firmamos acuerdo de confidencialidad si lo necesitas. Cumplimos el RGPD para los datos de residentes en España. Si terminamos la relación, te quedas con todo funcionando y nosotros perdemos el acceso.',
  },
  {
    question: '¿Qué necesitan de mí y de mi equipo?',
    answer:
      'Una llamada de 15 minutos al principio, una revisión del flujo dibujado —normalmente una hora— y los accesos a las herramientas. Después, unas dos horas repartidas durante la implementación para resolver dudas y validar las pruebas. No necesitas a nadie técnico en tu equipo.',
  },
  {
    question: '¿Y si algo deja de funcionar después?',
    answer:
      'Los tres primeros meses de soporte van incluidos. Vigilamos que los flujos sigan corriendo y te avisamos nosotros si algo falla, normalmente antes de que lo notes. Pasado ese plazo puedes seguir con acompañamiento mensual o quedarte solo con lo entregado: sigue siendo tuyo y funcionando.',
  },
];
