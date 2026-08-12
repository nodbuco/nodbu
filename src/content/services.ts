import {
  BarChart3,
  Blocks,
  ClipboardCheck,
  FileText,
  MessageSquare,
  RefreshCw,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';

/**
 * Los seis servicios de la rejilla. Cada uno dice UN resultado concreto,
 * en segunda persona y en pasado del problema ("Dejas de...", "Se acabo...").
 * Nada de sustantivos abstractos: que se entienda que cambia el lunes.
 */

export type Service = {
  icon: LucideIcon;
  title: string;
  /** Una sola frase. Resultado observable, no descripcion de la tecnologia. */
  result: string;
};

export const services: Service[] = [
  {
    icon: UserPlus,
    title: 'Captación y seguimiento de leads',
    result:
      'Cada contacto que llega por la web, WhatsApp o una campaña entra solo en tu CRM, con su origen y su recordatorio de seguimiento puesto.',
  },
  {
    icon: FileText,
    title: 'Cotizaciones y facturación',
    result:
      'Dejas de copiar precios a mano: la cotización sale con tu formato, se envía firmada y se convierte en factura sin volver a escribir los datos.',
  },
  {
    icon: ClipboardCheck,
    title: 'Onboarding de clientes',
    result:
      'Se acabó el "¿alguien mandó ya el contrato?": el alta dispara correos, carpetas, accesos y tareas en el orden correcto.',
  },
  {
    icon: BarChart3,
    title: 'Reportes automáticos',
    result:
      'El lunes a las 8 tienes en el correo las ventas, los pendientes y lo que se atascó, sin que nadie arme la hoja de cálculo.',
  },
  {
    icon: MessageSquare,
    title: 'Atención por WhatsApp',
    result:
      'Las preguntas repetidas se responden solas y las que importan llegan al comercial correcto con el historial del cliente delante.',
  },
  {
    icon: RefreshCw,
    title: 'Sincronización entre sistemas',
    result:
      'Cambias un dato en un sitio y aparece en el resto. Se terminan las tres versiones distintas del mismo cliente.',
  },
];

/**
 * Septimo servicio, aparte del grid.
 *
 * No es un servicio del mismo tipo que los seis de arriba: aquellos son
 * procesos que el cliente ya reconoce que sufre; este es la respuesta a "y si
 * lo mio no encaja en ninguno". Por eso se pinta como tarjeta de ancho completo
 * al final, y no como una septima celda igual. Razonamiento en DESIGN.md §8.2.
 */
export const customService = {
  icon: Blocks as LucideIcon,
  /** Etiqueta en mono que lo separa de los seis numerados. */
  label: '07 · A medida',
  title: 'Software a la medida',
  /** La frase de arranque, en el mismo tono que los otros seis. */
  result:
    'Cuando tu proceso no encaja en ninguna herramienta del mercado, lo construimos desde cero para tu caso. Esto es lo que más nos piden:',
  /**
   * Lo que construimos, con nombre propio y un resultado concreto cada uno.
   * Antes eran tres ejemplos abstractos; se nombran porque son tres cosas que
   * la gente busca por su nombre y no puede adivinar que tambien las hacemos.
   */
  builds: [
    {
      name: 'Chatbots de ventas',
      result:
        'Responden las preguntas de siempre a cualquier hora, preguntan lo que hay que preguntar y te pasan la conversación cuando hay intención real de comprar.',
    },
    {
      name: 'Gestión de pedidos',
      result:
        'Un solo sitio donde ves qué se pidió, qué salió y qué falta, con el estado al día sin que nadie lo escriba a mano.',
    },
    {
      name: 'Páginas web',
      result:
        'Una web que carga rápido, se lee bien en el móvil y manda cada formulario a tu CRM, no a un correo que nadie abre.',
    },
  ],
};
