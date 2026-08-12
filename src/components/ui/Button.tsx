import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Estilos compartidos de los dos unicos tipos de boton de la pagina.
 *
 * - primary: naranja solido, texto en ink. Es el gasto grande de acento, asi
 *   que no puede haber mas de uno visible por seccion.
 * - secondary: vidrio sin blur, para la accion alternativa.
 */

type Variant = 'primary' | 'secondary';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-body-s font-medium ' +
  'transition-all duration-300 ease-soft whitespace-nowrap';

const variants: Record<Variant, string> = {
  // Texto ink sobre naranja: ~4.9:1, cumple AA.
  primary: 'bg-nodbu text-ink hover:brightness-110 active:brightness-95',
  secondary: 'glass-flat text-paper hover:border-paper/20 hover:bg-paper/[.07]',
};

export function buttonStyles(variant: Variant = 'primary', className?: string): string {
  return cn(base, variants[variant], className);
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function ButtonLink({ variant = 'primary', className, children, ...rest }: LinkProps) {
  return (
    <a className={buttonStyles(variant, className)} {...rest}>
      {children}
    </a>
  );
}

type NativeProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({ variant = 'primary', className, children, ...rest }: NativeProps) {
  return (
    <button className={buttonStyles(variant, className)} {...rest}>
      {children}
    </button>
  );
}
