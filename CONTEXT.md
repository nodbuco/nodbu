# CONTEXT.md — NODBU

Resumen operativo del proyecto en una sola pasada. Es un índice, no la fuente: el
razonamiento largo está en `DESIGN.md`, las reglas para trabajar en el código en `CLAUDE.md`
y la publicación en `DEPLOY.md`.

---

## 1. Datos del proyecto

Todos salen de `src/content/site.ts` y **de ningún otro sitio**.

| Dato | Valor |
|---|---|
| Dominio | `https://nodbu.com` |
| Email | `hola@nodbu.com` |
| WhatsApp | `+57 313 793 8618` (E.164: `573137938618`) |
| Agenda | `https://cal.com/nodbu/15min` |
| Duración de la llamada | 15 minutos |
| Titular | [NOMBRE FISCAL] · [NIT] |
| Domicilio | CR 1 G # 38 Sur - 09, Bogotá, Colombia |
| Mercados | España + 13 países de Latinoamérica (`countries.ts`) |

Cambiar el WhatsApp en `site.ts` lo cambia en los 6 enlaces, el botón flotante y el JSON-LD.

---

## 2. Identidad visual

### Paleta — los dos modos

Los literales viven **solo** en `tailwind.config.ts` → `themeTokens.{dark,light}`.
`globals.css` los vuelca en variables CSS y las clases de Tailwind leen esas variables.

| Token | Oscuro (default) | Claro |
|---|---|---|
| `ink` (fondo) | `#090909` | `#FFF6ED` |
| `ink-raised` | `#101010` | `#FFFFFF` |
| `paper` (texto) | `#FFFFFF` | `#0D0D0D` |
| `paper-muted` | `rgba(255,255,255,.62)` | `rgba(13,13,13,.68)` |
| `paper-faint` | `rgba(255,255,255,.48)` | `rgba(13,13,13,.58)` |
| `hairline` | `rgba(255,255,255,.10)` | `rgba(13,13,13,.12)` |
| `dot` (malla) | `rgba(255,255,255,.07)` | `rgba(13,13,13,.07)` |
| `nodbu` | `#FF5C00` | **`#C94300`** |
| `nodbu-glow` | `rgba(255,92,0,.28)` | `rgba(201,67,0,.30)` |

Además hay dos familias de tokens que **no son de marca**, para el portátil de la sección 2:
`device-*` (carcasa: aluminio, bisel, lente, LED) y `node-*` (los iconos de la interfaz que se
ve dentro de la pantalla). Son la única excepción al "el naranja es el único acento", y está
razonada en `DESIGN.md §13.4`. No son una excepción a la regla del hexadecimal: viven en
`themeTokens` como todos los demás.

⚠️ **`dot` está en `.07` y `DESIGN.md §11.4` decidió `.12`/`.11`.** Ver el aviso de la
sección 4.

**El naranja cambia en claro y no es negociable:** `#FF5C00` sobre `#FAF9F7` da 2.94:1 y
suspende AA incluso para texto grande. `#C94300` da 4.66:1. La única excepción es el punto del
logotipo, que va dentro del SVG del kit.

Los 217 textos de la página cumplen AA en los dos modos. Peor caso: **4.66:1**.

### Tipografía

| Rol | Familia | Uso |
|---|---|---|
| Display | Clash Display 500/600 | Titulares |
| Cuerpo | Satoshi 400/500 | Párrafos y UI |
| Utilitaria | JetBrains Mono (variable) | Eyebrows, etiquetas, cifras. Siempre mayúsculas, `ls .16em`, 11–12px |

Locales en `/public/fonts` con `next/font/local`. 112 KB en total, cero peticiones a terceros.

Escala fluida con `clamp()`. El h1 usa `display-hero`
(`clamp(1.625rem, 4.05vw, 3.25rem)`), más corta que `display-xl` porque el titular actual mide
44 caracteres.

### Glassmorphism — los dos modos

| | Oscuro | Claro |
|---|---|---|
| `background` | `linear-gradient(180deg, rgba(255,255,255,.15), rgba(255,255,255,.05))` | `linear-gradient(180deg, rgba(255,255,255,.96), rgba(255,255,255,.80))` |
| `border` | `1px solid rgba(255,255,255,.10)` | `1px solid rgba(13,13,13,.10)` |
| `box-shadow` | `inset 0 1px 0 0 rgba(255,255,255,.07), 0 24px 60px -30px rgba(0,0,0,.9)` | `inset 0 1px 0 0 rgba(255,255,255,.90), 0 18px 40px -26px rgba(13,13,13,.30)` |
| `backdrop-filter` | `blur(20px) saturate(140%)` | igual |

