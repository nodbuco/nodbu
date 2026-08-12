// Testimonios reales, publicados con autorización de los clientes.
//
// Las fotografias estan en /public/testimonials, recortadas en cuadrado sobre
// el rostro y a 320x320. Si anades a alguien: pide su autorizacion por escrito
// antes de publicar nombre, cargo y foto, y deja `photo` vacio si no la tienes
// (la tarjeta cae automaticamente a las iniciales).

export type Testimonial = {
  /** Nombre y apellido. */
  name: string;
  /** Cargo real, no "CEO" por defecto. */
  role: string;
  /** Ciudad donde trabaja. */
  city: string;
  /** Debe existir en countries.ts. */
  country: string;
  /**
   * Ruta de la foto dentro de /public. Vacio = se muestran las iniciales.
   */
  photo: string;
  /** Iniciales de respaldo, por si no hay foto. Dos letras en mayuscula. */
  initials: string;
  /** La resena, tal cual la dio el cliente. */
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Sofía López',
    role: 'Consultora Senior de Sostenibilidad',
    city: 'Barcelona',
    country: 'España',
    photo: '/testimonials/sofia-lopez.jpg',
    initials: 'SL',
    quote:
      'Antes tardábamos semanas en consolidar los reportes de normativas ambientales porque cruzábamos todo a mano. Ahora el sistema extrae la información de las bases de datos y arma el documento final sin errores.',
  },
  {
    name: 'Sandra Alvarado',
    role: 'Gerente de Operaciones',
    city: 'Monterrey',
    country: 'México',
    photo: '/testimonials/sandra-alvarado.jpg',
    initials: 'SA',
    quote:
      'El control de inventarios en planta dependía de hojas de cálculo que siempre se desactualizaban. Me estructuraron un flujo donde cada movimiento se refleja al instante. La precisión en la línea de producción cambió del cielo a la tierra.',
  },
  {
    name: 'Geral Torres',
    role: 'Especialista en Logística Internacional',
    city: 'Medellín',
    country: 'Colombia',
    photo: '/testimonials/geral-torres.jpg',
    initials: 'GT',
    quote:
      'Gestionar los despachos implicaba enviar correos manuales a cada proveedor y agente de aduanas. Automatizaron el rastreo, la actualización de tarifas y las notificaciones. Lo que antes le tomaba a mi equipo todo el día.',
  },
  {
    name: 'Alex Flórez',
    role: 'Director Comercial',
    city: 'Bogotá',
    country: 'Colombia',
    photo: '/testimonials/alex-florez.jpg',
    initials: 'AF',
    quote:
      'Atender por redes sociales era un caos y perdía ventas por no dar abasto. Me implementaron un chatbot que responde y cierra ventas en automático. Ahora solo recibo pedidos para despachar.',
  },
  {
    name: 'Laura Cadena',
    role: 'Abogada Litigante',
    city: 'Valparaíso',
    country: 'Chile',
    photo: '/testimonials/laura-cadena.jpg',
    initials: 'LC',
    quote:
      'Redactar documentos base y controlar las fechas de vencimiento de los casos nos quitaba horas valiosas cada semana. Implementaron un sistema que genera los contratos estándar con los datos del cliente y nos envía alertas.',
  },
  {
    name: 'Andrés Castaño',
    role: 'Coordinador Clínico',
    city: 'Santa Marta',
    country: 'Colombia',
    photo: '/testimonials/andres-castano.jpg',
    initials: 'AC',
    quote:
      'El registro de los pacientes y la asignación de historiales era un cuello de botella terrible. Lograron que el agendamiento y la recepción de datos fluyan hacia el expediente sin intervención manual.',
  },
];
