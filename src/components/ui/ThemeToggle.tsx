'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DEFAULT_THEME, THEME_KEY, type Theme } from '@/lib/theme';
import { cn } from '@/lib/cn';

/**
 * Cambio de modo claro/oscuro.
 *
 * Oscuro por defecto y la eleccion se recuerda en localStorage. El atributo
 * data-theme ya lo ha puesto el script del layout antes del primer pintado,
 * asi que aqui solo hay que leer el estado real del DOM al montar.
 *
 * El icono muestra ADONDE vas, no donde estas: en oscuro se ve un sol (pulsa
 * para ir a claro) y en claro una luna. El aria-label lo dice con palabras,
 * porque un icono solo es ambiguo en este control.
 */

type ThemeToggleProps = {
  className?: string;
  /** En el menu movil el boton es mas ancho y lleva texto. */
  withLabel?: boolean;
};

export function ThemeToggle({ className, withLabel = false }: ThemeToggleProps) {
  // Se arranca en el valor por defecto para que servidor y cliente coincidan
  // en el primer render; el efecto corrige al valor real justo despues.
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const actual = document.documentElement.getAttribute('data-theme');
    setTheme(actual === 'light' ? 'light' : 'dark');
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Modo privado estricto: el tema se aplica igual, solo no se recuerda.
    }
  }

  const goingTo = theme === 'dark' ? 'claro' : 'oscuro';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Cambiar a modo ${goingTo}`}
      // Hasta que monta no se sabe el tema real: se oculta al lector de
      // pantalla para no anunciar una etiqueta que puede ser la contraria.
      aria-hidden={mounted ? undefined : true}
      className={cn(
        // inline-flex, no grid: con etiqueta hay dos hijos en fila.
        'glass inline-flex items-center justify-center text-paper-muted transition-colors duration-300 ease-soft hover:text-paper',
        // 44px de lado: el minimo comodo para tocar con el dedo.
        withLabel ? 'h-12 w-full gap-2 rounded-full px-5' : 'h-11 w-11 rounded-full',
        className,
      )}
    >
      {theme === 'dark' ? (
        <Sun size={withLabel ? 18 : 17} aria-hidden="true" />
      ) : (
        <Moon size={withLabel ? 18 : 17} aria-hidden="true" />
      )}
      {withLabel ? <span className="text-body-s">Modo {goingTo}</span> : null}
    </button>
  );
}
