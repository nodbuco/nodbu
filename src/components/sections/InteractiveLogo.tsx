'use client';

import { motion, useReducedMotion, useSpring, useTransform, useMotionValue, useScroll, type MotionValue } from 'framer-motion';
import { useRef, type MouseEvent } from 'react';
import { ShoppingCart, Mail, MessageCircle, Database } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Componente que renderiza un ícono de plataforma flotando a través del arco.
 * Utiliza `scrollY` para determinar su posición y estado en la animación.
 */
function PlatformIcon({
  Icon,
  scrollY,
  scrollStart,
  scrollEnd
}: {
  Icon: any;
  scrollY: MotionValue<number>;
  scrollStart: number;
  scrollEnd: number;
}) {
  // Progreso de 0 a 1 en base a la ventana de scroll asignada a este ícono
  const progress = useTransform(scrollY, [scrollStart, scrollEnd], [0, 1]);
  
  // El arco blanco va desde -16 grados hasta -74 (286), dejando un hueco de 58 grados.
  // Animamos desde -16 hasta 315 (-45) para recorrer todo el arco y llegar al punto naranja.
  const angle = useTransform(progress, [0, 1], [-16, 315]);
  
  // Geometría del logotipo: R = 135.68, Centro = (256, 256)
  const x = useTransform(angle, a => 256 + 135.68 * Math.cos(a * Math.PI / 180));
  const y = useTransform(angle, a => 256 + 135.68 * Math.sin(a * Math.PI / 180));
  
  // Opacidad: aparece al entrar al arco, desaparece justo al ser absorbido por el punto naranja
  const opacity = useTransform(progress, [0, 0.1, 0.85, 0.98], [0, 1, 1, 0]);
  // Escala: efecto "pop" al entrar y encogimiento al salir
  const scale = useTransform(progress, [0, 0.1, 0.85, 1], [0.5, 1, 1, 0.2]);

  return (
    <motion.g style={{ x, y, opacity, scale }}>
      {/* Fondo del ícono del mismo color que el arco (paper) para que parezca una burbuja interna */}
      <circle 
        cx="0" cy="0" r="20" 
        className="fill-paper" 
      />
      {/* Ícono centrado, color oscuro (ink) para contrastar sobre el paper */}
      <svg x="-10" y="-10" width="20" height="20" className="text-ink overflow-visible">
        <Icon width="20" height="20" strokeWidth={2.5} />
      </svg>
    </motion.g>
  );
}

/**
 * Elemento firma del hero: el isotipo de NODBU, animado y sensible al ratón y al scroll.
 */
export function InteractiveLogo({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  
  // Scroll para la automatización inmersiva
  const { scrollY } = useScroll();

  // Posicion del raton, normalizada de -0.5 a 0.5 sobre la caja.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Muelles: el giro persigue al raton en vez de pegarse a el.
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Del raton al giro 3D de la tarjeta: de -15 a 15 grados.
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Coordenadas normalizadas de -0.5 a 0.5 respecto al centro.
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (reduced) return;
    x.set(0);
    y.set(0);
  };

  // Animaciones de entrada: el arco se dibuja y luego aparece el punto.
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.8, ease: [0.2, 1, 0.3, 1], delay: 0.2 } 
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 200, damping: 15, delay: 1.2 } 
    }
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("relative w-full h-full min-h-[300px] flex items-center justify-center [perspective:1000px]", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sombreado naranja suave del fondo que reacciona al scroll (usamos radial-gradient para evitar cortes de blur) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="w-[120%] h-[120%] rounded-full opacity-60" 
          style={{
            background: 'radial-gradient(circle, rgba(var(--c-nodbu-glow, 239, 106, 55), 0.3) 0%, transparent 60%)',
            scale: reduced ? 1 : useTransform(scrollY, [0, 600], [1, 1.2]),
            opacity: reduced ? 0.6 : useTransform(scrollY, [0, 600], [0.8, 0.2])
          }}
        />
      </div>

      <motion.div
        style={{
          rotateX: reduced ? '0deg' : rotateX,
          rotateY: reduced ? '0deg' : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 w-full max-w-[400px] aspect-square flex items-center justify-center"
      >
        {/* Logotipo */}
        <svg 
          viewBox="0 0 512 512" 
          className="w-full h-full text-paper"
        >
          {/* Arco: apertura de 58 grados centrada en -45 */}
          <motion.path 
            d="M 386.424 218.602 A 135.68 135.68 0 1 1 293.398 125.576" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="55.296" 
            strokeLinecap="round"
            variants={reduced ? undefined : pathVariants}
            initial={reduced ? undefined : "hidden"}
            animate={reduced ? undefined : "visible"}
          />
          
          {/* Íconos fluyendo guiados por el scroll */}
          {!reduced && (
            <>
              <PlatformIcon Icon={ShoppingCart} scrollY={scrollY} scrollStart={0} scrollEnd={400} />
              <PlatformIcon Icon={Mail} scrollY={scrollY} scrollStart={100} scrollEnd={500} />
              <PlatformIcon Icon={MessageCircle} scrollY={scrollY} scrollStart={200} scrollEnd={600} />
              <PlatformIcon Icon={Database} scrollY={scrollY} scrollStart={300} scrollEnd={700} />
            </>
          )}
          
          {/* Punto naranja, a -45 grados y a distancia R */}
          <motion.circle 
            cx="351.94" 
            cy="160.06" 
            r="33.28" 
            className="fill-nodbu" 
            variants={reduced ? undefined : dotVariants}
            initial={reduced ? undefined : "hidden"}
            animate={reduced ? undefined : "visible"}
          />
        </svg>
      </motion.div>
    </div>
  );
}
