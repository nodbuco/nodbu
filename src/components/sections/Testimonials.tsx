import type { CSSProperties } from 'react';
import { Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VerifiedBadge } from '@/components/ui/VerifiedBadge';
import { testimonials } from '@/content/testimonials';

/**
 * Seis resenas reales, publicadas con autorizacion.
 *
 * La foto va recortada en circulo (las imagenes ya llegan cuadradas a 320px,
 * asi que object-cover no deforma a nadie). Si algun testimonio no trae foto,
 * la tarjeta cae sola a las iniciales sobre naranja tenue.
 *
 * La insignia de verificado va arriba a la DERECHA de la tarjeta, enfrente de
 * las estrellas y lejos de la foto, que esta abajo: asi no se solapan ni en la
 * pantalla mas estrecha. Ver DESIGN.md §8.5.
 *
 * Gasto de naranja de la seccion: estrellas + insignia. Dos.
 */
export function Testimonials() {
  return (
    <section aria-labelledby="resenas-titulo" className="py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Reseñas"
          title={<span id="resenas-titulo">Menos trabajo manual, más tiempo para crecer.</span>}
          lead="Quienes ya transformaron su operación."
        />

      </div>

      {/* A sangre completa: el marquee no se corta con el contenedor shell. */}
      <div className="mt-14 marquee-row marquee-mask overflow-hidden">
        <ul
          className="marquee-track flex w-max items-stretch gap-4 md:gap-6 animate-marquee-left"
          style={{ '--marquee-duration': '90s' } as CSSProperties}
        >
          {[...testimonials, ...testimonials].map((item, i) => (
            <li
              key={`${item.name}-${i}`}
              aria-hidden={i >= testimonials.length ? true : undefined}
              className="w-[260px] md:w-[360px] shrink-0"
            >
              <figure className="flex h-full flex-col glass-flat p-5 md:p-7">
                <div className="flex items-start justify-between gap-4">
                  {/* Cinco estrellas. El significado lo da el texto alternativo. */}
                  <div className="flex gap-1" role="img" aria-label="5 de 5 estrellas">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} aria-hidden="true" className="fill-nodbu text-nodbu" />
                    ))}
                  </div>
                  <VerifiedBadge size={18} className="shrink-0" />
                </div>

                <blockquote className="mt-5 flex-1 text-body-s text-paper-muted text-pretty">
                  {item.quote}
                </blockquote>

                {/* items-start, no center: hay cargos que ocupan dos lineas en
                    movil y con center la foto queda descolgada del nombre. */}
                <figcaption className="mt-7 flex items-start gap-3 border-t border-hairline pt-5">
                  {item.photo ? (
                    <img
                      src={item.photo}
                      alt={`Foto de ${item.name}`}
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      className="h-11 w-11 shrink-0 rounded-full border border-hairline object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-nodbu/15 font-mono text-mono-l text-nodbu"
                    >
                      {item.initials}
                    </span>
                  )}

                  <span className="min-w-0">
                    <span className="block truncate text-body-s font-medium text-paper">{item.name}</span>
                    <span className="block text-body-s text-paper-faint text-pretty">{item.role}</span>
                    <span className="mt-1 block font-mono text-mono uppercase text-paper-faint">
                      {item.city}, {item.country}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