No es invertir valores: en claro la tarjeta pasa de *más clara que el fondo* a *más opaca que
el fondo*, el brillo interior sube de .07 a .90 y la sombra se acorta y se aclara.

Dos clases: **`.glass`** lleva `backdrop-filter` (navbar, menú móvil, botón flotante, toggle —
máx. 3 a la vez) y **`.glass-flat`** no (rejillas de 6 tarjetas).

### Resplandores

| | Oscuro | Claro |
|---|---|---|
| `glow-strong` | 14% → 5% → 0 | 16% → 6% → 0 |
| `glow-soft` | 8% → 3% → 0 | 10% → 4% → 0 |

Máximo **1 por sección y 3 en la página**, y cada uno tiene que anclar algo concreto: el
isotipo del hero, el plan destacado y el formulario final. Van dentro de su sección
(`<SectionGlow>`), no en el fondo fijo. Usan `ellipse closest-side` para llegar a cero justo
en los bordes de su caja.

### Textura de fondo (malla + grano + viñeta)

Fija al viewport, en `<Background />`, sin JavaScript ni recálculo por scroll:

| Capa | Valor | Por qué |
|---|---|---|
| Malla de puntos | 1.5px de radio cada **32px**, alpha `.07` en los dos temas | ⚠️ No es lo que decidió `DESIGN.md §11.4` (48px manteniendo `.12`/`.11`). El fondo sólido vive en `<html>`, no en `<body>`, para que la capa fixed de puntos sea visible por encima |
| Grano | `feTurbulence` `baseFrequency=.8 numOctaves=2` → `feColorMatrix saturate(0)` → `feGaussianBlur .45` | Monocromo (mata el ruido de color: R/G pasa de 0.039 de correlación a 1.000) y suavizado (evita el aspecto "estática de TV") |
| `--noise-opacity` | **`0.045` en los dos temas** | El grano monocromo centra en ~128/255, casi equidistante de negro y crema, así que un solo valor da intensidad percibida simétrica |
| Viñeta | `radial-gradient(ellipse at 50% 40%, transparent 60%, rgb(var(--c-ink) / .3) 100%)` | Oscurece un poco las esquinas para dar profundidad, sin dibujar un marco. Usa el token `ink`, no un color nuevo |

Detalle completo, con las mediciones que justifican cada número, en `DESIGN.md §11`.

---

## 3. Estructura del sitio

Ya no es una sola página. Son **seis rutas fijas más una por artículo**, todas con barra final
(el sitio se compila con `trailingSlash: true`).

| Ruta | Qué es | Archivo |
|---|---|---|
| `/` | La landing larga con anclas (tabla de abajo) | `src/app/page.tsx` |
| `/recursos/` | Hub de artículos: destacado + rejilla filtrable por categoría | `src/app/recursos/page.tsx` |
| `/recursos/<slug>/` | Un artículo. Una ruta por `.mdx` | `src/app/recursos/[slug]/page.tsx` |
| `/sobre-nodbu/` | Página de **entidad**: quién está detrás, NIT, domicilio, cobertura | `src/app/sobre-nodbu/page.tsx` |
| `/privacidad/` | Política de privacidad | `src/app/privacidad/page.tsx` |
| `/aviso-legal/` | Aviso legal (condiciones de uso **del sitio web**) | `src/app/aviso-legal/page.tsx` |
| `/terminos/` | Términos y condiciones **del servicio** | `src/app/terminos/page.tsx` |

Además, generados en el build y sin página: `sitemap.xml`, `robots.txt`, `rss.xml`, `llms.txt`
y `404.html`.

`/sobre-nodbu` no es un "quiénes somos" de relleno: es a donde apunta el `author` de cada
artículo y el nodo `Person` del JSON-LD. Los buscadores con IA citan lo que pueden atribuir a
alguien identificable.

`/terminos` **no repite** `/aviso-legal`: el aviso legal cubre el uso del sitio web
(propiedad intelectual, responsabilidad, legislación); los términos cubren la contratación del
servicio (alcance, entregables, confidencialidad, garantía). Duplicarlos penalizaría a los dos.

### La landing

Una sola página larga con anclas. Orden real (`src/app/page.tsx`):

