'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { InteractiveLogo } from './InteractiveLogo';
import { buttonStyles } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { ScheduleLink } from '@/components/ui/ScheduleLink';
import { SectionGlow } from '@/components/ui/SectionGlow';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';

/**
 * Hero asimetrico 7/5. El titular es el LCP: entra a los 0ms y ninguna
 * animacion puede retrasarlo. El logotipo interactivo arranca despues, a
 * 150ms, y es decorativo respecto al texto.
 */

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  // Con movimiento reducido nada se desplaza: se pinta ya colocado.
  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, ease, delay },
        };

  // El pt no es decorativo: tiene que despejar la navbar flotante (~76px) y
  // dejar aire. Se baja de 128/160/176 a 112/128/144.
  // min-h-svh: el hero ocupa la pantalla al cargar, para que la seccion
  // siguiente no asome por abajo. Es min-height, NO height: en pantallas bajas
  // la seccion crece con el contenido en vez de recortarlo o generar scroll
  // interno. Se usa svh (el viewport que hay con la barra del navegador
  // visible) porque asi se mide justo al cargar, que es el momento que importa.
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen min-h-svh items-center overflow-hidden pb-section pt-28 sm:pt-32 lg:pt-36"
    >
      {/* Resplandor 1 de 3. Ancla el logotipo interactivo, que es el elemento
          firma. En movil el logotipo esta oculto, asi que se centra sobre el
          titular, que es lo que manda en esa pantalla. */}
      <SectionGlow
        intensity="strong"
        className="top-0 left-1/2 h-[78vh] w-[130vw] -translate-x-1/2 md:left-[68%] md:w-[62vw]"
      />

      <div className="shell relative grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* ---- texto: 7 columnas ---- */}
        <div className="lg:col-span-7">
          <motion.p {...enter(0)} className="eyebrow">
            Automatización para PyMEs
          </motion.p>

          {/* Unico h1 de la pagina. Sin animacion de entrada diferida.
              El texto es fijo (lo da el cliente) y mide 44 caracteres, asi que
              usa `display-hero`, una escala algo mas corta que `display-xl`:
              con la de antes se iba a cuatro lineas y dejaba huerfanas. Se
              rompe a mano para que las lineas caigan por sentido y no donde
              toque el ancho: "Escala tu operación / automatizando procesos". */}
          <h1 className="mt-6 text-display-hero">
            <span className="block">Automatización a medida</span>
            <span className="block text-paper-muted">para tu negocio</span>
          </h1>

          <motion.p {...enter(0.12)} className="mt-7 max-w-xl text-body-l text-paper-muted text-pretty">
            Diseñamos automatizaciones personalizadas para tu empresa o negocio de principio a fin. Desde webs y agentes IA que venden 24/7, hasta tu propio software de inventario. Eliminamos el trabajo manual con tecnología a un precio justo
          </motion.p>

          <motion.div {...enter(0.2)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* w-full en movil: apilados, los dos botones deben medir igual. */}
            <Magnetic className="w-full sm:w-auto">
              <WhatsAppLink source="hero" className={buttonStyles('primary', 'w-full sm:w-auto')}>
                <MessageCircle size={18} aria-hidden="true" />
                Hablar por WhatsApp
              </WhatsAppLink>
            </Magnetic>

            {/* CTA secundario: la agenda. Sustituye al antiguo "Dejar mis
                datos" para no poner tres botones en el hero; el formulario
                sigue a un scroll y tiene su propio CTA justo encima. */}
            <ScheduleLink source="hero" className={buttonStyles('secondary', 'w-full sm:w-auto')} />
          </motion.div>

          <motion.p {...enter(0.28)} className="mt-6 text-body-s text-paper-faint">
            Diagnóstico gratuito de 15 minutos, sin compromiso. Respondemos el mismo día.
          </motion.p>
        </div>

        {/* ---- logotipo: 5 columnas, oculto en movil (DESIGN.md §5, §13) ---- */}
        <motion.div
          {...(reduced
            ? {}
            : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8, delay: 0.15 } })}
          // Sangrado de 2vw: el logotipo respira hacia el borde sin que el arco
          // llegue a tocarlo. No subir mas, o el punto naranja queda cortado.
          className="hidden text-paper md:block lg:col-span-5 lg:-mr-[2vw]"
        >
          <InteractiveLogo className="max-h-[440px]" />
        </motion.div>
      </div>
    </section>
  );
}
