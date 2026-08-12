'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppGlyph';
import { WhatsAppLink } from '@/components/ui/WhatsAppLink';
import { cn } from '@/lib/cn';

/**
 * Boton flotante de WhatsApp.
 *
 * Aparece tras 400px de scroll con fade + desplazamiento. En movil se esconde
 * mientras el formulario esta en pantalla: si no, tapa el boton de "Enviar mis
 * datos", que es justo la accion que queremos que complete.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [formOnScreen, setFormOnScreen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Vigila la seccion de contacto para apartarse en pantallas pequenas.
  useEffect(() => {
    const target = document.getElementById('contacto');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFormOnScreen(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'group fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7',
            // En movil se quita de en medio cuando el formulario esta a la vista.
            formOnScreen && 'max-md:hidden',
          )}
        >
          {/* Tooltip: decorativo, el nombre accesible lo da el aria-label. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full glass px-4 py-2 text-body-s text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block"
          >
            Hablar por WhatsApp
          </span>

          {/* Disco naranja solido con la silueta de WhatsApp recortada en ink.
              El conjunto sigue sin ser verde en ningun punto. Tamano, tooltip y
              aparicion tras 400px de scroll, igual que siempre. */}
          <WhatsAppLink
            source="boton-flotante"
            aria-label="Hablar por WhatsApp"
            className="grid h-14 w-14 place-items-center rounded-full bg-nodbu text-ink shadow-glow transition-transform duration-300 ease-soft hover:scale-105"
          >
            <WhatsAppGlyph size={26} />
          </WhatsAppLink>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