| # | Sección | Qué hay |
|---|---|---|
| 1 | **Hero** `#inicio` | Titular, subtítulo, CTA a WhatsApp + CTA de agenda, y el logo interactivo animado (`InteractiveLogo`). Ocupa la pantalla completa (`min-h-svh`). Texto ajustado para máxima contundencia. |
| 2 | **Piloto automático (ValueShowcase)** | Vitrina interactiva con un MacBook Pro 100% CSS que muestra un flujo de automatización sincronizado con el scroll. Reemplazó la antigua sección de "fugas de tiempo". |
| 3 | **Integraciones** | Marquee de **21** herramientas en **tres** filas alternas (izq. 46s, der. 54s, izq. 50s). |
| 4 | **Servicios** `#servicios` | Rejilla 3×2 + tarjeta de ancho completo "Software a la medida" (chatbots, gestión de pedidos, páginas web) |
| 5 | **Cómo funciona** `#como-funciona` | Cuatro pasos en eje vertical con línea que se dibuja con el scroll |
| 6 | **Reseñas** | Seis reseñas reales con foto e insignia de verificado |
| 7 | **Planes** `#planes` | Tres niveles sin precio cerrado + franja de garantía |
| 8 | **CTA final** `#contacto` | Argumento, CTA de agenda y formulario de contacto |
| 9 | **FAQ** `#faq` | Acordeón de 6 preguntas, **después** del formulario |

Fuera de `<main>`: navbar flotante, footer y botón flotante de WhatsApp (aparece tras 400px).

---

## 4. Decisiones importantes y qué se descartó

| Decisión | Qué se descartó y por qué |
|---|---|
| **Isotipo interactivo en el hero** (`InteractiveLogo`) | El lienzo de herramientas (`FlowCanvas`), que a su vez ya había descartado un grafo de nodos genérico —el mockup de Zapier/Make, que le habla a un técnico y no a un gerente— y "la bandeja de entrada". El hero pasó a hablar de marca y la metáfora del servicio bajó a la sección 2. Ver `DESIGN.md §13.1` |
| **MacBook en CSS puro (Sección 2)** | Se dibujó un portátil hiperrealista usando utilidades Tailwind en lugar de cargar una imagen pesada. Pesa 0 bytes, responde de forma nativa a los temas claro/oscuro y retiene más la atención mostrando un flujo real interconectado. |
| **Máscara de degradado (Glassmorphism global)** | Un desvanecimiento en la parte inferior del viewport (`layout.tsx`) usando `mask-image` y `backdrop-blur` en vez de un simple fondo opaco, logrando un efecto de vidrio esmerilado sin cortes secos. |
| **Mailchimp NO va en el lienzo** | Su marca es un mono y a 22px se lee como un emoji de carita. Se usa Stripe |
| **Cifras de tiempo sin gráfico** | Barras proporcionales y donut: dibujar una proporción afirma una precisión que no tenemos sobre cifras que son estimaciones |
| **"Cómo funciona" en eje vertical** | Cuatro tarjetas en fila se leen como opciones equivalentes; aquí el orden es obligatorio |
| **Séptimo servicio a ancho completo** | Un 3×3 deja huecos y lo convertiría en otro paquete cerrado, que es lo contrario de "a medida" |
| **Iconos de servicio en `paper-muted`** | En naranja serían seis acentos compitiendo con el CTA |
| **Sin sección de Cobertura ni Casos de uso** | Los 14 países valen para SEO, no para ocupar pantalla; los casos ilustrativos sobran teniendo reseñas reales |
| **Oscuro por defecto, sin leer el sistema** | La primera impresión de la marca es oscura para todo el mundo |
| **Grano monocromo con blur, no el original a color** | El original mezclaba ruido de color (R/G casi sin correlación) y bordes duros sin suavizar; se leía como artefacto de compresión, no como grano fotográfico |
| **Tokens `device-*` / `node-*` para el portátil** | Reusar los de marca: `bg-ink` en el bisel lo volvería crema en tema claro, y una pantalla apagada no es crema. Y en los nodos el color es información (distingue seis sistemas), no decoración |

⚠️ **Decisión revertida sin registrar — pendiente de resolver.** `DESIGN.md §11.4` midió y
decidió espaciar la malla a **48px sin tocar la opacidad**, con el argumento explícito de que
bajarla arriesga volver a la invisibilidad ya corregida una vez. El código hace hoy lo
contrario en los dos ejes: sigue a **32px** y `dot` bajó a **`.07`**, rozando el `.05` que se
había descartado por imperceptible. No se ha tocado porque cambiarlo altera la textura de toda
la página; hay que decidirlo mirando pantalla, y mover las dos palancas a la vez.

