/**
 * Registro de las marcas de terceros: slug -> archivo(s) en /public/logos.
 *
 * Los slugs tienen que coincidir con los de /src/content/integrations.ts (el
 * carrusel) y con `tools[].mark` de /src/content/integraciones.ts (las paginas
 * de par). Para anadir una herramienta: deja su SVG oficial en /public/logos,
 * registrala aqui y anadela al contenido.
 *
 * DE DONDE SALEN LOS ARCHIVOS. Son los logotipos oficiales a color, no
 * dibujos propios: svgl (MIT) y Simple Icons (CC0) para la mayoria; los tres
 * que no tienen icono suelto en ninguno de los dos (monday, Pipedrive,
 * ActiveCampaign) se recortaron de sus archivos oficiales en Wikimedia
 * Commons, sin retocar los trazos. La "G" de Google es la de su propio kit de
 * "Sign in with Google". Cada marca pertenece a su titular y se muestra solo
 * para indicar compatibilidad (asi lo dice el aviso legal y el pie del
 * carrusel).
 *
 * `light` es la variante para el TEMA CLARO, solo en las marcas que la
 * necesitan: un glifo blanco no se ve sobre crema y un amarillo tampoco.
 * `wide` marca las que son mas anchas que altas, para que BrandMark les de
 * una caja algo mas ancha y no queden raquiticas.
 */

export type BrandMarkAsset = {
  /** Nombre visible, tal cual se escribe la marca. */
  name: string;
  /** Archivo por defecto: vale para el tema oscuro (y para el claro si no hay `light`). */
  src: string;
  /** Variante para el tema claro. */
  light?: string;
  /** Mas ancha que alta. */
  wide?: boolean;
  /**
   * El logotipo oficial ES el nombre escrito (no hay simbolo suelto). Se
   * pinta mas ancho y el carrusel no repite el nombre al lado.
   */
  wordmark?: boolean;
};

const dir = '/logos';

export const brandMarks: Record<string, BrandMarkAsset> = {
  'google-workspace': { name: 'Google Workspace', src: `${dir}/google-workspace.svg` },
  slack: { name: 'Slack', src: `${dir}/slack.svg` },
  notion: { name: 'Notion', src: `${dir}/notion.svg` },
  hubspot: { name: 'HubSpot', src: `${dir}/hubspot.svg` },
  salesforce: { name: 'Salesforce', src: `${dir}/salesforce.svg`, wide: true },
  pipedrive: { name: 'Pipedrive', src: `${dir}/pipedrive.svg` },
  zapier: { name: 'Zapier', src: `${dir}/zapier.svg` },
  whatsapp: { name: 'WhatsApp', src: `${dir}/whatsapp.svg` },
  asana: { name: 'Asana', src: `${dir}/asana.svg` },
  monday: { name: 'Monday.com', src: `${dir}/monday.svg` },
  trello: { name: 'Trello', src: `${dir}/trello.svg` },
  stripe: { name: 'Stripe', src: `${dir}/stripe.svg` },
  mercadopago: { name: 'MercadoPago', src: `${dir}/mercadopago.svg`, wide: true },
  make: { name: 'Make', src: `${dir}/make.svg` },
  mailchimp: { name: 'Mailchimp', src: `${dir}/mailchimp.svg`, light: `${dir}/mailchimp.light.svg` },
  activecampaign: { name: 'ActiveCampaign', src: `${dir}/activecampaign.svg` },
  shopify: { name: 'Shopify', src: `${dir}/shopify.svg` },
  excel: { name: 'Excel', src: `${dir}/excel.svg` },
  zendesk: { name: 'Zendesk', src: `${dir}/zendesk.svg`, light: `${dir}/zendesk.light.svg` },
  meta: { name: 'Meta', src: `${dir}/meta.svg`, wide: true },
  // Typeform no publica un simbolo suelto (ni en svgl, ni en Simple Icons, ni
  // en su propia web): su logotipo oficial ES el nombre. Va como wordmark, en
  // blanco sobre oscuro y en su gris de marca sobre claro.
  typeform: { name: 'Typeform', src: `${dir}/typeform.svg`, light: `${dir}/typeform.light.svg`, wordmark: true },
};
