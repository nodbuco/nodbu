import { integrations, type Integration } from '@/content/integraciones';

/**
 * Consulta del directorio de integraciones.
 *
 * A diferencia de los articulos, aqui no hay archivos que leer ni frontmatter
 * que validar: el contenido es un array tipado y TypeScript ya garantiza los
 * campos. Lo unico que TypeScript no puede comprobar son las reglas de
 * negocio, y esas se comprueban abajo al cargar el modulo. Como se ejecuta
 * durante el build, un fallo aqui lo tumba, que es lo que se busca.
 */

/** Rangos de la meta description que Google muestra entera. */
const DESCRIPTION_MIN = 120;
const DESCRIPTION_MAX = 165;
const HEADLINE_MAX = 80;

function validate(items: Integration[]): void {
  const errors: string[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    const at = `integraciones.ts › "${item.slug}"`;

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) {
      errors.push(`${at}: el slug tiene que ir en minusculas y guiones (es la URL)`);
    }
    if (seen.has(item.slug)) errors.push(`${at}: slug repetido`);
    seen.add(item.slug);

    const d = item.description.trim().length;
    if (d < DESCRIPTION_MIN || d > DESCRIPTION_MAX) {
      errors.push(`${at}: description tiene ${d} caracteres y tiene que estar entre ${DESCRIPTION_MIN} y ${DESCRIPTION_MAX}`);
    }
    if (item.headline.length > HEADLINE_MAX) {
      errors.push(`${at}: headline tiene ${item.headline.length} caracteres y el maximo son ${HEADLINE_MAX}`);
    }
    if (item.flow.length < 3) errors.push(`${at}: el flujo necesita al menos 3 pasos`);
    if (item.faq.length < 3 || item.faq.length > 5) {
      errors.push(`${at}: faq tiene ${item.faq.length} preguntas y tienen que ser de 3 a 5`);
    }
    if (item.intro.length === 0) errors.push(`${at}: falta la intro`);
  }

  if (errors.length > 0) {
    throw new Error(`\n\nDirectorio de integraciones invalido:\n  · ${errors.join('\n  · ')}\n`);
  }
}

validate(integrations);

/** Todas, en el orden editorial del archivo de contenido. */
export function getAllIntegrations(): Integration[] {
  return integrations;
}

export function getIntegrationBySlug(slug: string): Integration | null {
  return integrations.find((item) => item.slug === slug) ?? null;
}

/** Lo consume `generateStaticParams`. */
export function getAllIntegrationSlugs(): string[] {
  return integrations.map((item) => item.slug);
}

/**
 * Hasta `limit` integraciones relacionadas: primero las que comparten una
 * herramienta, despues el resto en orden. Asi "HubSpot + WhatsApp" enlaza
 * antes con "Shopify + WhatsApp" que con "Stripe + Facturacion".
 */
export function getRelatedIntegrations(slug: string, limit = 3): Integration[] {
  const current = getIntegrationBySlug(slug);
  if (!current) return integrations.slice(0, limit);

  const toolNames = new Set(current.tools.map((tool) => tool.name));
  const others = integrations.filter((item) => item.slug !== slug);
  const sharing = others.filter((item) => item.tools.some((tool) => toolNames.has(tool.name)));
  const rest = others.filter((item) => !sharing.includes(item));

  return [...sharing, ...rest].slice(0, limit);
}