Autocrítica completa en `DESIGN.md §7`, §8 y §11.

---

## 5. Animaciones

| Pieza | Comportamiento |
|---|---|
| `<Reveal>` | Único componente de aparición: fade + 24px, .6s, una sola vez, `amount: .3`. Stagger de 70ms con `index` |
| `<Counter>` | **Hoy sin consumidor** (su sección se retiró). Se conserva como primitiva: renderiza el valor final en el primer render y solo baja a 0 al montar, fuera de pantalla; si arrancara en 0, el HTML estático diría "~0 h" |
| Barra de progreso | 2px arriba, naranja, ligada a `scrollYProgress` |
| Botones primarios | Magnético, máximo 6px |
| **Isotipo del hero** (`InteractiveLogo`) | El arco se dibuja con `pathLength` (Framer Motion, 1.8s) y luego entra el punto naranja con muelle. Paralaje 3D al ratón (±15°) y el punto se despega. `aria-hidden`. Geometría derivada de `R`: apertura de 58° centrada en -45° con el punto justo en medio. Ver `DESIGN.md §13.2` |
| Marquee | CSS infinito, se pausa en hover |
| **Flujo MacBook (ValueShowcase)** | Desplazamiento vertical sincronizado con `scrollYProgress` (Framer Motion). Cada nodo tiene microinteracciones hover y resplandor. |
| **Efecto Spotlight** | Un halo naranja que sigue el movimiento del cursor. Presente en **todos los servicios** (incluyendo el séptimo ancho) y en los **tres planes**. |
| **Toggle de tema** | Cambia `data-theme` en `<html>` y guarda en `localStorage`. `themeInitScript` (`src/lib/theme.ts`) lo aplica **antes de que React hidrate**; sin él la página parpadea. Transición de 0.28s solo en color/fondo — **no** en `transform` ni `opacity`, para no cortar animaciones de scroll en curso |

**`prefers-reduced-motion` se respeta siempre**: los componentes consultan `useReducedMotion()`
y hay una regla global en `globals.css` como red de seguridad.

---

## 6. Stack técnico

- **Next.js 14 App Router + TypeScript** con `output: 'export'` → `/out` con HTML/CSS/JS planos.
- **Tailwind** con todos los tokens en `tailwind.config.ts`.
- **Framer Motion** para lo ligado al scroll.
- **lucide-react** para iconografía.
- **Web3Forms** para el formulario (no hay backend). Clave en `NEXT_PUBLIC_WEB3FORMS_KEY`.
- **Google Tag Manager** opcional vía `NEXT_PUBLIC_GTM_ID`; si está vacío no carga nada.
- Alojamiento: **Hostinger**, Apache, hosting compartido.

---

## 7. Qué edita qué

| Archivo | Contenido |
|---|---|
| `src/content/site.ts` | **Dominio, email, WhatsApp, agenda, menú.** Fuente única |
| `src/content/services.ts` | Los 6 servicios + la tarjeta "Software a la medida" |
| `src/content/steps.ts` | Los 4 pasos de "Cómo funciona" |
| `src/content/integrations.ts` | Las 12 herramientas del marquee |
| `src/content/testimonials.ts` | Las 6 reseñas reales (fotos en `/public/testimonials`) |
| `src/content/plans.ts` | Los 3 planes + el texto de la garantía |
| `src/content/faq.ts` | Las 6 preguntas |
| `src/content/automation.ts` | Los 6 pasos que se ven dentro del portátil de la sección 2 |
| `src/content/countries.ts` | Los 14 países (SEO + `<select>`; ya no hay sección visible) |
| `src/content/recursos/*.mdx` | **Los artículos.** El nombre del archivo es la URL |
| `src/content/recursos/GUIA.md` | **Guía editorial.** Cómo escribir y publicar sin tocar código |
| `src/content/recursos.ts` | Copy del hub, etiquetas de categoría, ficha de autor y CTA |
| `src/content/sobre.ts` | Texto de `/sobre-nodbu` y el resumen de entidad para `llms.txt` |

### Archivos de código que conviene conocer

