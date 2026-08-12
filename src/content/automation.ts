import { BarChart3, Bot, Database, Globe, Mail, Package, type LucideIcon } from 'lucide-react';

/**
 * Los seis pasos que recorren la pantalla del portatil en "Piloto automatico".
 *
 * Cuentan UNA historia seguida, de arriba abajo: entra un cliente por la web y
 * al final hay una venta medida. Cada paso dice lo que PASA, no que tecnologia
 * lo hace, y el sujeto siempre es el negocio de quien lee ("tu equipo", "tu
 * embudo"), nunca el sistema.
 *
 * El orden importa: es una cadena, no una lista de funcionalidades. Si metes
 * un paso, va en su sitio cronologico o se rompe la lectura.
 *
 * SOBRE EL COLOR: cada paso lleva el suyo porque aqui el color es informacion
 * —distingue seis sistemas distintos—, no decoracion. Salen de los tokens
 * `node-*` (tailwind.config.ts), nunca de la paleta por defecto de Tailwind.
 * El unico naranja de marca es el del agente IA, que es el paso que vendemos.
 * Ver DESIGN.md §13.4 para por que esto no rompe el presupuesto de acento.
 */

export type AutomationNode = {
  icon: LucideIcon;
  /** Que ocurre. Frase corta, sujeto = el negocio. */
  title: string;
  /** Una sola linea de detalle concreto. */
  desc: string;
  /** Clase de texto del icono. Solo tokens `node-*` o `nodbu`. */
  color: string;
  /** Clase de fondo de la pastilla del icono, al 10%. */
  bg: string;
};

export const automationNodes: AutomationNode[] = [
  {
    icon: Globe,
    title: 'Cliente entra a tu Web',
    desc: 'Llena el formulario interactivo pidiendo presupuesto.',
    color: 'text-node-web',
    bg: 'bg-node-web/10',
  },
  {
    icon: Bot,
    title: 'Agente IA responde',
    desc: 'Clasifica al lead y envía la cotización en segundos.',
    color: 'text-nodbu',
    bg: 'bg-nodbu/10',
  },
  {
    icon: Mail,
    title: 'Notificación al equipo',
    desc: 'Tu equipo recibe un resumen listo para cerrar la venta.',
    color: 'text-node-mail',
    bg: 'bg-node-mail/10',
  },
  {
    icon: Database,
    title: 'CRM actualizado',
    desc: 'Se crea el contacto y se mueve en tu embudo de ventas.',
    color: 'text-node-crm',
    bg: 'bg-node-crm/10',
  },
  {
    icon: Package,
    title: 'Inventario reservado',
    desc: 'El software aparta stock y genera orden de despacho.',
    color: 'text-node-stock',
    bg: 'bg-node-stock/10',
  },
  {
    icon: BarChart3,
    title: 'Dashboard en tiempo real',
    desc: 'Métricas de conversión, tiempos y costos actualizadas al instante.',
    color: 'text-node-data',
    bg: 'bg-node-data/10',
  },
];
