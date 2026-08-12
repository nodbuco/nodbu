import type { ComponentType } from 'react';
import type { MarkProps } from './_shared';
import { ActiveCampaignMark } from './ActiveCampaign';
import { AsanaMark } from './Asana';
import { GoogleWorkspaceMark } from './GoogleWorkspace';
import { HubSpotMark } from './HubSpot';
import { MailchimpMark } from './Mailchimp';
import { MondayMark } from './Monday';
import { NotionMark } from './Notion';
import { PipedriveMark } from './Pipedrive';
import { SalesforceMark } from './Salesforce';
import { SlackMark } from './Slack';
import { StripeMark } from './Stripe';
import { TrelloMark } from './Trello';
import { WhatsAppMark } from './WhatsApp';
import { MercadoPagoMark } from './MercadoPago';
import { ShopifyMark } from './Shopify';
import { ExcelMark } from './Excel';
import { ZendeskMark } from './Zendesk';
import { MetaMark } from './Meta';
import { ZapierMark } from './Zapier';
import { MakeMark } from './Make';
import { TypeformMark } from './Typeform';

/**
 * Registro slug -> componente. Los slug tienen que coincidir con los de
 * /src/content/integrations.ts. Para anadir una herramienta: crea su .tsx en
 * esta carpeta, registralo aqui y anadelo al contenido.
 */
export const logoRegistry: Record<string, ComponentType<MarkProps>> = {
  'google-workspace': GoogleWorkspaceMark,
  slack: SlackMark,
  notion: NotionMark,
  hubspot: HubSpotMark,
  salesforce: SalesforceMark,
  pipedrive: PipedriveMark,
  asana: AsanaMark,
  monday: MondayMark,
  trello: TrelloMark,
  stripe: StripeMark,
  mailchimp: MailchimpMark,
  activecampaign: ActiveCampaignMark,
  whatsapp: WhatsAppMark,
  mercadopago: MercadoPagoMark,
  shopify: ShopifyMark,
  excel: ExcelMark,
  zendesk: ZendeskMark,
  meta: MetaMark,
  zapier: ZapierMark,
  make: MakeMark,
  typeform: TypeformMark,
};

export type { MarkProps };
