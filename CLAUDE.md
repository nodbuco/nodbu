# CLAUDE.md

Contexto para trabajar en este repositorio. Léelo antes de tocar código.

## Qué es esto

Sitio comercial de NODBU (automatizaciones e integraciones para PyMEs): una landing larga con
anclas **más una sección de artículos en `/recursos`**, `/sobre-nodbu` y tres páginas legales.
Next.js 14 App Router + TypeScript + Tailwind + Framer Motion, con **export estático** a
Hostinger. Público: dueños de PyMEs y gerentes de operaciones en España y Latinoamérica, **no
técnicos**.

Los artículos están además optimizados para buscadores con IA (ChatGPT Search, Perplexity,
Google AI Overviews, Claude), lo que condiciona cómo se escriben: ver `src/content/recursos/GUIA.md`.

## Comandos

```bash
npm run dev        # desarrollo en localhost:3000
npm run build      # genera /out (esto es lo que se publica)
npm run typecheck  # tsc --noEmit
npx serve out      # ver el build; abrir out/index.html con file:// NO carga estilos
```

## Reglas duras

Estas no son preferencias, romperlas rompe el proyecto.

1. **Export estático.** Nada de middleware, Server Actions, `next/og` dinámico, ISR ni
   `revalidate`. Si el build deja de generar `/out`, algo de esto se ha colado.

   **Route handlers sí, con dos condiciones:** solo `GET` y con
   `export const dynamic = 'force-static'`. Así los usan `/rss.xml` y `/llms.txt`, que se
   resuelven en el build y quedan como archivos sueltos en `/out` (comprobado: no salen como
   carpeta con `index.html`, aunque `trailingSlash` sea `true`).

   **Toda ruta dinámica necesita `generateStaticParams` y `export const dynamicParams = false`.**
   Sin las dos, `output: 'export'` falla. Lo hace `src/app/recursos/[slug]/page.tsx`.

2. **Ni un hexadecimal fuera de `tailwind.config.ts`.** Los literales de los DOS temas viven
   en `theme.extend.themeTokens.{dark,light}`. `globals.css` los vuelca en variables CSS
   (`--c-ink`, `--c-paper`…) y las clases de Tailwind leen esas variables. Nunca uses colores
   por defecto de Tailwind como `white` o `black`: el blanco es `paper`, el negro es `ink`.
   Tampoco `blue-400`, `emerald-500` ni ninguna otra de la paleta por defecto.

   **Los tokens no son fijos, dependen del tema.** `text-ink` es casi negro en oscuro y crema
   en claro. Eso es lo que hace que `bg-nodbu text-ink` funcione en los dos modos sin
   duplicar clases. Si escribes una clase de color, comprueba los dos temas.

   Comprobación (las tres tienen que salir vacías):

   ```bash
   grep -rnE "#[0-9a-fA-F]{3,8}\b" src/ | grep -v themeTokens
   grep -rn "rgba(" src/components/
   grep -rnE "(bg|text|border|ring|from|to|via|fill|stroke)-(white|black|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-[0-9]{2,3})?(/[0-9.]+)?\b" src/
   ```

   **No uses el modificador `dark:` de Tailwind.** Funciona (está mapeado a
   `[data-theme="dark"]`), pero duplicar clases es exactamente lo que el sistema de tokens
   existe para evitar: un token ya trae sus dos valores. Si necesitas que algo cambie con el
   tema, es un token nuevo, no un `dark:`.

3. **Los datos de contacto viven solo en `src/content/site.ts`.** Dominio, email y WhatsApp.
   Nunca los escribas a mano en otro archivo, ni siquiera en un `metadata` o un comentario.
   Comprobación:

   ```bash
   grep -rn "573137938618\|hola@nodbu\|nodbu\.com" src/ | grep -v "src/content/site.ts"
   ```

4. **El texto editable va en `/src/content`,** en arrays tipados y comentados. No metas copy
   dentro de un componente de sección.

5. **`prefers-reduced-motion` se respeta siempre.** Los componentes consultan
   `useReducedMotion()` y además hay una regla global en `globals.css` como red de seguridad.
   Si añades una animación, gestiona los dos casos.

6. **Un `<h1>` por página, ni más ni menos.** En la landing es el del hero; en un artículo, su
   título; en el hub, el título de la sección. Comprobación:

   ```bash
   for f in $(find out -name "*.html"); do echo "$(grep -c '<h1' $f) $f"; done | grep -v "^1 "
   ```

