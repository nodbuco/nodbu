/**
 * Insignia de cliente verificado.
 *
 * Circulo naranja de marca con un check en ink dentro. Deliberadamente NO
 * replica el check azul de ninguna red social: forma circular limpia, color de
 * la marca y nada de contorno festoneado.
 *
 * Lleva su propio rol y etiqueta porque comunica informacion, no decoracion.
 */

type VerifiedBadgeProps = {
  className?: string;
  /** Lado en px. */
  size?: number;
};

export function VerifiedBadge({ className, size = 20 }: VerifiedBadgeProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Cliente verificado"
    >
      <circle cx="12" cy="12" r="12" className="fill-nodbu" />
      <path
        d="M7 12.4 10.3 15.7 17 9"
        fill="none"
        className="stroke-ink"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