| Archivo | Qué resuelve |
|---|---|
| `src/lib/articles.ts` | Carga los `.mdx`, **valida el frontmatter y rompe el build si está mal**, calcula el tiempo de lectura y extrae el índice |
| `src/lib/seo.ts` | `absoluteUrl()`, `articlePath()` y los constructores del grafo JSON-LD |
| `src/lib/dates.ts` | Formato de fechas en UTC (si no, compilar en otro huso cambia el día) |
| `src/types/article.ts` | Tipos y la lista cerrada de categorías |
| `src/components/recursos/Mdx.tsx` | Compila el MDX. **El mapa de componentes es todo lo que un artículo puede usar** |
| `src/components/ui/Accordion.tsx` | Acordeón compartido por la FAQ de la landing y la de cada artículo |

`src/content/pains.ts` **ya no existe**: se borró junto con `PainStrip.tsx`.

---

## 8. Cambios futuros

```bash
npm run dev                      # desarrollo en localhost:3000
npm run typecheck && npm run build   # antes de dar nada por terminado
npx serve out                    # ver el build (file:// NO carga estilos)
```

Publicar: subir el **contenido** de `/out` a `public_html` (incluido el `.htaccess`), o hacer
push a `main` si está configurado el workflow de GitHub Actions. Pasos literales en
`DEPLOY.md`.

**Las variables `NEXT_PUBLIC_*` se incrustan en el build:** cambiar la clave de Web3Forms o el
GTM obliga a recompilar y volver a subir.

---

## 9. Lo que no se debe romper

1. **Export estático.** Nada de middleware, Server Actions, `next/og` dinámico, ISR ni
   `revalidate`. Route handlers solo `GET` y con `dynamic = 'force-static'`; toda ruta dinámica
   con `generateStaticParams` y `dynamicParams = false`.
2. **Ni un hexadecimal fuera de `tailwind.config.ts`.** Ni en componentes, ni en `globals.css`,
   ni en el MDX. Tampoco el modificador `dark:` ni la paleta por defecto de Tailwind.
3. **Los datos de contacto solo en `site.ts`.**
4. **El texto editable solo en `/src/content`.**
5. **Un `<h1>` por página, ni más ni menos.** En la landing es el del hero; en un artículo, su
   título; en el hub, el título de la sección. *(Antes esta regla decía "un solo `<h1>`" a secas,
   que valía cuando el sitio era una sola página.)*
6. **`prefers-reduced-motion` siempre.**
7. **Los tokens dependen del tema.** `text-ink` es casi negro en oscuro y crema en claro. Si
   escribes una clase de color, compruébala en los dos modos.
8. **`paper-faint` no baja de `.48`/`.58`.** Por debajo, los eyebrows dejan de cumplir AA.
9. **El formulario no filtra dominios de correo.** Gmail y Hotmail son clientes reales.
10. **`public_html/blog` se deja libre** por si algún día se instala WordPress ahí. Por eso la
    sección de artículos vive en `/recursos` y no en `/blog`.
11. **Todas las URL con barra final.** Canónicas, sitemap, RSS, `llms.txt` y enlaces internos
    usan la misma forma, nunca las dos. Las rutas salen de `site.routes`, `absoluteUrl()` o
    `articlePath()`; no se escriben a mano.

---

## 10. Registro de cambios estructurales

### 2026-08-05 — Reconciliación de código y documentación

Sesión sin cambios de apariencia ni de funcionalidad: solo se corrigió lo que estaba roto
respecto a las reglas del propio proyecto, y lo que la documentación afirmaba y el código no
hacía.

**Código**

- **`ValueShowcase.tsx` rompía la regla del hexadecimal.** Tenía 7 hex crudos, 2 `bg-black`,
  `ring-white/5`, seis colores de la paleta por defecto de Tailwind (`blue-400`,
  `emerald-400/500`, `violet-400`, `amber-400`, `cyan-400`), un `rgba(255,92,0,…)` a mano y
  cuatro modificadores `dark:` — el único archivo del proyecto que los usaba. Todo eso pasó a
  dos familias de tokens nuevas, `device-*` y `node-*`, declaradas en los dos temas.
  Los valores son idénticos uno a uno: se verificó en el CSS compilado. **Cero cambio visual**,
  salvo uno intencionado: el halo naranja del hover ahora sale del token, así que en tema claro
  usa `#C94300` en vez del naranja de marca, que ahí suspende AA.