7. **Las URL llevan SIEMPRE barra final.** El sitio se compila con `trailingSlash: true`, así
   que cada ruta es una carpeta con su `index.html`. Canónicas, sitemap, RSS, `llms.txt` y
   enlaces internos usan la misma forma, nunca las dos: `/recursos/algo/`, jamás
   `/recursos/algo`. **No escribas rutas a mano:** salen de `site.routes`, de `absoluteUrl()` o
   de `articlePath()` (`src/lib/seo.ts`).

## Disciplina del acento naranja

El naranja (`nodbu`) es el único acento y se gasta con avaricia: **máximo dos elementos
naranjas por sección**. La tabla de presupuesto por sección está en `DESIGN.md §2`. Si añades
algo naranja, quita otra cosa o justifícalo ahí.

Los iconos de servicio van en `paper-muted`, no en naranja. Ya se decidió y está razonado.

## Vidrio: dos clases distintas, no las confundas

| Clase | Lleva `backdrop-filter` | Para qué |
|---|---|---|
| `.glass` | Sí | Navbar, menú móvil, botón flotante. **Máximo 3 en pantalla a la vez** |
| `.glass-flat` | No | Rejillas de 6 tarjetas (servicios, reseñas, planes) |

Seis `backdrop-filter` animados a la vez hunden los FPS en móviles de gama baja. Por eso las
rejillas usan `glass-flat`, que se ve igual y no cuesta nada. No lo "arregles" cambiándolas a
`.glass`.

El vidrio solo se ve como vidrio porque hay algo detrás que desenfocar: `<Background />` pone
la malla de puntos, el grano y una viñeta (fijos al viewport), y `<SectionGlow />` pone el
resplandor naranja **dentro de cada sección que lo necesita**. Sin esas capas queda
gris plano. Ver `DESIGN.md §4`.

## El grano tiene que ser monocromo, nunca a pelo

`feTurbulence` genera un canal de ruido **independiente por cada componente R/G/B**. Sin pasar
un `feColorMatrix type="saturate" values="0"` detrás, esa turbulencia mete micro-motas de
color que se leen como artefacto de compresión, no como grano. Medido: la correlación R/G del
ruido crudo es 0.039 (canales prácticamente independientes); con el `saturate` pasa a 1.000.
**Si tocas `.noise-layer`, no quites el `feColorMatrix`.**

También lleva un `feGaussianBlur stdDeviation=".45"` a propósito: sin él el grano se ve duro y
pixelado ("estática de TV"), no fotográfico. No lo subas de .5 — a partir de ahí el grano
empieza a lavarse y perder presencia. Ver `DESIGN.md §11`.

`--noise-opacity` es **el mismo valor (0.045) en los dos temas**, no dos números ajustados por
separado: al pasar el grano a monocromo su media queda en ~128/255, casi equidistante entre el
negro y el crema de cada tema, así que un solo número da la misma intensidad percibida en
ambos. Si cambias el grano (color, blur, octavas), vuelve a medir esa media antes de reusar
este valor — la simetría depende de que el grano siga centrado en gris medio.

## La malla de puntos separa "peak" de "densidad"

Si la malla se siente como rejilla técnica, la palanca es el **espaciado** (`background-size`
en `.dot-grid`), no la opacidad del token `dot`. Bajar la opacidad arriesga volver a la
invisibilidad que ya se corrigió una vez (`.05` era imperceptible). Espaciar más los puntos
baja cuántos hay por pantalla sin tocar cuán nítido es cada uno por separado.

**Estado real del código, que NO coincide con `DESIGN.md §11.4`:**

| | `DESIGN.md §11.4` decidió | El código hace hoy |
|---|---|---|
| Espaciado | `48px` | **`32px`** |
| Opacidad de `dot` | `.12` oscuro / `.11` claro, sin tocar | **`.07` en los dos** |

O sea, se movieron los dos ejes justo al revés de lo acordado: se dejó la densidad alta y se
bajó la opacidad hasta rozar el `.05` que ya se había descartado por imperceptible. **Está
pendiente de decidir**, no es un descuido de esta nota. Si se retoma, hay que mover las dos
cosas a la vez y volver a mirarlo en pantalla, no solo en el código.

## Animaciones

- Un único componente de aparición: `<Reveal>` (fade + 24px, .6s, `once: true`, `amount: .3`).
  Para escalonar hermanos pasa `index`; el stagger es de 70ms.
- **No apiles efectos.** Si una sección ya tiene `Reveal`, no le añadas además parallax, hover
  3D y brillo animado.
