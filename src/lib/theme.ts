/**
 * Tema de la pagina. Oscuro por defecto, siempre.
 *
 * DELIBERADO: no se consulta prefers-color-scheme. La identidad de NODBU es
 * oscura y esa es la primera impresion que tiene que recibir todo el mundo;
 * el claro es una eleccion del visitante, no una deduccion sobre su sistema.
 */

export type Theme = 'dark' | 'light';

export const DEFAULT_THEME: Theme = 'dark';

/** Clave de localStorage. La usan el componente y el script anti-parpadeo. */
export const THEME_KEY = 'nodbu-theme';

/**
 * Script que se inyecta en el <body> antes de que React hidrate.
 *
 * Sin esto la pagina pintaria en oscuro y saltaria a claro al hidratar, con un
 * parpadeo muy visible. Va como cadena porque tiene que ejecutarse en el HTML
 * estatico, antes de cualquier bundle.
 *
 * Si localStorage esta bloqueado (modo privado estricto), el try/catch deja el
 * oscuro del HTML y no rompe nada.
 */
export const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('${THEME_KEY}');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) {}
})();
`.trim();
