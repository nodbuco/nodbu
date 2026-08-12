import localFont from 'next/font/local';

/**
 * Fuentes servidas desde el propio dominio. Cero peticiones a Google Fonts o
 * Fontshare en tiempo de ejecucion: el sitio es estatico y no debe depender de
 * terceros para pintar texto. Los .woff2 estan en /public/fonts.
 */

// Titulares.
export const display = localFont({
  src: [
    { path: '../../public/fonts/ClashDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/ClashDisplay-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

// Parrafos e interfaz.
export const body = localFont({
  src: [
    { path: '../../public/fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

// Eyebrows, etiquetas, metricas y numeros. Fuente variable: un solo archivo
// cubre 400 y 500 (31 KB del subset latino en vez de 186 KB de dos estaticas).
export const mono = localFont({
  src: [{ path: '../../public/fonts/JetBrainsMono-Variable.woff2', weight: '400 500', style: 'normal' }],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
});