- Ninguna animación puede retrasar la lectura del `<h1>` más de 400ms. El hero entra a 0ms; el
  isotipo, a 150ms.

## El isotipo del hero (`InteractiveLogo.tsx`)

Es el elemento firma. Antes de tocarlo, lee `DESIGN.md §13`.

Sustituyó a `FlowCanvas.tsx` (el lienzo de herramientas entrando en desorden y saliendo
ordenadas), que ya no existe. `DESIGN.md §6` y `§10` describen aquel lienzo y **se conservan
como histórico**: el razonamiento sigue valiendo, pero no describen lo que hay en pantalla.

- La geometría **está derivada del archivo real del kit**. Lienzo de 512, centro en
  (256,256), `R = 135.68`; grosor `0.4075 R` y radio del punto `0.2453 R`. El arco va de -16°
  a -74° por el lado largo, así que deja una **apertura de 58° centrada en -45°**, y el punto
  naranja cae justo en el centro de esa apertura. No metas números mágicos: si cambias `R`,
  recalcula los tres puntos con las mismas proporciones.
- **El isotipo se mantiene limpio.** El único naranja es el punto. El arco va en `text-paper`
  y no se le pasa ningún pulso por encima. Ya se decidió y está razonado.
- Va `aria-hidden`: es decorativo y no dice nada que no diga ya el `<h1>`.
- Está oculto por debajo de `md`.
- En tema claro la capa de resplandor no se ve, porque usa `mix-blend-screen` (solo aclara) y
  el arco ahí es casi negro. Es el comportamiento buscado, no un fallo: no lo "arregles".

## El portátil de "Piloto automático" (`ValueShowcase.tsx`)

La sección 2. Dibuja un MacBook **con CSS puro**, sin imagen, y desplaza seis pasos de un flujo
real por su pantalla, sincronizados con `scrollYProgress`. Es lo que sustituyó a la franja de
"fugas de tiempo" (`PainStrip`, retirado).

- **No lo cambies por una imagen.** Pesa 0 bytes de red, escala sin perder nitidez y responde
  al tema. Una captura costaría 150–400 KB y traería un fondo que no combina con ninguno de
  los dos temas.
- **Sus colores son tokens, no excepciones sueltas.** Ver la sección de abajo.
- El desplazamiento va ligado al scroll, **no en bucle**: el visitante controla el avance, así
  que no compite por atención con el resto de la página.

## Los tokens `device-*` y `node-*` son la única excepción al acento único

El portátil obliga a meter colores que no son de la marca. La regla del hexadecimal **no se
salta** (son tokens en `themeTokens`, en los dos temas, como cualquier otro); la que tiene
excepción razonada es la del acento naranja:

| Familia | Qué es | Cambia con el tema |
|---|---|---|
| `device-*` | La carcasa: aluminio, bisel, lente, LED, muesca | El aluminio sí (refleja el entorno); el negro y la lente **no** |
| `node-*` | Los iconos de la interfaz **de dentro** de la pantalla | No: son la paleta de *otra* aplicación |

Por qué existen en vez de reusar los de marca: `bg-ink` en el bisel lo volvería crema en tema
claro, y **una pantalla apagada no es crema**. Y en los nodos el color es *información* —
distingue seis sistemas (web, correo, CRM, inventario, datos)—, no decoración.

**No cuentan para el presupuesto de naranja de la sección**, porque están dentro de la pantalla
del portátil y no sobre la página. Si añades un nodo, coge un tono que ya exista antes de
inventar uno.

## Copy

Español neutro, directo y concreto. Habla de lo que la persona controla ("tus cotizaciones"),
nunca de cómo funciona el sistema por dentro.

**Prohibido:** "soluciones innovadoras", "transformación digital", "llevamos tu negocio al
siguiente nivel", "potencia", "revoluciona", "sinergia".

**Los botones dicen qué ocurre al pulsarlos** ("Hablar por WhatsApp", nunca "Enviar") y ese
nombre se mantiene igual en todo el flujo, incluido el mensaje de confirmación.

**Nunca inventes una estadística y le pongas una fuente.** Ahora mismo la página no afirma
ninguna cifra (la franja que las llevaba se retiró). Si vuelves a meter una, va marcada como
estimación ilustrativa, con "~" y su etiqueta, o con la referencia real si es un dato propio.

## Contenido real: cuidado al tocarlo

Ya no queda contenido de ejemplo en el proyecto:

- `src/content/testimonials.ts` — **son reseñas reales**, publicadas con autorización, con foto
  en `/public/testimonials`. Si añades a alguien, pide su permiso por escrito antes de publicar
  nombre, cargo y foto.
- Las páginas legales ya llevan los datos fiscales reales del titular.

## Temas: oscuro por defecto, claro opcional

- **El oscuro es el predeterminado y no se negocia.** `:root` lo declara sin condiciones y
  **no se consulta `prefers-color-scheme`**: la primera impresión es oscura para todo el
  mundo. El claro es una elección explícita y se recuerda en `localStorage`.
- El atributo vive en `<html data-theme="dark|light">`. Lo pone `themeInitScript`
  (`src/lib/theme.ts`) **antes de que React hidrate**; si lo quitas, la página parpadea.
- Añadir un color nuevo son dos entradas en `themeTokens` (dark y light) y una variable en
  `globals.css`. Nunca una sola.
- **El naranja no es el mismo en los dos modos.** En claro vale `#C94300`, no `#FF5C00`: el
  de marca da 2.94:1 sobre el fondo claro y suspende AA hasta para texto grande. La única
  excepción es el punto del logotipo, que va dentro del SVG del kit. Ver `DESIGN.md §9.2`.
- El vidrio tiene **especificación propia en claro** (fondo casi opaco, brillo superior al
  90%, sombra corta). No es invertir valores. Ver `DESIGN.md §9.3`.
- `<Logo>` pinta las dos variantes del logotipo y enseña la que toca con `.theme-dark-only` /
  `.theme-light-only`. No cambies el `src` con JavaScript: parpadea.

## Contraste: verificado, no estimado

Los 217 textos de la página cumplen AA en los dos modos, con un peor caso de 4.66:1.

`paper-faint` estaba **por debajo de AA en los dos modos** hasta que se midió (3.49:1 en
oscuro). Lleva los eyebrows y los pies "Estimación ilustrativa", que son información y van a
11px, así que no les vale la excepción de texto grande. Ahora está en `.48` (oscuro) y `.58`
(claro). **No lo bajes.**

## El titular del hero tiene su propia escala

`display-hero` (`clamp(1.625rem, 4.05vw, 3.25rem)`) existe porque el titular mide 44
caracteres y con `display-xl` se iba a cuatro líneas. Los topes están medidos, no estimados:
la línea larga ocupa 11.45px de ancho por px de cuerpo y el h1 solo dispone de 640px. A 56px
se pasa por un píxel. **Si cambias el titular, vuelve a medir** — no reutilices estos valores
con otro texto.

El hero lleva `min-h-svh` para que la siguiente sección no asome al cargar. Es `min-height`:
en pantallas bajas crece con el contenido. No lo cambies a `h-svh` ni a `height`.

## Contadores: el valor inicial importa

`<Counter>` (`src/components/ui/Counter.tsx`) **hoy no lo usa nadie**: su único consumidor era
la franja de fugas de tiempo, que se retiró. Se conserva como primitiva porque la trampa que
resuelve se vuelve a pisar si alguien lo reescribe desde cero:

Renderiza el **valor final** en el primer render y solo baja a 0 al montar en cliente, cuando
el elemento todavía está fuera de pantalla. Si arrancase en 0, el HTML estático diría "~0 h a
la semana" para quien entre sin JavaScript. Es un número falso: no lo cambies a `useState(0)`.

Si acabas decidiendo que no va a volver a usarse, bórralo entero — pero entonces borra también
esta nota.

## Nunca dibujes una proporción que no tienes

La franja de "Dónde se va el tiempo" (`PainStrip` + `content/pains.ts`) **ya no existe**: la
sección 2 es ahora el portátil. Se conserva la regla porque el criterio sigue aplicando a
cualquier cifra futura: eran estimaciones ilustrativas y se descartaron a propósito las
variantes con barras proporcionales y con donut, porque **dibujar una proporción afirma una
precisión que no se tiene**. Ver `DESIGN.md §8.1`.

## El formulario no filtra dominios de correo

La validación del email comprueba **solo formato**. No hay lista de dominios permitidos ni
rechazados, y no debe haberla: muchísimas PyMEs de Latinoamérica gestionan el negocio desde
Gmail o Hotmail. El campo se llama "Correo electrónico", no "Email corporativo".

## Variables de entorno

`NEXT_PUBLIC_WEB3FORMS_KEY` y `NEXT_PUBLIC_GTM_ID` se incrustan **en el build**. Cambiarlas
obliga a recompilar y volver a subir. Las dos pueden estar vacías: el formulario avisa de que
no está conectado y GTM simplemente no se carga.