- **El copy de los seis pasos salió del componente** a `src/content/automation.ts` (regla 4).
- **Código muerto retirado:** `FlowCanvas.tsx`, `PainStrip.tsx` y `content/pains.ts`, más las
  reglas `.flow-line` / `.flow-drift` y sus `@keyframes` en `globals.css`, que solo usaba
  `FlowCanvas`. Nada los importaba. `Counter.tsx` **se conserva** aunque hoy no lo use nadie:
  no es una sección retirada sino una primitiva, y su nota sobre el valor inicial documenta
  una trampa que se vuelve a pisar si se reescribe desde cero.
- **`ValueShowcase` importaba `SectionGlow` sin renderizarlo.** Import muerto, retirado. Los
  resplandores en pantalla siempre fueron tres, no cuatro: la regla se cumplía.
- **`InteractiveLogo`:** comentarios traducidos al español (era el único archivo en inglés),
  documentada su geometría y añadido `aria-hidden`, que es decorativo.

**Documentación**

- **`DESIGN.md §13`, nueva.** Documenta el hero y la sección 2 actuales, que no estaban en
  ningún sitio: la geometría del isotipo, por qué el portátil es CSS y no una imagen, y la
  excepción razonada de `device-*` / `node-*`. Las secciones §6 y §10 quedan marcadas como
  **histórico** (describen el lienzo retirado) pero se conservan: el razonamiento sigue valiendo.
- **`CLAUDE.md`:** la sección del lienzo se sustituyó por las del isotipo y el portátil, y se
  añadieron los comandos de comprobación de la regla 2 y la prohibición de `dark:`.
- **Datos corregidos:** el marquee son 21 herramientas en 3 filas (decía 12 en 2); `dot` está
  en `.07`/`.07` (decía `.12`/`.11`); el degradado del vidrio no era el documentado.

**Pendiente, no resuelto a propósito:** la malla de puntos (32px + `.07`) contradice la
decisión medida de `DESIGN.md §11.4` (48px + `.12`/`.11`). Cambiarlo altera la textura de toda
la página, así que es una decisión de diseño, no una corrección. Ver el aviso de la sección 4.

**Verificación:** `npm run typecheck` y `npm run build` limpios; los 8 archivos de `/out`
generados; las tres comprobaciones de la regla 2 salen vacías.

### 2026-08-05 — De landing a sitio con sección de artículos

La landing de una página pasó a ser un sitio de varias rutas con una sección de artículos en
`/recursos`, optimizada para buscadores con IA y para búsqueda tradicional.

**Rutas nuevas:** `/recursos/`, `/recursos/<slug>/`, `/sobre-nodbu/` y `/terminos/`. Ninguna
cuelga de `/blog`, que sigue libre (regla 10).

**Infraestructura de contenido**

- Artículos en MDX (`src/content/recursos/*.mdx`), cargados en el build. Sin CMS ni base de
  datos. Dependencias añadidas, solo cinco: `gray-matter`, `next-mdx-remote`, `remark-gfm`,
  `rehype-slug`, `rehype-autolink-headings`.
- **El frontmatter se valida y rompe el build** si falta un campo obligatorio, la fecha no
  existe en el calendario o la categoría no es una de las cuatro. El mensaje dice archivo y
  campo, y acumula todos los fallos del archivo en vez de uno por compilación.
- El slug sale del nombre del archivo; el tiempo de lectura se calcula; el índice lateral se
  extrae de los `h2`/`h3`.
- **Un `style=` en el cuerpo de un artículo rompe el build a propósito**: sería un color fuera
  de `tailwind.config.ts`.

**SEO y GEO**

- **Grafo JSON-LD unificado.** `#organization`, `#website` y `#diego` se definen una sola vez en
  el layout; cada página los referencia por `@id`. El `ProfessionalService` que había suelto es
  ahora un tipo más del nodo de organización. Verificado: cero `@id` duplicados en las once
  páginas.
- **Canónicas coherentes.** La portada declaraba `https://nodbu.com` mientras el sitemap escribía
  `https://nodbu.com/`. Ahora todas salen de `absoluteUrl()` y cada una coincide con su entrada
  del sitemap.
- `sitemap.xml` con las siete rutas fijas más una por artículo, con `lastModified` desde el
  `updatedAt` real. `robots.txt` permitiendo explícitamente los ocho rastreadores de IA.
- `rss.xml` y `llms.txt` como route handlers estáticos: se regeneran en cada build, así que no
  pueden quedarse desfasados. **`llms.txt` está en una ruta, no en `/public`**, por eso mismo.
- Estilos de prosa propios (`.prose-nodbu`), sin `@tailwindcss/typography`, cuyos colores por
  defecto romperían la regla 2.

