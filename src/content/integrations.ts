/**
 * Herramientas del marquee de integraciones.
 *
 * `slug` tiene que coincidir con una clave del registro de
 * /src/components/logos/index.ts. Si anades una marca aqui, anade tambien su
 * componente SVG alli o no se pintara.
 *
 * Se reparten en dos filas que se mueven en direcciones opuestas.
 */

export type Integration = {
  /** Nombre de la marca, tal cual se escribe. Se usa como texto alternativo. */
  name: string;
  /** Clave en el registro de logos. */
  slug: string;
};

export const integrationsRowOne: Integration[] = [
  { name: 'Google Workspace', slug: 'google-workspace' },
  { name: 'Slack', slug: 'slack' },
  { name: 'Notion', slug: 'notion' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'Salesforce', slug: 'salesforce' },
  { name: 'Pipedrive', slug: 'pipedrive' },
  { name: 'Zapier', slug: 'zapier' },
];

export const integrationsRowTwo: Integration[] = [
  { name: 'WhatsApp', slug: 'whatsapp' },
  { name: 'Asana', slug: 'asana' },
  { name: 'Monday.com', slug: 'monday' },
  { name: 'Trello', slug: 'trello' },
  { name: 'Stripe', slug: 'stripe' },
  { name: 'MercadoPago', slug: 'mercadopago' },
  { name: 'Make', slug: 'make' },
];

export const integrationsRowThree: Integration[] = [
  { name: 'Mailchimp', slug: 'mailchimp' },
  { name: 'ActiveCampaign', slug: 'activecampaign' },
  { name: 'Shopify', slug: 'shopify' },
  { name: 'Excel', slug: 'excel' },
  { name: 'Zendesk', slug: 'zendesk' },
  { name: 'Meta', slug: 'meta' },
  { name: 'Typeform', slug: 'typeform' },
];

/** Todas juntas, por si hace falta contarlas o listarlas. */
export const integrations: Integration[] = [...integrationsRowOne, ...integrationsRowTwo, ...integrationsRowThree];
