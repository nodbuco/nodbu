import { customService, services } from '@/content/services';
import { servicePages, type ServicePage } from '@/content/servicios';

/**
 * Consulta de las paginas de servicio. Mismo papel que lib/integraciones.ts:
 * TypeScript garantiza los campos; aqui se comprueban las reglas de negocio
 * al cargar el modulo, y como se ejecuta durante el build, un fallo lo tumba.
 */

const DESCRIPTION_MIN = 120;
const DESCRIPTION_MAX = 165;
const HEADLINE_MAX = 90;

function validate(items: ServicePage[]): void {
  const errors: string[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    const at = `servicios.ts › "${item.slug}"`;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) errors.push(`${at}: el slug tiene que ir en minusculas y guiones`);
    if (seen.has(item.slug)) errors.push(`${at}: slug repetido`);
    seen.add(item.slug);

    const d = item.description.trim().length;
    if (d < DESCRIPTION_MIN || d > DESCRIPTION_MAX) {
      errors.push(`${at}: description tiene ${d} caracteres y tiene que estar entre ${DESCRIPTION_MIN} y ${DESCRIPTION_MAX}`);
    }
    if (item.headline.length > HEADLINE_MAX) errors.push(`${at}: headline tiene ${item.headline.length} caracteres y el maximo son ${HEADLINE_MAX}`);
    if (item.steps.length < 3) errors.push(`${at}: hacen falta al menos 3 pasos`);
    if (item.deliverables.length < 3) errors.push(`${at}: hacen falta al menos 3 entregables`);
    if (item.faq.length < 3 || item.faq.length > 5) errors.push(`${at}: faq tiene ${item.faq.length} preguntas y tienen que ser de 3 a 5`);
  }

  // Todo servicio de la portada tiene que tener su pagina. Al reves ya lo
  // comprueba servicios.ts al enganchar.
  const withPage = new Set(items.map((item) => item.slug));
  for (const service of services) {
    if (!withPage.has(service.slug)) errors.push(`services.ts › "${service.slug}" no tiene pagina en servicios.ts`);
  }
  for (const build of customService.builds) {
    if (!withPage.has(build.slug)) errors.push(`services.ts › "${build.slug}" no tiene pagina en servicios.ts`);
  }

  if (errors.length > 0) {
    throw new Error(`\n\nPaginas de servicio invalidas:\n  · ${errors.join('\n  · ')}\n`);
  }
}

validate(servicePages);

/** Todas, en el orden de la portada: primero los seis procesos, luego los tres a medida. */
export function getAllServices(): ServicePage[] {
  return servicePages;
}

export function getServiceBySlug(slug: string): ServicePage | null {
  return servicePages.find((item) => item.slug === slug) ?? null;
}

/** Lo consume `generateStaticParams`. */
export function getAllServiceSlugs(): string[] {
  return servicePages.map((item) => item.slug);
}

/** Hasta `limit` servicios relacionados: primero los del mismo tipo, luego el resto. */
export function getRelatedServices(slug: string, limit = 3): ServicePage[] {
  const current = getServiceBySlug(slug);
  if (!current) return servicePages.slice(0, limit);
  const others = servicePages.filter((item) => item.slug !== slug);
  const sameKind = others.filter((item) => item.kind === current.kind);
  const rest = others.filter((item) => item.kind !== current.kind);
  return [...sameKind, ...rest].slice(0, limit);
}
