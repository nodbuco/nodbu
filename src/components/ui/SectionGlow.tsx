import { cn } from '@/lib/cn';

/**
 * Resplandor naranja de fondo, ANCLADO a un elemento concreto.
 *
 * Antes los tres halos vivian en <Background />, que es position: fixed: se
 * quedaban clavados al viewport mientras el contenido pasaba por delante, asi
 * que no acompanaban a nada. Ahora cada uno vive dentro de su seccion y se
 * mueve con ella, de modo que siempre ilumina el elemento que tiene encima.
 *
 * Reglas (ver DESIGN.md §4):
 *  - Como maximo UN resplandor por seccion y tres en toda la pagina.
 *  - Cada uno tiene que anclar algo: el logotipo del hero, el plan destacado y
 *    el formulario final. Ninguno flota porque si.
 *  - Opacidad baja siempre (8-14%): es luz ambiente, no un elemento.
 *  - Lleva la mascara horizontal para que no se corte contra el borde de la
 *    pantalla cuando es mas ancho que ella.
 *
 * La seccion que lo contenga necesita `relative` y `overflow-hidden`.
 */

type SectionGlowProps = {
  /** Posicion y tamano. Se pasa por clases para que cada seccion decida. */
  className?: string;
  /** strong = 14% (hero y CTA final), soft = 8% (resto). */
  intensity?: 'strong' | 'soft';
};

export function SectionGlow({ className, intensity = 'soft' }: SectionGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute edge-mask',
        intensity === 'strong' ? 'bg-glow-strong' : 'bg-glow-soft',
        className,
      )}
    />
  );
}
