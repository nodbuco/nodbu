/**
 * Textura de fondo global: malla de puntos + grano + vinieta.
 *
 * Va en position: fixed a proposito. Las tres capas SI deben estar pegadas al
 * viewport: son textura uniforme, no iluminan nada concreto, y asi el coste de
 * pintado no depende de lo larga que sea la pagina. Ninguna lleva JavaScript
 * ni se recalcula en scroll: son imagenes/gradientes CSS estaticos que el
 * navegador rasteriza una vez y compone en su propia capa.
 *
 * Los resplandores naranjas YA NO viven aqui. Estaban fijos al viewport, asi
 * que se quedaban quietos mientras el contenido pasaba por delante y no
 * acompanaban a ninguna seccion. Ahora cada uno vive dentro de la seccion que
 * ilumina (<SectionGlow />, ver DESIGN.md §4).
 *
 * Malla y grano llevan `edge-mask-bottom`: se difuminan por los lados (si no,
 * la trama termina en seco contra el borde de la pantalla y en monitores
 * anchos se nota el limite) y tambien al llegar abajo, para que el fondo no
 * corte de golpe justo encima del footer. La vinieta no lleva mascara: es
 * ella misma un desvanecido, y su trabajo es justo el opuesto (oscurecer un
 * poco las esquinas, no desaparecer en ellas).
 *
 * Es puramente decorativa: aria-hidden, sin eventos y sin JavaScript, asi que
 * no necesita ser un componente cliente.
 */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 dot-grid edge-mask-bottom" />
      <div className="absolute inset-0 noise-layer edge-mask-bottom" />
      <div className="absolute inset-0 vignette" />
    </div>
  );
}
