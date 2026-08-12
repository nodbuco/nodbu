import { leadForm } from '@/content/form';
import { site } from '@/content/site';

/**
 * Envio del formulario a Web3Forms desde el navegador.
 *
 * El sitio es un export estatico: no hay backend ni API route donde esconder
 * nada. Web3Forms esta pensado para eso — la clave de acceso es publica por
 * diseno y solo sirve para entregar el correo en la direccion que registraste.
 *
 * Se envia como FormData (multipart), no como JSON: es el formato nativo de
 * Web3Forms, el que documentan primero, y evita problemas de preflight CORS.
 * IMPORTANTE: al mandar FormData NO se pone la cabecera Content-Type a mano;
 * el navegador tiene que ponerla el mismo para incluir el boundary.
 *
 * La clave se saca gratis en https://web3forms.com y se guarda en
 * NEXT_PUBLIC_WEB3FORMS_KEY. Al ser NEXT_PUBLIC se incrusta EN EL BUILD:
 * si la cambias hay que volver a compilar y subir.
 */

const ENDPOINT = 'https://api.web3forms.com/submit';

export type LeadPayload = {
  name: string;
  email: string;
  company: string;
  country: string;
  process: string;
  /** Campo trampa: si viene relleno, lo ha rellenado un bot. */
  honeypot: string;
};

export class LeadError extends Error {
  /** Mensaje ya redactado para ensenar al usuario. */
  constructor(message: string) {
    super(message);
    this.name = 'LeadError';
  }
}

/**
 * Arma el FormData que espera Web3Forms.
 * Se exporta para poder comprobar en una prueba que `access_key` y `subject`
 * viajan dentro del FormData y no en un JSON.
 *
 * LOS NOMBRES DE CAMPO VAN EN ASCII, SIN TILDE. No es un capricho: se probó en
 * vivo contra la API y Web3Forms interpreta el NOMBRE de cada campo del
 * multipart como Latin-1 en vez de UTF-8 — "País" volvía como "PaÃ­s" en el
 * correo recibido. Es un fallo de su lado, no del navegador: los VALORES con
 * tilde (el nombre de una persona, el proceso que describe) SÍ llegan
 * correctos, se comprobó por separado. Por eso aquí "Pais" y "Proceso" van
 * sin acento aunque el resto del proyecto escriba en español correcto. Si
 * cambias una de estas claves, vuelve a probar contra la API de verdad antes
 * de dar por bueno que se ve bien en el correo.
 */
export function buildLeadFormData(payload: LeadPayload, accessKey: string): FormData {
  const form = new FormData();

  // Campos de control de Web3Forms
  form.append('access_key', accessKey);
  // Asunto del correo: identifica el envio de un vistazo en la bandeja.
  form.append(
    'subject',
    `Nuevo contacto desde ${site.domain}: ${payload.company || payload.name} (${payload.country})`,
  );
  form.append('from_name', `Formulario de ${site.domain}`);
  form.append('replyto', payload.email);
  // Campo trampa de Web3Forms: si llega relleno, descarta el envio.
  form.append('botcheck', payload.honeypot);

  // Datos del formulario, con las etiquetas que se veran en el correo.
  form.append('Nombre', payload.name);
  form.append('Email', payload.email);
  form.append('Empresa', payload.company);
  form.append('Pais', payload.country);
  form.append('Proceso', payload.process);

  // Prueba de consentimiento: que se acepto y en que momento exacto. El texto
  // que ve la persona junto a la casilla vive en content/form.ts; aqui se
  // manda la misma declaracion para que quede registrada en el correo.
  form.append('Consentimiento', leadForm.consentRecord);
  form.append('Fecha del envio', new Date().toISOString());

  return form;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  if (!accessKey) {
    throw new LeadError(
      `El formulario todavía no está conectado. Escríbenos a ${site.email} y lo vemos igual.`,
    );
  }

  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      // Solo Accept. El Content-Type lo pone el navegador con su boundary.
      headers: { Accept: 'application/json' },
      body: buildLeadFormData(payload, accessKey),
    });
  } catch {
    throw new LeadError(
      'No hemos podido conectar. Revisa tu conexión y vuelve a intentarlo, o escríbenos por WhatsApp.',
    );
  }

  if (!response.ok) {
    throw new LeadError(
      `El envío no llegó a su destino. Vuelve a intentarlo en un momento o escríbenos a ${site.email}.`,
    );
  }

  const result: { success?: boolean; message?: string } = await response.json().catch(() => ({}));

  if (!result.success) {
    throw new LeadError(
      `El envío no llegó a su destino. Vuelve a intentarlo en un momento o escríbenos a ${site.email}.`,
    );
  }
}
