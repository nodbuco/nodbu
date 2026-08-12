import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { resourcesPage } from '@/content/recursos';
import { site } from '@/content/site';
import { getAllArticles } from '@/lib/articles';
import { articlePath } from '@/lib/seo';

/**
 * Pie de pagina. Cero naranja: a estas alturas el acento ya hizo su trabajo.
 *
 * Tres columnas de enlaces mas la de marca. La de Recursos lleva los tres
 * articulos mas recientes: es lo que convierte el pie en una via de entrada a
 * la seccion desde cualquier pagina, en vez de un enlace suelto al hub.
 *
 * La columna "Secciones" solo lista las ANCLAS de la landing; Recursos tiene
 * su propia columna, asi que se filtra para no enlazarlo dos veces.
 *
 * El ano del copyright se calcula en el momento del build. Como el sitio es
 * estatico, en enero hay que reconstruir para que cambie: esta anotado en el
 * README junto al resto de tareas de mantenimiento.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const latest = getAllArticles().slice(0, 3);
  const sections = site.nav.filter((item) => item.href.includes('#'));

  const linkStyles = 'text-body-s text-paper-muted transition-colors hover:text-paper';

  return (
    <footer className="border-t border-hairline">
      <div className="shell py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Marca */}
          <div className="lg:col-span-3">
            <Link href={site.routes.home} aria-label="NODBU, ir al inicio" className="inline-block">
              <Logo height={26} />
            </Link>
            <p className="mt-5 max-w-xs text-body-s text-paper-muted text-pretty">
              Automatizaciones e integraciones para empresas. Conectamos las herramientas que ya
              usas para que el trabajo repetitivo deje de hacerse a mano.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-body-s text-paper transition-colors hover:text-paper-muted"
            >
              {site.email}
            </a>
          </div>

          {/* Secciones de la landing */}
          <nav aria-label="Secciones de la página" className="lg:col-span-3">
            <h2 className="font-mono text-mono uppercase text-paper-faint">Secciones</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {sections.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkStyles}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={site.routes.about} className={linkStyles}>
                  Sobre NODBU
                </Link>
              </li>
            </ul>
          </nav>

          {/* Recursos */}
          <nav aria-label="Recursos" className="lg:col-span-3">
            <h2 className="font-mono text-mono uppercase text-paper-faint">
              {resourcesPage.eyebrow}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <Link href={site.routes.resources} className={linkStyles}>
                  {resourcesPage.allHeading}
                </Link>
              </li>
              {latest.map((article) => (
                <li key={article.slug}>
                  <Link href={articlePath(article.slug)} className={linkStyles}>
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Información legal" className="lg:col-span-3">
            <h2 className="font-mono text-mono uppercase text-paper-faint">Legal</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {site.legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkStyles}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Los datos del titular (nombre, NIT, domicilio) NO van aqui: solo en
            /sobre-nodbu, en las paginas legales y en el JSON-LD. Decision
            explicita: repetirlos al pie de cada pagina no aporta al visitante
            y ya estan donde un buscador los necesita. */}
        <p className="mt-14 border-t border-hairline pt-8 font-mono text-mono uppercase text-paper-faint">
          © {year} {site.name} · {site.domain}
        </p>
      </div>
    </footer>
  );
}
