import type { Config } from 'tailwindcss';

/**
 * UNICO sitio del proyecto donde puede aparecer un color hexadecimal.
 * Si necesitas un color en un componente, usa una clase de Tailwind
 * (bg-ink, text-nodbu, border-hairline...) o una variable CSS de globals.css.
 */
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      /**
       * VALORES LITERALES DE LOS DOS TEMAS.
       *
       * Este es el unico sitio del proyecto con colores escritos a mano.
       * globals.css los lee con theme() y los vuelca en variables CSS, y las
       * clases de Tailwind (bg-ink, text-nodbu...) leen esas variables. Asi
       * cambiar de tema es cambiar un atributo en <html>, sin duplicar clases.
       *
       * Los tokens que se usan con modificador de opacidad (bg-nodbu/15,
       * bg-paper/[.03], bg-ink/95...) van como CANALES sueltos "R G B",
       * que es lo que necesita rgb(... / <alpha-value>).
       * Los que siempre se usan enteros van como color completo.
       *
       * La justificacion de cada valor claro esta en DESIGN.md §9.
       */
      themeTokens: {
        dark: {
          ink: '9 9 9',
          'ink-raised': '16 16 16',
          paper: '255 255 255',
          nodbu: '255 92 0',
          'paper-muted': 'rgba(255,255,255,.62)',
          'paper-faint': 'rgba(255,255,255,.48)',
          hairline: 'rgba(255,255,255,.10)',
          dot: 'rgba(255,255,255,.07)', // Reducido nuevamente (casi en el límite de lo invisible)
          'nodbu-glow': 'rgba(255,92,0,.28)',
          'glass-bg': 'linear-gradient(180deg, rgba(255,255,255,.15), rgba(255,255,255,.05))', // Punto medio de opacidad
          'glass-border': 'rgba(255,255,255,.10)',
          'glass-shadow': 'inset 0 1px 0 0 rgba(255,255,255,.07), 0 24px 60px -30px rgba(0,0,0,.9)',
          'glow-strong':
            'radial-gradient(ellipse closest-side at center, rgba(255,92,0,.14) 0%, rgba(255,92,0,.05) 55%, rgba(255,92,0,0) 100%)',
          'glow-soft':
            'radial-gradient(ellipse closest-side at center, rgba(255,92,0,.08) 0%, rgba(255,92,0,.03) 55%, rgba(255,92,0,0) 100%)',

          /* Chasis del portatil de la seccion "Piloto automatico". Ver el
             bloque `device`/`node` mas abajo para por que existen. */
          'device-edge': '82 82 91',
          'device-bezel': '0 0 0',
          'device-lens': '27 27 27',
          'device-glass': '255 255 255',
          'device-led': '16 185 129',
          'device-base-top': '82 82 91',
          'device-base-bottom': '39 39 42',
          'device-lip': '24 24 27',
          'device-shadow': 'rgba(0,0,0,.5)',

          /* Interfaz DENTRO de la pantalla del portatil. */
          'node-web': '96 165 250',
          'node-mail': '52 211 153',
          'node-crm': '167 139 250',
          'node-stock': '251 191 36',
          'node-data': '34 211 238',
        },
        light: {
          ink: '232 229 227', // #e8e5e3
          'ink-raised': '255 255 255',
          paper: '13 13 13',
          nodbu: '201 67 0', // #C94300 — el de marca da 2.94:1 aqui y suspende
          'paper-muted': 'rgba(13,13,13,.68)',
          'paper-faint': 'rgba(13,13,13,.58)',
          hairline: 'rgba(13,13,13,.12)',
          dot: 'rgba(13,13,13,.07)', // Reducido nuevamente
          'nodbu-glow': 'rgba(201,67,0,.30)',
          'glass-bg': 'linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,255,255,.80))', // Punto medio de opacidad en claro
          'glass-border': 'rgba(13,13,13,.10)',
          'glass-shadow': 'inset 0 1px 0 0 rgba(255,255,255,.90), 0 18px 40px -26px rgba(13,13,13,.30)',
          'glow-strong':
            'radial-gradient(ellipse closest-side at center, rgba(201,67,0,.16) 0%, rgba(201,67,0,.06) 55%, rgba(201,67,0,0) 100%)',
          'glow-soft':
            'radial-gradient(ellipse closest-side at center, rgba(201,67,0,.10) 0%, rgba(201,67,0,.04) 55%, rgba(201,67,0,0) 100%)',

          /* El aluminio se aclara en el tema claro (es el mismo objeto bajo
             otra luz); el negro del bisel, la lente y el LED NO cambian:
             una pantalla apagada es negra en los dos temas. */
          'device-edge': '212 212 216',
          'device-bezel': '0 0 0',
          'device-lens': '27 27 27',
          'device-glass': '255 255 255',
          'device-led': '16 185 129',
          'device-base-top': '228 228 231',
          'device-base-bottom': '161 161 170',
          'device-lip': '161 161 170',
          'device-shadow': 'rgba(0,0,0,.5)',

          /* Iguales en los dos temas: es la paleta de otra aplicacion. */
          'node-web': '96 165 250',
          'node-mail': '52 211 153',
          'node-crm': '167 139 250',
          'node-stock': '251 191 36',
          'node-data': '34 211 238',
        },
      },

      colors: {
        // Cada token apunta a su variable CSS; el valor lo pone el tema activo.
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          raised: 'rgb(var(--c-ink-raised) / <alpha-value>)',
        },
        paper: {
          DEFAULT: 'rgb(var(--c-paper) / <alpha-value>)',
          muted: 'var(--c-paper-muted)',
          faint: 'var(--c-paper-faint)',
        },
        hairline: 'var(--c-hairline)',
        dot: 'var(--c-dot)',
        nodbu: {
          DEFAULT: 'rgb(var(--c-nodbu) / <alpha-value>)',
          glow: 'var(--c-nodbu-glow)',
        },
        // Color opaco para las mascaras. No cambia con el tema: en una mascara
        // solo cuenta el canal alfa, el color da igual mientras sea solido.
        mask: 'rgb(0 0 0)',

        /**
         * EXCEPCION RAZONADA A "el naranja es el unico acento".
         *
         * La seccion "Piloto automatico" dibuja un portatil con CSS puro. Lo
         * que se pinta ahi no es la marca NODBU: es un OBJETO FISICO (aluminio,
         * bisel negro, lente de camara) con OTRA APLICACION dentro de la
         * pantalla. Por eso tiene tokens propios en vez de reusar ink/paper:
         *
         *   - Reusar los tokens de marca lo rompe. `bg-ink` en el bisel lo
         *     volveria crema en tema claro, y una pantalla apagada no es crema.
         *   - Que sean tokens y no hexadecimales sueltos es lo que permite
         *     comprobar los dos temas de un vistazo y mantener la regla de que
         *     ningun literal vive fuera de este archivo.
         *
         * `device-*` = la carcasa. Sigue al tema porque el aluminio refleja la
         * luz del entorno; el negro del bisel no, porque el negro es negro.
         * `node-*` = los iconos de la interfaz de dentro. Son los MISMOS en los
         * dos temas a proposito: representan seis sistemas distintos (web,
         * correo, CRM, inventario, datos) y el color es lo que los distingue.
         * No cuentan para el presupuesto de acento naranja de la seccion
         * porque estan dentro de la pantalla, no en la pagina.
         *
         * Si anades un nodo, coge un tono que ya exista antes de inventar uno.
         */
        device: {
          edge: 'rgb(var(--c-device-edge) / <alpha-value>)',
          bezel: 'rgb(var(--c-device-bezel) / <alpha-value>)',
          lens: 'rgb(var(--c-device-lens) / <alpha-value>)',
          glass: 'rgb(var(--c-device-glass) / <alpha-value>)',
          led: 'rgb(var(--c-device-led) / <alpha-value>)',
          'base-top': 'rgb(var(--c-device-base-top) / <alpha-value>)',
          'base-bottom': 'rgb(var(--c-device-base-bottom) / <alpha-value>)',
          lip: 'rgb(var(--c-device-lip) / <alpha-value>)',
        },
        node: {
          web: 'rgb(var(--c-node-web) / <alpha-value>)',
          mail: 'rgb(var(--c-node-mail) / <alpha-value>)',
          crm: 'rgb(var(--c-node-crm) / <alpha-value>)',
          stock: 'rgb(var(--c-node-stock) / <alpha-value>)',
          data: 'rgb(var(--c-node-data) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Escala fluida. El segundo elemento fija line-height y letter-spacing.
        'display-xl': ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '.98', letterSpacing: '-.03em' }],
        /**
         * Solo para el h1 del hero. Es mas corta que display-xl porque el
         * titular actual mide 44 caracteres y su linea mas larga
         * ("automatizando procesos") son 22: con 5.5rem se iba a cuatro lineas
         * y dejaba palabras huerfanas.
         *
         * Los topes salen de medir el texto real, no a ojo: esa linea ocupa
         * 11.45px de ancho por cada px de cuerpo (medido en el navegador con
         * la fuente ya cargada). El h1 dispone de 640px de 1280px para arriba
         * (7 de 12 columnas de un contenedor de 1200) y de 320px a 360px.
         *   maximo 3.25rem = 52px -> 595px, con 45px de margen
         *   minimo 1.625rem = 26px -> 298px, con 22px de margen
         * A 56px la linea mide 641px y se pasa por UN pixel: de ahi que el tope
         * no sea 3.5rem. Asi la segunda linea nunca parte ni deja "procesos"
         * solo en una linea.
         */
        'display-hero': ['clamp(1.625rem, 4.05vw, 3.25rem)', { lineHeight: '1.02', letterSpacing: '-.03em' }],
        'display-l': ['clamp(2rem, 4.4vw, 3.25rem)', { lineHeight: '1.04', letterSpacing: '-.025em' }],
        'display-m': ['clamp(1.5rem, 2.6vw, 2rem)', { lineHeight: '1.1', letterSpacing: '-.02em' }],
        'body-l': ['clamp(1.0625rem, 1.4vw, 1.25rem)', { lineHeight: '1.6' }],
        'body-s': ['.9375rem', { lineHeight: '1.55' }],
        mono: ['.6875rem', { lineHeight: '1', letterSpacing: '.16em' }],
        'mono-l': ['.75rem', { lineHeight: '1', letterSpacing: '.16em' }],
      },
      borderRadius: {
        glass: '20px',
      },
      boxShadow: {
        glass: 'var(--glass-shadow)',
        // Halo naranja del boton flotante de WhatsApp. Se construye con el
        // token de acento, asi que sigue al tema sin declararlo dos veces.
        glow:
          '0 0 0 1px rgb(var(--c-nodbu) / .18), 0 10px 34px -8px rgb(var(--c-nodbu) / .45), var(--glow-drop)',

        // Sombras del portatil de "Piloto automatico". Van aqui y no como
        // valores arbitrarios en el componente para que el literal rgba viva
        // en themeTokens como todos los demas.
        'device-lens': 'inset 0 1px 3px var(--c-device-shadow)',
        'device-base': '0 20px 25px -5px var(--c-device-shadow)',
        // Halo del nodo al pasar el raton. Sale del token de acento, asi que
        // en tema claro usa #C94300 y no el naranja de marca, que ahi suspende.
        'node-hover': '0 8px 30px rgb(var(--c-nodbu) / .12)',
      },
      backgroundImage: {
        glass: 'var(--glass-bg)',
        // Resplandores de fondo. Opacidades bajas a proposito: son lo que el
        // backdrop-filter tiene que desenfocar, no un elemento visible.
        //
        // `ellipse closest-side` (dentro del valor, en themeTokens) es
        // deliberado: por defecto un radial-gradient se mide hasta la ESQUINA
        // mas lejana, asi que en una caja apaisada todavia le queda brillo al
        // llegar al borde superior e inferior y, si la seccion lo recorta ahi,
        // se ve una linea horizontal dura.
        'glow-strong': 'var(--glow-strong)',
        'glow-soft': 'var(--glow-soft)',
      },
      maxWidth: {
        shell: '1200px',
      },
      spacing: {
        gutter: 'clamp(20px, 5vw, 40px)',
        /**
         * Padding vertical de cada seccion. TODAS usan `py-section`, asi que
         * este valor es el unico sitio donde se regula el aire entre bloques.
         *
         * Ojo al leer el numero: entre dos secciones seguidas el hueco es el
         * DOBLE (el pb de una mas el pt de la siguiente).
         *   antes: clamp(72px, 10vw, 140px) -> huecos de 144px a 280px
         *   ahora: clamp(48px,  7vw,  96px) -> huecos de  96px a 192px
         * Bajarlo mas empieza a comerse la respiracion que el vidrio necesita
         * para leerse como vidrio.
         */
        section: 'clamp(48px, 7vw, 96px)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(.16,1,.3,1)',
      },
      keyframes: {
        'marquee-left': {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
        'marquee-right': {
          from: { transform: 'translate3d(-50%,0,0)' },
          to: { transform: 'translate3d(0,0,0)' },
        },
        'marquee-up': {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(0,-50%,0)' },
        },
      },
      animation: {
        'marquee-left': 'marquee-left var(--marquee-duration, 46s) linear infinite',
        'marquee-right': 'marquee-right var(--marquee-duration, 46s) linear infinite',
        'marquee-up': 'marquee-up var(--marquee-duration, 46s) linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