**Navegación**

- Las anclas del menú pasaron a forma absoluta (`/#servicios`). Desde un artículo, un
  `#servicios` a secas no encontraba nada.
- Menú, rutas y enlaces legales modelados en `site.ts`; ningún componente compone rutas.
- Footer a cuatro columnas con los últimos artículos. *(Corregido el 2026-08-06: llevó los
  datos del titular en la barra inferior durante un tiempo; se retiraron por decisión del
  usuario. Siguen en `/sobre-nodbu`, en las legales y en el JSON-LD.)*

**Contenido**

Tres artículos de 1.225–1.365 palabras, con TL;DR, `h2` en pregunta, tabla y lista numerada,
FAQ de cinco preguntas y dos enlaces internos cada uno. Sin cifras inventadas y sin promesas de
resultados. La guía para escribir el siguiente está en `src/content/recursos/GUIA.md`.

**Verificado**

`typecheck` y `build` limpios; 16 rutas; 209 enlaces internos comprobados y 0 rotos; un `<h1>`
por página; las cuatro comprobaciones de la regla 2 vacías; contraste AA en los dos temas con
peor caso 4.59:1 (enlace en prosa, tema claro).

**Pendiente, no resuelto (en su momento — ver la entrada del 2026-08-06 para qué se resolvió)**

1. **`/terminos/` tiene dos huecos marcados con `.placeholder`**: forma y calendario de pago, y
   condiciones de cancelación. Son decisiones comerciales del titular y no se inventaron. La
   página ya está enlazada desde el pie de todas las rutas: conviene rellenarlos.
2. ~~Los tres artículos comparten fecha de publicación~~ → resuelto el 2026-08-06.
3. ~~No hay imágenes OG propias; la genérica pesa 352 KB~~ → comprimida el 2026-08-06 (sigue
   siendo la genérica, ver esa entrada).
4. ~~Las tarjetas del hub dependen de JavaScript~~ → mitigado el 2026-08-06 con una regla en
   `<noscript>`. Sigue habiendo casos sin cubrir, ver esa entrada.
5. Sigue abierta la decisión de la malla de puntos (32px + `.07`) del registro anterior.

### 2026-08-06 — El formulario no enviaba nada: diagnóstico y arreglo

Diagnóstico solicitado porque se sospechaba que el formulario de contacto no enviaba nada.
**La hipótesis de partida (la clave de Web3Forms ausente del workflow de GitHub Actions) no
era el problema**: el workflow ya la inyecta y la clave de `.env.local` es válida — se probó
en vivo contra `https://api.web3forms.com/submit` desde el navegador y respondió
`"success": true"`. El fallo real era otro, y no se veía leyendo el código: solo apareció al
mandar una petición real con acentos.

**El fallo: mojibake en los nombres de campo.** Web3Forms interpreta el *nombre* de cada campo
del `multipart/form-data` como Latin-1 en vez de UTF-8 — es un fallo de su servidor, no del
navegador. `form.append('País', ...)` llegaba al correo como `"PaÃ­s"`. Se comprobó por
separado que los *valores* con tilde (un nombre, una empresa) sí llegan correctos; solo las
claves fallan. Arreglo: los nombres de campo pasan a ASCII (`Pais`, `Proceso`) en
`src/lib/submit-lead.ts`; los valores siguen en español correcto.

**Lo que ya estaba bien y no hizo falta tocar:** `submitLead` ya comprobaba `response.ok` **y**
`result.success`; ya había honeypot, `subject` útil, `from_name`, tres estados con error visible
y accesibilidad completa (`aria-invalid`, `aria-describedby`, foco al primer error). La sospecha
inicial sobre estos puntos no se confirmó.

**Cambios de esta sesión:**

- **Consentimiento enviado y registrado.** Antes se validaba en el formulario pero no viajaba a
  Web3Forms: no quedaba prueba de que se había aceptado. Ahora `buildLeadFormData` manda
  `Consentimiento` (la declaración exacta) y `Fecha del envio` (ISO). El texto visible junto a
  la casilla se sacó del componente a `src/content/form.ts` (regla 4). *No es asesoría legal*,
  está anotado en el propio archivo.
- **`/gracias/` nueva.** El envío correcto ya no sustituye al formulario por un panel: navega
  (`router.push`) a una URL real, `noindex`, fuera de `sitemap.ts` y de `llms.txt`. Es lo que
  hace medible la conversión en GTM. El panel de éxito en línea se retiró (dejaba de tener
  sentido con la navegación).
