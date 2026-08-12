# NODBU — landing comercial

Landing de una sola página para [nodbu.com](https://nodbu.com). Next.js 14 con **export
estático**: el build produce HTML, CSS y JS planos en `/out` que se suben a `public_html` de
Hostinger. No hay servidor, ni base de datos, ni CMS.

- **Publicar:** ver [DEPLOY.md](DEPLOY.md)
- **Decisiones de diseño y por qué:** ver [DESIGN.md](DESIGN.md)
- **Trabajar con Claude Code en este repo:** ver [CLAUDE.md](CLAUDE.md)

---

## Lo primero: qué te toca rellenar a ti

| # | Qué | Dónde | Estado |
|---|---|---|---|
| 1 | Enlace de la agenda | `src/content/site.ts` → `scheduling` | ✅ `https://cal.com/nodbu/15min` |
| 2 | Clave de Web3Forms | `.env.local` | ✅ Puesta |
| 3 | Reseñas reales con foto | `src/content/testimonials.ts` | ✅ Las seis son reales |
| 4 | Datos fiscales | Páginas legales | ✅ Rellenados |
| 5 | Revisión legal | Ambas páginas legales | ⚠️ Recomendable: el titular es colombiano y la web capta datos en España |

Para cambiar la agenda, una línea en `site.ts` y los dos botones de la página cambian a la vez:

```ts
scheduling: 'https://cal.com/nodbu/15min',
```

---

## Arrancar el proyecto

> **Requisito:** Node.js 18 o superior. Este equipo no lo tenía instalado; descárgalo en
> <https://nodejs.org> (botón **LTS**). Comprueba con `node -v`. Detalle paso a paso en
> [DEPLOY.md](DEPLOY.md), Paso 0.

```bash
npm install
```

```bash
npm run dev
```

Se abre en <http://localhost:3000>.

Para generar lo que se publica:

```bash
npm run build
```

Deja la web entera en `out/`. Para verla como se verá en producción **hace falta un servidor
local** — abrir `out/index.html` con doble clic no carga los estilos, porque las rutas de los
recursos son absolutas (`/_next/...`), como en el dominio real:

```bash
npx serve out
```

Y para comprobar que no hay errores de tipos:

```bash
npm run typecheck
```

---

## Editar el contenido

**Todo el texto editable está en `/src/content`.** No hace falta tocar ningún componente.

| Archivo | Qué contiene |
|---|---|
| `site.ts` | **Dominio, email, WhatsApp y enlaces del menú.** Fuente única de verdad |
| `services.ts` | Las 6 tarjetas de servicios |
| `steps.ts` | Los 4 pasos de "Cómo funciona" |
| `integrations.ts` | Las 12 herramientas del carrusel |
| `testimonials.ts` | Las 6 reseñas reales, con foto en `/public/testimonials` |
| `faq.ts` | Las 6 preguntas frecuentes |
| `plans.ts` | Los 3 planes |
| `countries.ts` | Los 14 países (solo SEO y `<select>`; ya no hay sección visible) |
| `pains.ts` | Las 4 fugas de "Dónde se va el tiempo" |

### Datos de contacto: un solo sitio

El número de WhatsApp, el email y el dominio viven **solo** en `src/content/site.ts`. Cambiar
el número ahí lo cambia en los 6 enlaces de la página, en el botón flotante y en el JSON-LD.
Está comprobado: no hay ningún número ni email escrito a mano en ningún otro archivo.

```ts
const WHATSAPP_E164 = '573137938618'; // sin + ni espacios
```

### Los países alimentan tres sitios a la vez

Añadir un país en `countries.ts` lo añade automáticamente en:

1. el desplegable de país del formulario,
2. las *keywords* del SEO,
3. el `areaServed` del JSON-LD.

La sección visible de Cobertura se eliminó, pero los países siguen ahí: su valor era aparecer
en búsquedas locales, no ocupar pantalla.

---

## El formulario (Web3Forms)

No hay backend, así que el formulario envía directamente desde el navegador a
[Web3Forms](https://web3forms.com), que reenvía el contenido a **hola@nodbu.com**.

### Conseguir la clave

1. Entra en <https://web3forms.com>.
2. Escribe `hola@nodbu.com` en la caja de "Create your Access Key".
3. Te llega la clave por correo al instante. Es gratis (250 envíos al mes).
4. Pégala en `.env.local`:

```
NEXT_PUBLIC_WEB3FORMS_KEY=tu-clave-aqui
```

> **La clave es pública a propósito.** Va incrustada en el JavaScript del navegador; así
> funciona Web3Forms. Solo sirve para entregar correo en la dirección que registraste, no da
> acceso a nada.

> **⚠️ Al ser una variable `NEXT_PUBLIC_*`, se graba durante el `npm run build`.** Si cambias
> la clave, hay que **volver a compilar y volver a subir**. Editarla en el servidor no sirve
> de nada.

Si la clave está vacía, el formulario no se rompe: muestra un aviso que dice que todavía no
está conectado y ofrece escribir por WhatsApp.

El formulario lleva un **campo trampa (honeypot)** invisible. Si un bot lo rellena, Web3Forms
descarta el envío.

---

## Analítica y Google Ads

El componente `<Analytics />` carga Google Tag Manager solo si `NEXT_PUBLIC_GTM_ID` tiene
valor. Si está vacío **no se carga nada de Google**, ni un solo byte.

```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Ya están marcados los dos eventos de conversión, listos para usar en Google Ads:

| Evento | Cuándo salta |
|---|---|
| `whatsapp_click` | Cualquier clic que abra WhatsApp. Incluye `source` para saber qué botón convierte (`hero`, `navbar`, `boton-flotante`, `plan-…`) |
| `lead_submit` | El formulario se envió correctamente. Incluye `country` |
| `lead_submit_error` | Falló el envío. Útil para detectar la clave mal puesta |

Igual que la clave del formulario: si cambias el `GTM-ID`, hay que recompilar y volver a subir.

---

## Marca

`/public/brand/` contiene los archivos reales del kit (`NODBU_KIT_LOGO/`), renombrados:

| Archivo | Uso |
|---|---|
| `logo-full-white.svg` | Navbar y footer |
| `logo-full.svg` | Reserva, para fondo claro |
| `isotipo.svg` / `isotipo-dark-bg.svg` | El nodo suelto |
| `lockup.svg` | Reserva, no se usa en la página |
| `app-icon.svg` | Base de los iconos |

Los iconos (`favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`) están
generados a partir del isotipo del kit. El `favicon.ico` es multi-tamaño (16/32/48); el del
kit traía solo 16×16.

> Al logotipo horizontal solo se le recortó el `viewBox` para quitar el lienzo vacío que traía
> a la derecha. Los trazos no se han tocado.

**Los logos de las 12 herramientas del carrusel** (`src/components/logos/`) son
representaciones geométricas simplificadas, no los archivos oficiales de cada empresa. Se
muestran a título informativo para indicar compatibilidad, y así está declarado en el aviso
legal. Si alguna marca exige su asset oficial, se sustituye solo su `.tsx` y se registra en
`src/components/logos/index.ts`.

La imagen de compartir (`public/og.png`) se genera desde `design/og-source.svg`.

---

## Colores y tipografía

**Todos los colores están en `tailwind.config.ts` y en ningún otro sitio.** No hay ni un
hexadecimal en los componentes. Si necesitas un color, usa la clase (`bg-ink`, `text-nodbu`,
`border-hairline`) o añade el token al config.

Las fuentes (Clash Display, Satoshi, JetBrains Mono) están descargadas en `/public/fonts` y se
cargan con `next/font/local`. **La página no pide nada a Google Fonts ni a Fontshare en tiempo
de ejecución.** Pesan 112 KB en total.

---

## Por qué no WordPress

Un constructor visual no reproduce el vidrio, el diagrama animado del hero ni las animaciones
ligadas al scroll sin quedar lento y genérico, y añadiría mantenimiento de plugins y
superficie de seguridad. Aquí el contenido está tan centralizado (`/src/content`) que editarlo
es tan fácil como en un CMS, y la web es un montón de archivos estáticos: nada que hackear.

**La carpeta `public_html/blog` se deja libre a propósito.** Si más adelante quieres un blog
para SEO, se instala WordPress ahí desde hPanel sin tocar ni romper la landing. El workflow de
despliegue automático ya excluye `blog/**` para no borrarlo.

---

## Mantenimiento: cosas que caducan

| Cada cuánto | Qué |
|---|---|
| Al cambiar de año | El copyright del footer se calcula en el build. En enero, recompila y sube |
| Antes de publicar | Sustituir las reseñas de ejemplo por reales |
| Antes de publicar | Rellenar `[NOMBRE FISCAL]`, `[NIT]` y `[DIRECCIÓN FISCAL]` |
| Si cambias la clave de Web3Forms o el GTM | Recompilar y volver a subir |

---

## Estructura

```
src/
├── app/
│   ├── layout.tsx          metadata, JSON-LD, fuentes, fondo
│   ├── page.tsx            la landing (orden de las secciones)
│   ├── globals.css         vidrio, fondo, animaciones del lienzo
│   ├── fonts.ts            las tres fuentes locales
│   ├── sitemap.ts          -> out/sitemap.xml
│   ├── robots.ts           -> out/robots.txt
│   ├── not-found.tsx       -> out/404.html
│   ├── privacidad/
│   └── aviso-legal/
├── components/
│   ├── sections/           una por sección de la página
│   ├── ui/                 Reveal, Button, Logo, Background…
│   ├── logos/              las 12 marcas del carrusel
│   ├── Analytics.tsx       Google Tag Manager
│   └── LegalShell.tsx      envoltorio de las páginas legales
├── content/                TODO el texto editable
└── lib/
    ├── submit-lead.ts      envío a Web3Forms
    ├── analytics.ts        eventos del dataLayer
    └── cn.ts

public/
├── .htaccess               HTTPS, www, gzip, caché, 404
├── brand/                  archivos del kit
├── fonts/                  los .woff2
├── og.png                  1200×630
└── favicon.ico, icon-*.png, apple-touch-icon.png
```

---

## Restricciones del export estático

El sitio se compila con `output: 'export'`. **No se puede usar** (rompería el build o quedaría
sin funcionar en Hostinger):

- API routes ni Route Handlers
- Middleware
- Server Actions
- `next/og` dinámico (la imagen OG es un PNG estático)
- ISR, `revalidate`, `dynamic = 'force-dynamic'`
- `next/image` con optimización (va con `unoptimized: true`)
- Cookies o cabeceras en servidor

Si algo de eso hace falta algún día, se resuelve desde el cliente o con un servicio externo,
como se hizo con el formulario.
