'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { buttonStyles } from '@/components/ui/Button';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';

/**
 * Barra de vidrio flotante. Se compacta al bajar (menos alto, mas opaca) y en
 * movil abre un menu a pantalla completa con entrada escalonada de los enlaces.
 *
 * Es uno de los tres unicos sitios con backdrop-filter real de la pagina.
 *
 * NAVEGACION DE SITIO, NO DE UNA PAGINA. Los destinos salen enteros de
 * `site.nav`: este componente no compone ninguna ruta. Las anclas vienen ya en
 * forma absoluta (`/#servicios`), que es lo que hace que funcionen desde un
 * articulo y no solo desde la portada.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  /**
   * Un enlace esta activo si es una seccion del sitio (no un ancla) y la ruta
   * actual cuelga de el. Asi /recursos/un-articulo/ tambien marca "Recursos".
   *
   * Las anclas nunca se marcan: `/#planes` no es un sitio donde se "este".
   */
  const isActive = (href: string) => !href.includes('#') && pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Con el menu abierto la pagina de detras no debe desplazarse.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Escape cierra el menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-gutter pt-3 sm:pt-4">
        <nav
          aria-label="Navegación principal"
          className={cn(
            'glass mx-auto flex max-w-shell items-center justify-between rounded-full transition-all duration-300 ease-soft',
            scrolled ? 'px-4 py-2 sm:px-5 sm:py-2.5' : 'px-5 py-3 sm:px-6 sm:py-4',
          )}
        >
          <Link href={site.routes.home} aria-label="NODBU, ir al inicio" className="shrink-0">
            <Logo height={scrolled ? 22 : 26} className="transition-all duration-300 ease-soft" />
          </Link>

          {/* Enlaces: solo en escritorio */}
          <ul className="hidden items-center gap-7 lg:flex">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'text-body-s transition-colors hover:text-paper',
                      active ? 'text-paper' : 'text-paper-muted',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <WhatsAppLink
              source="navbar"
              className={cn(buttonStyles('primary'), 'hidden px-5 py-2.5 sm:inline-flex')}
            >
              Hablar por WhatsApp
            </WhatsAppLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="grid h-10 w-10 place-items-center rounded-full text-paper transition-colors hover:bg-paper/10 lg:hidden"
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menu a pantalla completa (movil y tablet) */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-movil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-ink/95 px-gutter pb-10 pt-28 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 0.06 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'block border-b border-hairline py-5 font-display text-display-m',
                      isActive(item.href) ? 'text-nodbu' : 'text-paper',
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3">
              <WhatsAppLink source="menu-movil" className={buttonStyles('primary', 'w-full')}>
                Hablar por WhatsApp
              </WhatsAppLink>
              <Link
                href={site.routes.contact}
                onClick={() => setOpen(false)}
                className={buttonStyles('secondary', 'w-full')}
              >
                Dejar mis datos
              </Link>
              <ThemeToggle withLabel />
              <a href={`mailto:${site.email}`} className="mt-4 text-center text-body-s text-paper-muted">
                {site.email}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