- **Datos del titular fuera del pie de página**, a petición expresa: nombre, NIT y ciudad ya
  no se repiten en la barra inferior de cada página. Siguen en `/sobre-nodbu`, en las tres
  legales y en el JSON-LD — solo se quitó la repetición visual en cada pie.
- **Regla `<noscript>` para `<Reveal>`.** Sin JavaScript, los bloques que anima `<Reveal>` se
  quedan en `opacity:0` (su estado inicial antes de la animación) y el texto, aunque sigue en
  el HTML, no se ve. Se añadió un `<noscript><style>` en `layout.tsx` que los fuerza a su
  estado final — **solo se aplica sin scripting**, comprobado que con JS activo no cambia nada
  (los bloques aún no vistos siguen en `opacity:0`, que es el comportamiento normal). No pudo
  ir en `globals.css` a secas: no existe ningún selector CSS que distinga si el navegador
  ejecuta JavaScript, así que la única forma es el elemento `<noscript>` del propio HTML.
  **Se ciñó a lo pedido:** solo cubre `<Reveal>`. El Hero tiene su propia animación
  (`y: 20` en vez de `y: 24`) con el mismo problema, sin cubrir — queda anotado, no resuelto.
- **Artículos escalonados.** Los tres compartían `publishedAt`. Se separaron con criterio: el
  artículo pilar (`que-procesos-automatizar-pyme`, ya `featured`) pasó a ser el más antiguo
  (2026-07-30); `conectar-excel-crm-facturacion` al medio (2026-08-02); y
  `automatizar-whatsapp-pyme` se dejó en su fecha original (2026-08-05), la más reciente, para
  que sea el primero de la rejilla bajo el destacado — es el tema más concreto y de mayor
  intención de búsqueda de los tres.
- **`og.png`: 352 KB → 117 KB.** No había `pngquant`/`optipng` instalados; se probó `sharp`
  (instalado solo en un directorio de trabajo temporal, no como dependencia del proyecto).
  La recompresión sin pérdida real solo bajaba a 234 KB, por encima del objetivo. Se usó
  cuantización de paleta a `quality: 100`: **no es 100% idéntica a nivel de píxel** (diferencia
  máxima de 12/255 en las zonas de degradado y grano, invisible a la vista en la comparación
  directa), pero sí en formato, dimensiones (1200×630) y nombre de archivo, así que ningún otro
  sitio del código necesitó cambios.

**Corregido durante la propia verificación:** el texto de `consentRecord` en
`src/content/form.ts` tenía `nodbu.com` escrito a mano (violaba la regla 3). Se detectó con la
propia comprobación automática y se cambió a interpolar `site.domain`.

**Verificado, no solo revisado por lectura:**

- Envío real desde el sitio compilado y servido: la petición de red a
  `api.web3forms.com/submit` se registró en `performance.getEntriesByType('resource')` (516 ms),
  y una repetición directa con los mismos campos que produce el código actual devolvió
  `"success": true"` con `Pais` y `Proceso` sin mojibake y `Consentimiento`/`Fecha del envio`
  presentes.
- Tras el envío, la URL pasó a `/gracias/` y el `<h1>` cambió a "Recibimos tu mensaje".
- Las cuatro comprobaciones de la regla 2 y la de la regla 3, vacías.
- Once páginas recorridas en tema claro y en tema oscuro: **cero errores de consola** salvo
  los dos 404 esperados de la prueba de la página de error.
- `typecheck` y `build` limpios; 17 rutas (las 16 anteriores más `/gracias/`).

**Pendiente, no resuelto**

1. `/terminos/` sigue con los dos huecos de `.placeholder` (forma de pago, cancelación):
   decisiones comerciales del titular, fuera de alcance de esta sesión por instrucción expresa.
2. El Hero tiene su propia animación de entrada (no usa `<Reveal>`) con el mismo problema de
   `opacity:0` sin JavaScript, sin cubrir por la regla `<noscript>` — se dejó fuera a propósito
   porque el encargo pedía cubrir específicamente lo que deja `<Reveal>`.
3. `og.png` sigue siendo la imagen genérica, ahora más liviana pero compartida por las tres
   páginas de artículo. Las OG individuales por artículo, fuera de alcance de esta sesión por
   instrucción expresa.
4. Sigue abierta la decisión de la malla de puntos (32px + `.07`).