## Antes de dar algo por terminado

```bash
npm run typecheck && npm run build
```

Y comprueba que existen:

```
out/index.html            out/recursos/index.html       out/sobre-nodbu/index.html
out/privacidad/index.html out/aviso-legal/index.html    out/terminos/index.html
out/gracias/index.html    out/.htaccess                 out/sitemap.xml
out/robots.txt            out/rss.xml                   out/llms.txt
out/og.png                out/404.html
out/recursos/<slug>/index.html  (uno por artículo)
```

El workflow de despliegue comprueba esta lista y además que el número de carpetas en
`out/recursos` coincida con el de `.mdx` publicados. Si no cuadra, cancela la subida.

## Cosas que ya se decidieron (no las deshagas sin motivo)

- **Navbar y footer usan `logo-full-white.svg`, no el lockup.** El lockup repite el nodo dos
  veces y a 26px se lee como ruido.
- **"Cómo funciona" es un eje vertical con línea de progreso de scroll,** no cuatro tarjetas en
  fila. Cuatro tarjetas horizontales se leen como opciones equivalentes y aquí el orden importa.
- **Los logos del carrusel no llevan texto dentro del SVG.** El nombre va como texto HTML al
  lado, para controlar la tipografía y evitar recortes.
- **`public_html/blog` se deja libre** por si algún día se instala WordPress ahí. El workflow
  de despliegue lo excluye.
- **El hero es el isotipo, no un lienzo de flujo.** El lienzo (`FlowCanvas`) se retiró; la
  metáfora del servicio se recuperó en la sección 2 con el portátil. Ver `DESIGN.md §13`.
- El razonamiento completo, incluida la autocrítica de lo que se descartó por genérico, está en
  `DESIGN.md §7`, y lo del hero y la sección 2 actuales en `§13`.

## Cómo se añade un artículo

**Crear un `.mdx` en `src/content/recursos/` y recompilar. Nada más.** El nombre del archivo es
la URL, y el artículo entra solo en el hub, el sitemap, el RSS, `llms.txt`, los relacionados de
su categoría y el pie. No hay que darlo de alta en ningún sitio.

La guía completa para escribirlo —frontmatter campo a campo, reglas de redacción y checklist de
publicación— está en **`src/content/recursos/GUIA.md`**, y está escrita para poder publicar sin
abrir código. No la dupliques aquí: si cambia una regla editorial, cambia allí.

Lo que sí es de código:

- **El frontmatter se valida en el build.** Si falta un campo, la fecha no existe en el
  calendario o la categoría no es una de las cuatro, `npm run build` **falla** diciendo el
  archivo y el campo. Es deliberado: mejor no publicar que publicar roto. Está en
  `src/lib/articles.ts`.
- **El slug sale del nombre del archivo**, nunca del frontmatter.
- **El tiempo de lectura se calcula** (~200 palabras/minuto en español), no se escribe.
- **El índice lateral se extrae de los `h2`/`h3`.** Sus `id` los calcula `articles.ts`
  replicando el algoritmo de `github-slugger`, que es el que usa `rehype-slug` al renderizar.
  Se reimplementa en vez de importarlo porque `github-slugger` solo está como dependencia
  indirecta. **La equivalencia está comprobada contra el HTML real, no supuesta** — si tocas
  ese slugger, vuelve a compararla.
- Un `.mdx` que empiece por `_` se ignora entero: sirve para borradores en el repo.

### Lo que un artículo NO puede hacer

- **Estilos en línea.** Un `style=` en el cuerpo **rompe el build a propósito**: sería un color
  fuera de `tailwind.config.ts`, o sea la regla 2. Si hace falta un bloque nuevo, se añade al
  mapa de componentes de `src/components/recursos/Mdx.tsx` y queda disponible para todos.
- **Componentes propios de React.** El mapa de `Mdx.tsx` es todo lo que hay.
- **Escribir a mano el WhatsApp, el correo o el dominio.** El bloque de contacto del final se
  pone solo.
- **Inventar cifras o prometer resultados.** Ver la sección de Copy.

## Archivos retirados (no los revivas por error)

`FlowCanvas.tsx`, `PainStrip.tsx` y `content/pains.ts` se borraron porque nada los importaba.
Con ellos se fueron las reglas `.flow-line` / `.flow-drift` y sus `@keyframes` de
`globals.css`. Si ves una referencia a cualquiera de ellos en algún documento, es residuo:
corrígelo en vez de recrear el archivo.
