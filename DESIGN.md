# DESIGN.md — NODBU

Plan de diseño de la landing comercial. Escrito antes del código y revisado con autocrítica
al final (sección 7). Si algo del código contradice este archivo, gana este archivo.

---

## 1. De dónde sale la identidad

El kit de marca ya resolvió el problema conceptual, así que no hay que inventar nada:

> La "O" funciona como nodo activo: una señal que entra, conecta y automatiza sin ruido visual.
> — `NODBU_FINAL_README.txt`

El logotipo es **un arco abierto con un punto naranja en la apertura**. Eso es literalmente un
diagrama de flujo de un solo nodo. La página entera se construye sobre esa geometría: el arco
abierto es la forma firma, y el punto naranja es el único acento de color.

Consecuencia práctica: **no dibujo iconografía de "automatización" genérica** (engranajes,
rayos, robots). La forma de la marca ya dice eso.

### Archivos del kit y su destino

| Kit | Destino | Uso |
|---|---|---|
| `logo_inverse_transparent.svg` | `public/brand/logo-full-white.svg` | Navbar y footer (fondo oscuro) |
| `logo_primary_transparent.svg` | `public/brand/logo-full.svg` | Reserva para fondo claro |
| `mark_transparent.svg` | `public/brand/isotipo.svg` | Isotipo suelto |
| `mark_inverse_black_bg.svg` | `public/brand/isotipo-dark-bg.svg` | Isotipo sobre negro |
| `lockup_transparent.svg` | `public/brand/lockup.svg` | Reserva (no se usa en la página) |
| `app_icon.svg` | `public/brand/app-icon.svg` | Base de los iconos PWA |
| `icon_16/32/48.png` | `public/favicon.ico` | ICO multi-tamaño generado |
| `icon_512.png` | `public/icon-512.png` | PWA |
| `app_icon.png` → 192 | `public/icon-192.png` | PWA |
| arco a sangre completa → 180 | `public/apple-touch-icon.png` | iOS |

**Decisión:** en navbar y footer va `logo-full-white.svg`, **no el lockup**. El lockup repite el
nodo dos veces (isotipo + la O del logotipo) y a 28px de alto sobre una barra de vidrio se lee
como suciedad. El logotipo solo ya lleva el nodo dentro de la O.

**Decisión:** el `favicon.ico` del kit traía un único tamaño de 16×16. Se regenera como ICO
multi-tamaño (16/32/48) usando los PNG nativos del kit, no reescalados.

---

## 2. Paleta final

La paleta del kit (`#FFFFFF`, `#090909`, `#FF5C00`) **coincide exactamente** con la del
encargo. No hay tonos adicionales que integrar y no se inventa ninguno.

| Token | Valor | Uso |
|---|---|---|
| `ink` | `#090909` | Fondo base |
| `ink-raised` | `#101010` | Superficies elevadas sólidas |
| `paper` | `#FFFFFF` | Texto principal |
| `paper-muted` | `rgba(255,255,255,.62)` | Texto secundario |
| `paper-faint` | `rgba(255,255,255,.38)` | Captions, terciario |
| `hairline` | `rgba(255,255,255,.10)` | Bordes de vidrio |
| `nodbu` | `#FF5C00` | Acento único |
| `nodbu-glow` | `rgba(255,92,0,.28)` | Halos y gradientes |

### Presupuesto de naranja (regla dura)

Hay que separar dos cosas que la paleta ya distingue pero esta tabla mezclaba:

- **`nodbu` (acento).** Lo que el visitante percibe como un elemento naranja: un botón, un
  borde, unas estrellas. Se cuenta y se raciona con la tabla de abajo.
- **`nodbu-glow` (ambiente).** Los resplandores de fondo al 8–14%. No son elementos, son luz.
  **No cuentan aquí**: tienen su propio presupuesto en el §4 (uno por sección, tres en la
  página, y cada uno tiene que anclar algo concreto).

Si el resplandor contase como acento, una sección con halo se quedaría sin poder poner un
botón — justo al revés de lo que interesa.

El naranja se gasta, no se decora. Por sección, **máximo dos elementos naranjas**:

| Sección | Gasto naranja |
|---|---|
| Navbar | 1 — el botón de WhatsApp |
| Hero | 2 — CTA primario + el pulso del lienzo |
| Dolor | 1 — los tres números |
| Integraciones | 0 |
| Servicios | 1 — el resplandor que sigue al cursor (solo la tarjeta activa) |
| Cómo funciona | 1 — la parte dibujada de la línea de progreso |
| Reseñas | 2 — estrellas + insignia de verificado |
| Planes | 2 — borde del plan central + su etiqueta |
| FAQ | 1 — el icono del panel abierto |
| CTA final | 1 — botón de envío (el resplandor es ambiente, no cuenta) |
| Footer | 0 |

Los iconos de servicio son **blancos al 62%**, no naranjas. Si fueran naranjas habría seis
acentos compitiendo en una sola pantalla y el CTA dejaría de destacar.

### Contraste (AA)

`#FF5C00` sobre `#090909` da ~4.9:1 → cumple AA para texto normal, pero por seguridad el
naranja como texto solo se usa a partir de 16px o en peso 500+. El texto sobre botón naranja
sólido es `#090909` (ratio ~4.9:1, y en 15px semibold cumple AA de texto grande/negrita).
`paper-faint` (.38) **nunca** se usa para información, solo para decoración no esencial.

---

## 3. Tipografía

Tres roles, tres archivos, cero peticiones en tiempo de ejecución. Todo `.woff2` local en
`/public/fonts` cargado con `next/font/local` y `display: swap`.

| Rol | Familia | Pesos | Archivo | Peso |
|---|---|---|---|---|
| Display | Clash Display | 500, 600 | `ClashDisplay-{Medium,Semibold}.woff2` | 30 KB |
| Cuerpo | Satoshi | 400, 500 | `Satoshi-{Regular,Medium}.woff2` | 51 KB |
| Utilitaria | JetBrains Mono | 400–500 (variable) | `JetBrainsMono-Variable.woff2` | 31 KB |

**Total: 112 KB.** JetBrains Mono va como fuente variable del subset latino de Google
(31 KB) en lugar de los dos estáticos completos del repositorio oficial (186 KB). Se verificó
que el subset cubre `áéíóúüñÁÉÍÓÚÜÑ¿¡`. Ahorro de 155 KB en una fuente que solo pinta
etiquetas de 11px.

### Escala fluida

| Token | `clamp()` | Uso |
|---|---|---|
| `display-xl` | `clamp(2.75rem, 7vw, 5.5rem)` / lh .98 / ls -.03em | H1 del hero |
| `display-l` | `clamp(2rem, 4.4vw, 3.25rem)` / lh 1.04 / ls -.025em | H2 de sección |
| `display-m` | `clamp(1.5rem, 2.6vw, 2rem)` / lh 1.1 / ls -.02em | H3, planes |
| `body-l` | `clamp(1.0625rem, 1.4vw, 1.25rem)` / lh 1.6 | Subtítulo del hero |
| `body` | `1rem` / lh 1.65 | Párrafos |
| `body-s` | `.9375rem` / lh 1.55 | Texto de tarjeta |
| `mono` | `.6875rem` (11px) / ls .16em / uppercase | Eyebrows, etiquetas |
| `mono-l` | `.75rem` (12px) / ls .16em / uppercase | Métricas, numeración |

---

## 4. El fondo (sin esto el vidrio no existe)

`backdrop-filter` sobre un fondo plano produce gris plano. El fondo tiene dos mitades con
responsabilidades distintas:

```
FIJA AL VIEWPORT (<Background />)          ANCLADA AL CONTENIDO (<SectionGlow />)
┌─ viñeta radial, esquinas ───────┐        hero      → detrás del lienzo de flujo
│ ┌─ grano monocromo, 4.5% ──────┐│        planes    → detrás del plan destacado
│ │ ┌─ malla de puntos 1px/48px ┐││        contacto  → detrás del formulario
│ │ │                           │││
│ │ └───────────────────────────┘││
│ └───────────────────────────────┘│      máx. 1 por sección · máx. 3 en la página
└─────────────────────────────────┘
   textura uniforme, no ilumina nada       cada uno ilumina algo concreto
```

Detalle de cada capa (por qué es así, no solo qué valor tiene) en `§11`.

**Por qué está partido así.** Al principio los tres resplandores vivían dentro de
`<Background />`, que es `position: fixed`. El comentario decía que iban "detrás del hero, de
servicios y del CTA final", pero eso era falso: al estar fijos al viewport se quedaban quietos
mientras el contenido pasaba por delante, así que no acompañaban a nada. De ahí la sensación
de que el naranja estaba puesto a ojo.

Ahora cada resplandor vive **dentro de la sección que ilumina** y se mueve con ella. La
textura (puntos, grano y viñeta) sí sigue fija: es uniforme, no ilumina nada concreto, y
mantenerla fija evita que el coste de pintado dependa de lo larga que sea la página.

### Reglas de los resplandores

| Regla | Motivo |
|---|---|
| Máximo **1 por sección** y **3 en toda la página** | Más de eso y dejan de destacar nada |
| Cada uno **ancla un elemento concreto** | Si no ilumina nada, sobra |
| Opacidad **8–14%**, nunca más | Es luz ambiente, no un elemento |
| Nunca dos solapándose | Un cruce genera una zona más brillante sin querer |
| Siempre con máscara en los bordes | Ver más abajo |

### Los bordes duros y por qué aparecían

Dos artefactos distintos, con dos causas distintas:

1. **Corte vertical en los laterales.** La textura y los halos terminaban en seco contra el
   borde del viewport. Se arregla con `.edge-mask`, una máscara horizontal
   (`transparent → opaco 7% … 93% → transparent`) que se aplica a las cuatro capas.

2. **Corte horizontal bajo el hero.** Este era más sutil. Un `radial-gradient` sin palabra
   clave de tamaño se mide **hasta la esquina más lejana**, así que en una caja apaisada
   todavía le queda brillo al llegar al borde superior e inferior. Cuando la sección lo
   recortaba con su `overflow-hidden`, aparecía una línea horizontal. Se midió: el halo del
   hero se cortaba al **0,76 de su radio**, con el degradado aún al 30% de su intensidad.
   Se arregla usando `ellipse closest-side`, que hace que el degradado llegue a cero
   exactamente en los cuatro bordes de su caja.

Medido sobre el render final, el salto de brillo máximo en los bordes es de **0,56/255 a
1920px** y **3,11/255 a 360px**. Un corte duro daría saltos de decenas.

**Presupuesto de blur:** máximo **3 capas con `backdrop-filter` visibles a la vez**. La navbar
cuenta como una permanente, así que en la práctica quedan 2 para el contenido. Las tarjetas de
las rejillas (servicios, reseñas, planes) usan un **vidrio falso** — el mismo gradiente y borde
pero **sin `backdrop-filter`** — porque son 6 a la vez y en un móvil de gama baja seis
`backdrop-filter` animados tiran los FPS al suelo. El vidrio real se reserva para navbar, botón
flotante y menú móvil, que son pocos y están sobre contenido en movimiento.

---

## 5. Layout y wireframes

Contenedor: `max-width: 1200px`, padding lateral `clamp(20px, 5vw, 40px)`.
Rejilla mental de 12 columnas; el hero rompe la simetría a propósito (7/5).

```
╔══════════════════════════════════════════════════════════════════╗
║ ▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░  barra de progreso naranja 2px      ║
║  ╭──────────────────────────────────────────────────────────╮    ║
║  │ [NODBU]    servicios  cómo  casos  planes   [WhatsApp ▸] │ ← vidrio flotante
║  ╰──────────────────────────────────────────────────────────╯    ║
╚══════════════════════════════════════════════════════════════════╝

HERO — asimétrico 7/5, el lienzo sangra a la derecha
┌────────────────────────────────┬─────────────────────────────────┐
│ AUTOMATIZACIÓN PARA PYMES      │                                 │
│                                │      ╭───╮      ╭───╮          │
│ El trabajo que                 │      │   │──╮   │   │          │
│ nadie debería                  │      ╰───╯  ╰──▶ ◜◝ ─────▶ ╭─╮ │
│ estar haciendo                 │      ╭───╮  ╭──▶(  ●)      │ │ │
│ a mano.                        │      │   │──╯   ◟◞  ╲      ╰─╯ │
│                                │      ╰───╯            ╲        │
│ Conectamos las herramientas    │      ╭───╮             ╲  ╭─╮  │
│ que ya usas...                 │      │   │──────────────▶ │ │  │
│                                │      ╰───╯                ╰─╯  │
│ [Hablar por WhatsApp] [Dejar…] │   dispersión ──▶ nodo ──▶ orden │
└────────────────────────────────┴─────────────────────────────────┘

DOLOR — tres cifras, sin tarjeta, separadas por hairline
┌──────────────┬──────────────┬──────────────┐
│  ~12 h       │  ~1 de 4     │  ~40 min     │
│  a la semana │  duplicados  │  de respuesta│
└──────────────┴──────────────┴──────────────┘

INTEGRACIONES — dos filas opuestas, máscara en los bordes
   ◀── ░▒▓ logo logo logo logo logo logo ▓▒░ ──
   ── ░▒▓ logo logo logo logo logo logo ▓▒░ ──▶

SERVICIOS — 3×2, vidrio, resplandor que sigue al cursor
┌────────┬────────┬────────┐
│ ▫ tít  │ ▫ tít  │ ▫ tít  │
│ frase  │ frase  │ frase  │
├────────┼────────┼────────┤
│ ▫ tít  │ ▫ tít  │ ▫ tít  │
└────────┴────────┴────────┘

CÓMO FUNCIONA — línea que se dibuja con el scroll (no 4 tarjetas en fila)
   │01│  Diagnóstico gratuito
   ┃      ────────────────────
   ┃ │02│  Diseño del flujo
   ┃      ────────────────────
   ╹ │03│  Implementación
     │04│  Soporte y mejora
   ↑ la parte naranja crece con scrollYProgress

RESEÑAS 3×2 (foto + insignia) · PLANES 3 (central destacado)

CTA FINAL — resplandor naranja, formulario a 6 columnas
┌───────────────────────┬───────────────────────┐
│ Cuéntanos qué proceso │ [nombre] [email]      │
│ te quita más tiempo   │ [empresa][país ▾]     │
│                       │ [textarea          ]  │
│                       │ ☐ acepto la política  │
│                       │ [Enviar mis datos]    │
└───────────────────────┴───────────────────────┘

FAQ — acordeón, DESPUÉS del formulario (ver §8.8)

FOOTER · botón flotante de WhatsApp abajo-derecha
```

### Puntos de ruptura

| Ancho | Comportamiento |
|---|---|
| 360 | 1 columna. Lienzo del hero **oculto** (`display:none`, no solo escalado). Menú a pantalla completa. Chips de país en 2 columnas. |
| 768 | Servicios y reseñas a 2 columnas. Planes apilados. Lienzo visible a 60% de alto. |
| 1280 | Rejilla completa 3×2. Hero 7/5. |
| 1920 | El contenedor tope a 1200px; los resplandores sí escalan con el viewport para que no queden islas de negro. |

---

## 6. Elemento firma: **el nodo que ordena**

> **Histórico — el lienzo ya no está en la página.** `FlowCanvas.tsx` se retiró y el hero lo
> sustituyó por el isotipo interactivo (`InteractiveLogo.tsx`). Esta sección y la §10 se
> conservan porque el razonamiento sigue valiendo: explica por qué se descartó el grafo
> genérico tipo Zapier y por qué las entradas eran marcas reales, y esa metáfora **no se
> perdió**, se mudó a la sección 2 (el portátil). Lo que hay hoy en el hero está en **§13**.

El encargo propone un lienzo de nodos conectados por bezier con un pulso naranja. Lo mantengo
en técnica (SVG animado, sin librerías) pero **le cambio el argumento**, porque "cajas
conectadas por curvas" es exactamente la pantalla de producto de Zapier, Make y n8n. Si un
visitante ya vio esas herramientas, mi hero le dice "software de diagramas", no "NODBU".

La versión de NODBU tiene una dirección de lectura y una tesis:

```
   izquierda: desorden          centro: el nodo          derecha: orden
   ╭───╮ ╭───╮                        ◜◝                    ╭───╮
   │   │ │   │  ╲   ╱                (  ● )                 │   │
   ╰───╯ ╰───╯   ╲ ╱   ────────▶      ◟◞     ────────▶      ╰───╯
   ╭───╮ ╭───╮    ╳                (arco del logo)          ╭───╮
   │   │ │   │   ╱ ╲                                        ╰───╯
   ╰───╯ ╰───╯  ╱   ╱
   6 herramientas,               una sola señal          dos salidas limpias
   líneas cruzadas y tenues      entra por la apertura   paralelas y espaciadas
```

Tres decisiones que lo hacen de NODBU y no de cualquiera:

1. **El nodo central es el arco del logo, a escala de página.** Misma geometría exacta que
   `mark_transparent.svg` (arco de 271.36 de radio, `stroke-linecap: round`, apertura arriba a
   la derecha con el punto naranja). No es un rectángulo redondeado con un icono dentro.
2. **La apertura del arco es funcional.** La señal entra por el borde izquierdo del anillo, lo
   recorre, y **sale por el hueco** — que es justo donde el logo pone el punto naranja. El logo
   dejó esa apertura abierta por una razón; aquí es por donde sale el flujo ya ordenado.
   (Se probaron las dos direcciones: con las entradas atravesando el hueco, las curvas tenían
   que rodear el anillo por arriba y el dibujo perdía la lectura izquierda-derecha.)
3. **Hay un antes y un después dentro del propio dibujo.** Izquierda: seis nodos pequeños,
   desalineados a propósito, con líneas que se cruzan al 18% de opacidad. Derecha: dos nodos
   alineados en una retícula, líneas paralelas al 45%. La composición argumenta la venta sin
   una sola palabra.

**Animación:** las curvas se dibujan con `stroke-dasharray` en 900ms escalonados de izquierda a
derecha, y cada 4,5s un pulso naranja recorre entrada → arco → salida. El titular **no espera
al lienzo**: el `<h1>` entra a los 0ms, el lienzo empieza a los 150ms. Con
`prefers-reduced-motion` el lienzo se pinta en su estado final sin animar y el pulso no existe.

---

## 7. Autocrítica

Repaso honesto del plan de arriba buscando lo que produciría para cualquier SaaS. Cinco cosas
que no pasaron el corte, y qué hice con ellas.

### 7.1 El lienzo del hero era el hero de Zapier

**Qué falla:** "nodos de vidrio conectados por curvas bezier con un pulso de luz" es el
mockup literal de Make, n8n y Zapier. Bonito y absolutamente intercambiable. Además le habla a
un técnico, y la audiencia declarada **no es técnica**: a un gerente de operaciones un grafo de
nodos no le dice nada.

**Qué cambié:** lo reescribí como **desorden → nodo → orden** (sección 6), con el arco del logo
como pieza central y una dirección de lectura izquierda-derecha. Ahora el dibujo tiene una
tesis legible sin saber qué es un nodo, y la forma protagonista es propiedad de la marca.

### 7.2 La franja de dolor iba a ser tres contadores enormes

**Qué falla:** "87%" · "3.2x" · "+150" en Clash Display a 72px es el patrón de métricas de
cualquier landing, y en un negocio sin clientes publicables esos números **no existen**. El
encargo prohíbe inventar estadísticas con fuente, y un número gigante sin fuente igualmente
finge autoridad.

**Qué cambié:** las cifras se presentan como **rango explícito con tilde** (`~12 h`) y cada una
lleva debajo, en mono, la etiqueta `ESTIMACIÓN ILUSTRATIVA`. El número baja de 72px a
`display-m` y el peso visual se lo lleva la frase, no el dígito. Un rango honesto en un negocio
de eficiencia es más creíble que un porcentaje redondo inventado.

### 7.3 Seis tarjetas de vidrio idénticas con icono arriba a la izquierda

**Qué falla:** es la rejilla de features por defecto de todo Tailwind template desde 2021.

**Qué cambié:** dos cosas concretas. (a) Cada tarjeta lleva en la esquina superior derecha su
**índice en mono** (`01`–`06`), lo que las convierte en un inventario numerado, coherente con la
tipografía de sistema del resto de la página. (b) La frase de resultado va **separada por una
hairline** y arranca con un verbo en pasado del cliente ("Dejas de…", "Se acabó…"), no con un
sustantivo abstracto. La forma es común; el contenido y el detalle mono la anclan a esta marca.

### 7.4 Iba a poner los iconos de servicio en naranja

**Qué falla:** seis iconos naranjas en una pantalla + el CTA naranja + el botón flotante
naranja = nueve acentos. El acento deja de acentuar y la disciplina de la sección 3 se rompe en
la primera sección de contenido.

**Qué cambié:** iconos en `paper-muted`. El naranja de la sección de servicios es **uno solo**:
el resplandor que sigue al cursor, y solo en la tarjeta bajo el puntero. Ver la tabla de
presupuesto en la sección 2.

### 7.5 "Cómo funciona" como cuatro tarjetas en fila

**Qué falla:** cuatro tarjetas horizontales con un número dentro de un círculo. Es la sección
"How it works" genérica, y además **desperdicia la información**: cuatro pasos en fila se leen
como cuatro opciones equivalentes, no como una secuencia con orden obligatorio.

**Qué cambié:** eje **vertical** con una línea que se dibuja según `scrollYProgress`. El paso
solo aparece cuando la línea lo alcanza, así que el usuario **no puede leer el paso 3 antes que
el 2**: el scroll impone la secuencia. La numeración codifica información real, como pedía el
encargo.

### 7.6 Lo que decidí no cambiar

- **El marquee de integraciones** es un patrón gastado, pero es el correcto: comunica "esto ya
  funciona con lo tuyo" en una ojeada y el título está fijado por el encargo. Lo diferencio con
  monocromo estricto al 55% y sin tarjetas alrededor de cada logo.
- **El acordeón de FAQ** no necesita reinventarse. Una FAQ rara es una FAQ peor.

---

## 8. Segunda ronda de ajustes

Decisiones tomadas después de la primera entrega. Lo de arriba sigue vigente salvo donde esta
sección diga lo contrario.

### 8.1 "Dónde se va el tiempo": de tres frases a mini-infografía

La versión original eran tres celdas con un número y una frase. Cumplía, pero no argumentaba:
tres cifras sueltas no le dicen a un gerente de operaciones *dónde* está su fuga.

Se estudiaron tres variantes:

**Variante A — cuatro tarjetas de categoría (elegida)**

```
DÓNDE SE VA EL TIEMPO
Cuatro fugas que casi nadie mide

┌────────────┬────────────┬────────────┬────────────┐
│ ⌨          │ ☎          │ ▤          │ ✉          │
│ CAPTURA…   │ SEGUIMIEN… │ REPORTES   │ COORDINAC… │
│            │            │            │            │
│  ~6 h      │  1 de 4    │  ~5 h      │  ~40 min   │
│  frase     │  frase     │  frase     │  frase     │
│  · est.    │  · est.    │  · est.    │  · est.    │
└────────────┴────────────┴────────────┴────────────┘
```

**Variante B — barras proporcionales**

```
Captura manual    ████████████░░░░░░  ~6 h
Seguimiento       ████████░░░░░░░░░░  ~4 h
Reportes          ██████░░░░░░░░░░░░  ~3 h
Coordinación      ████░░░░░░░░░░░░░░  ~2 h
```

**Variante C — reloj / donut segmentado** con las cuatro fugas como porciones de una semana.

**Se eligió A.** Razón: las variantes B y C **dibujan proporciones**, y proporcionar
visualmente unas cifras que están declaradas como estimaciones ilustrativas es precisamente el
tipo de falsa precisión que el encargo prohíbe. Una barra al 66% afirma algo mucho más
concreto que un "~6 h" con su etiqueta de estimación al lado. La C además habría necesitado un
segundo lenguaje gráfico (circular) que no aparece en ninguna otra parte de la página.

La A da el peso visual que faltaba mediante **estructura** (categoría nombrada + icono +
cifra + frase), no mediante gráficos inventados.

Ajustes dentro de la variante A:

- **El icono es lo que convierte la lista en infografía.** Va en `paper-muted`, como los de
  servicios: si fueran naranjas serían cuatro acentos peleando con el CTA.
- **La categoría va en mono**, encima de la cifra: es la etiqueta del sistema, y engancha con
  el resto de eyebrows.
- **El gasto de naranja sigue siendo uno solo:** el conjunto de las cuatro cifras. Igual que
  antes contaba como uno el conjunto de tres. Ver la tabla del §2.
- Animación: `Reveal` escalonado + `Counter`. **Nada más** — ni parallax ni barras animadas.

### 8.2 Séptimo servicio: "Software a la medida"

Las dos opciones eran ampliar a 3×3 con una séptima tarjeta igual, o destacarla a ancho
completo al final del grid.

**Se eligió la tarjeta de ancho completo**, por dos razones:

1. **Un 3×3 con la última fila coja** (7 tarjetas en una rejilla de 9 huecos) deja dos huecos
   vacíos en escritorio. Feo y sin arreglo elegante.
2. **Más importante: no es un servicio del mismo tipo.** Los otros seis son procesos
   reconocibles que el cliente ya sufre ("cotizaciones", "onboarding"). Este es la respuesta a
   *"¿y si lo mío no encaja en ninguno?"*. Ponerlo como séptima tarjeta idéntica lo convertiría
   en un paquete cerrado más, que es justo lo contrario de lo que significa "a medida". A ancho
   completo y con tratamiento distinto, se lee como lo que es: la salida cuando los seis
   anteriores no aplican.

```
┌────────┬────────┬────────┐
│ 01     │ 02     │ 03     │
├────────┼────────┼────────┤
│ 04     │ 05     │ 06     │
├────────┴────────┴────────┤
│ ▣  07 · A MEDIDA         │  ← ancho completo, borde naranja tenue,
│    Software a la medida  │     dos columnas de texto, sin spotlight
└──────────────────────────┘
```

Diferencias de tratamiento respecto a las seis: borde `nodbu/30` en vez de `hairline`, sin el
resplandor que sigue al cursor (ya se distingue por posición y borde: añadirlo sería apilar
efectos), y el índice en mono como `07 · A MEDIDA`.

Esto gasta el segundo naranja de la sección de servicios. La tabla del §2 queda: servicios = 2
(resplandor del cursor + borde de la tarjeta a medida).

### 8.3 Garantía de satisfacción

Va **dentro de la sección de Planes**, debajo de las tres tarjetas: es el último punto de duda
antes de decidir, y ahí es donde el visitante compara precio contra riesgo.

Se implementa como una franja estrecha con icono de escudo, no como una cuarta tarjeta: no es
un plan y no debe leerse como tal. Sin naranja (la sección ya gasta sus dos en el plan
destacado y su etiqueta); el icono va en `paper-muted`.

### 8.4 CTA de agenda

"Agenda tu demo ahora" aparece **exactamente dos veces**: como CTA secundario del hero
(sustituyendo a "Dejar mis datos", para no meter tres botones) y en una caja propia justo
encima del formulario final, que en móvil cae inmediatamente antes de los campos.

El destino sale de `site.scheduling`. Si está vacío, el enlace **no muere**: cae a WhatsApp con
un mensaje pidiendo hora.

### 8.5 Fotos reales en las reseñas

Las iniciales sobre naranja tenue se sustituyen por fotografías reales, recortadas en círculo.
El fondo naranja del avatar desaparece, así que el gasto de naranja de la sección de reseñas
pasa a ser: estrellas + insignia de verificado. Sigue siendo dos.

La insignia es un círculo naranja con un check blanco dentro, colocado sobre el borde de la
foto. **No replica el check azul de ninguna red social**: es circular, naranja de marca, y
lleva `aria-label="Cliente verificado"`.

### 8.6 Reubicación de los tres resplandores

Qué cambió en cada uno, exactamente:

| Resplandor | Antes | Ahora | Qué ancla |
|---|---|---|---|
| **1 · Hero** | `fixed`, arriba-derecha del **viewport**, 70vh × 70vw, sangrando −15vw/−20vh | `absolute` dentro del hero, `top-0`, centro al **68% del ancho**, 78vh × 62vw (130vw en móvil) | El lienzo de flujo. Desviación medida: **67px** sobre una elipse de 1190px |
| **2 · Planes** *(antes "servicios")* | `fixed`, izquierda del viewport a `top-[85vh]`, 60vh × 65vw | `absolute` en Planes, centrado, `top-[42%]`, 58vh × 68vw | El plan destacado. Desviación: **0px** |
| **3 · CTA final** | `absolute` centrado en la sección, 80vh × **110vw** | `absolute`, centro al **62%** en escritorio, 72vh × 78vw | El formulario. Desviación: **17px** |

Además, en los tres:

- **Intensidad sin tocar.** Siguen en 14% (hero y CTA) y 8% (planes), como manda el §2.
- **Se eliminó el solapamiento.** Los antiguos 2 y 3 estaban ambos fijos al viewport y en la
  mitad inferior, así que al hacer scroll se cruzaban y generaban una zona más brillante sin
  intención. Ahora están a ~2.500px de distancia en el documento y no coinciden nunca.
- **El de 110vw era el peor infractor:** al ser más ancho que la pantalla, se cortaba en seco
  contra los dos bordes. Ahora mide 78vw en escritorio y lleva máscara.
- **Se fue el parallax.** Ya no hace falta simular profundidad moviendo un halo fijo: los
  resplandores se desplazan con su sección, que es un movimiento real y con sentido. Un efecto
  menos que mantener.

### 8.7 Chatbots, pedidos y páginas web

Van dentro de la tarjeta **"Software a la medida"**, que es donde el encargo los sugería, y
coincido: los seis servicios del grid son *"conectamos lo que ya tienes"*, y estos tres son
*"te lo construimos"*. Son la misma categoría que la tarjeta ya representaba, solo que ahora
con nombre propio en vez de implícitos.

Se descartó ponerlos como tres tarjetas más del grid: convertiría un 3×2 limpio en un 3×3 con
huecos, mezclaría dos promesas distintas en la misma rejilla, y dejaría "Páginas web" leyéndose
como par de "Sincronización entre sistemas", que no lo es.

Lo que sí cambió dentro de la tarjeta: los tres apoyos abstractos que tenía (panel interno,
calculadora de precios, portal de clientes) se sustituyen por los tres con nombre y un
resultado concreto cada uno. El nombre va en `paper` y el resultado en `paper-muted`, de modo
que se puede leer solo la columna de nombres y ya se entiende la oferta.

También se añadieron al `serviceType` del JSON-LD y a las keywords: son tres cosas que la gente
busca por su nombre y que antes no aparecían en ningún sitio del marcado.

### 8.8 Poda de secciones y reorden

La página pasó de **11 secciones a 9**, y el FAQ cambió de sitio.

| Cambio | Motivo |
|---|---|
| **Fuera "Casos de uso"** | Eran escenarios ilustrativos con la etiqueta de "esto no es un cliente real". Con seis reseñas reales, con nombre, cargo, ciudad y foto, la prueba social ya está cubierta por algo que sí ocurrió. `cases.ts` se borró con ella: no quedan archivos de contenido huérfanos |
| **Fuera "Cobertura"** | Catorce chips de país ocupaban una pantalla entera para decir algo que el visitante ya da por hecho al leer un sitio en español. **Los datos no se han perdido**: los 14 países siguen en las *keywords*, en el `areaServed` del JSON-LD y en el `<select>` del formulario, que es donde de verdad trabajaban |
| **El FAQ baja detrás del formulario** | Estaba obligando a pasar por encima de seis objeciones para llegar a los campos. Quien ya se decidió llega antes; quien duda encuentra las respuestas justo debajo |

El navbar pierde el enlace "Casos" (la sección ya no existe, el ancla habría quedado rota).
No había enlace a Cobertura. Quedan cuatro: Servicios, Cómo funciona, Planes y Preguntas —
y `#faq` sigue siendo la última del menú y la última de la página, que es coherente.

### 8.9 Aire entre secciones

El espaciado estaba centralizado en un único token, así que se ajustó ahí y no sección a
sección:

```
antes  section: clamp(72px, 10vw, 140px)   → huecos de 144px a 280px
ahora  section: clamp(48px,  7vw,  96px)   → huecos de  96px a 192px
```

Ojo al leerlo: entre dos secciones seguidas el hueco es el **doble** del token, porque suma el
`padding-bottom` de una con el `padding-top` de la siguiente. Es el error fácil al tocar esto.

| Ancho | Hueco antes | Hueco ahora |
|---|---|---|
| 360px | 144px | **96px** |
| 1280px | 256px | **179px** |
| 1920px | 280px | **192px** |

El `padding-top` del hero baja aparte, de 128/160/176 a **112/128/144**: no es decorativo,
tiene que despejar la navbar flotante (~76px) y dejar aire.

No se bajó más porque el vidrio necesita margen para leerse como vidrio: si las tarjetas de dos
secciones distintas casi se tocan, el ojo deja de separar bloques y el fondo con resplandor
pierde el sitio donde respirar. 96px en móvil es el suelo cómodo.

Efecto combinado con la poda: la página pasa de ~10.600px a **9.253px** de alto a 1920px, con
dos secciones menos y sin que nada quede apretado.

## 9. Modo claro

El modo oscuro sigue siendo el **predeterminado**: la página arranca siempre en oscuro y no se
lee la preferencia del sistema. El claro es una elección explícita del visitante, que se
recuerda en `localStorage`.

### 9.1 Paleta clara (no es invertir la oscura)

| Token | Oscuro | Claro | Por qué no es la inversión literal |
|---|---|---|---|
| `ink` (fondo) | `#090909` | **`#FAF9F7`** | Blanco cálido, **no** `#FFFFFF`. Sobre blanco puro una tarjeta de vidrio blanca translúcida es invisible: hace falta que el fondo sea un punto más oscuro que la tarjeta |
| `ink-raised` | `#101010` | **`#FFFFFF`** | La superficie elevada siempre es *más clara* que el fondo. En oscuro sube de 09 a 10; en claro sube de FAF9F7 a blanco |
| `paper` (texto) | `#FFFFFF` | **`#0D0D0D`** | Casi negro, no negro puro: `#000` sobre crema vibra |
| `paper-muted` | `rgba(255,255,255,.62)` | **`rgba(13,13,13,.68)`** | Más alfa que en oscuro. El texto oscuro sobre claro se lava antes: a .62 baja a 5.38:1 y a .68 queda en 6.66:1, más cerca del 7.80:1 del modo oscuro |
| `paper-faint` | `rgba(255,255,255,.38)` | **`rgba(13,13,13,.50)`** | A .38 daría **2.51:1 y suspendería** incluso el umbral de texto grande. A .50 sube a 3.60:1 |
| `hairline` | `rgba(255,255,255,.10)` | **`rgba(13,13,13,.12)`** | Un borde oscuro sobre claro se percibe más débil que uno claro sobre oscuro |
| `dot` (malla) | `rgba(255,255,255,.05)` | **`rgba(13,13,13,.07)`** | Puntos blancos sobre crema no existen: la malla se invierte |
| `nodbu` | `#FF5C00` | **`#C94300`** | Ver abajo. Es el cambio importante |
| `nodbu-glow` | `rgba(255,92,0,.28)` | **`rgba(201,67,0,.30)`** | El halo tiene menos margen para destacar sobre claro |

### 9.2 El naranja de marca no pasa AA sobre fondo claro

Medido, no estimado:

| Naranja | sobre `#090909` | sobre `#FAF9F7` | sobre tarjeta `#FFFFFF` |
|---|---|---|---|
| `#FF5C00` (marca) | **6.43:1** ✅ | **2.94:1** ❌ | 3.10:1 ❌ |
| `#E85200` | — | 3.54:1 ❌ | 3.72:1 ❌ |
| `#D94A00` | — | 4.05:1 ❌ | 4.26:1 ❌ |
| **`#C94300`** | — | **4.66:1** ✅ | **4.90:1** ✅ |

`#FF5C00` sobre crema da **2.94:1**: no llega ni al 3.0 que exige el texto grande. Los
contadores de "Dónde se va el tiempo", la numeración de los pasos, los mensajes de error del
formulario y el icono del FAQ abierto son todos `text-nodbu`; dejarlos en el naranja de marca
haría el modo claro inaccesible.

**Decisión: en modo claro el token `nodbu` vale `#C94300`.** Es el mismo tono, más profundo.
No se añade un token nuevo ni se tocan los componentes: el valor viaja por variable CSS, así
que `bg-nodbu`, `text-nodbu` y `fill-nodbu` siguen escribiéndose igual y cada modo resuelve
al color que le corresponde.

**Excepción: el punto naranja del logotipo no cambia.** Vive dentro del SVG del kit y es la
marca; se queda en `#FF5C00` en los dos modos. Es un punto de 15px de radio, no texto.

**Ojo con `text-ink`, que también sigue al tema.** El botón primario es
`bg-nodbu text-ink`: en oscuro son letras casi negras sobre naranja vivo, y en claro se
invierte solo a letras crema sobre naranja profundo. Medido en el navegador: **4.66:1**,
cumple AA. No hay que tocar la clase; el token hace el trabajo.

### 9.2.1 Corrección de `paper-faint` en LOS DOS modos

Auditando el contraste real de los 217 textos de la página apareció algo que no era del modo
claro: **`paper-faint` estaba por debajo de AA también en oscuro**.

El valor original (`.38`) da **3.49:1**. Se había justificado en el §2 diciendo que
`paper-faint` "nunca se usa para información, solo para decoración no esencial", pero eso no
era cierto: lo llevan los eyebrows de sección ("Dónde se va el tiempo"), las categorías de las
fugas de tiempo y los pies "Estimación ilustrativa". Todo eso es información, y a 11px no le
aplica la excepción de texto grande.

| | Antes | Ahora | Ratio |
|---|---|---|---|
| Oscuro | `.38` → 3.49:1 ❌ | **`.48`** | **4.98:1** ✅ |
| Claro | `.50` → 3.60:1 ❌ | **`.58`** | **4.70:1** ✅ |

Tras el cambio, los 217 textos de la página cumplen AA en los dos modos, con un peor caso de
**4.66:1**.

### 9.3 El vidrio necesita una especificación propia

Esto es lo que no se resuelve invirtiendo valores. En oscuro el vidrio es **una película
blanca translúcida sobre negro**. En claro esa misma película sobre crema es invisible.

| Propiedad | Oscuro | Claro |
|---|---|---|
| `background` | `linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.02))` | `linear-gradient(180deg, rgba(255,255,255,.90), rgba(255,255,255,.62))` |
| `border` | `1px solid rgba(255,255,255,.10)` | `1px solid rgba(13,13,13,.10)` |
| `box-shadow` | `inset 0 1px 0 0 rgba(255,255,255,.07), 0 24px 60px -30px rgba(0,0,0,.9)` | `inset 0 1px 0 0 rgba(255,255,255,.90), 0 18px 40px -26px rgba(13,13,13,.30)` |

Tres inversiones de lógica:

1. **La tarjeta pasa de más clara que el fondo a más opaca que el fondo.** En oscuro se aclara
   con un 5% de blanco; en claro se vuelve blanco casi sólido para separarse del crema.
2. **El brillo interior superior sube de .07 a .90.** En oscuro es un filo apenas visible; en
   claro es el borde de luz que hace que la tarjeta parezca levantada.
3. **La sombra baja de `rgba(0,0,0,.9)` a `rgba(13,13,13,.30)` y se acorta.** Una sombra negra
   al 90% sobre crema es una mancha sucia; en claro la profundidad la da una sombra corta y
   suave, no una oscura y larga.

`backdrop-filter: blur(20px) saturate(140%)` se mantiene igual en los dos modos.

### 9.4 Logotipo

**El kit sí trae la variante oscura**, no hay que forzar nada ni pedir un archivo nuevo:

| Modo | Archivo | Trazos |
|---|---|---|
| Oscuro | `logo-full-white.svg` | `#FFFFFF` + punto `#FF5C00` |
| Claro | `logo-full.svg` | `#090909` + punto `#FF5C00` |

Ya estaban los dos en `/public/brand` desde la primera ronda; `logo-full.svg` figuraba como
"reserva para fondo claro" y ahora tiene uso real. El componente `<Logo>` elige según el tema.

### 9.5 Resplandores en claro

El 8–14% que funciona sobre `#090909` no traslada bien: sobre crema el halo naranja se lee
como una mancha de color en vez de como luz. Se sube ligeramente y se resatura:

| | Oscuro | Claro |
|---|---|---|
| `glow-strong` | 14% → 5% → 0 | **16% → 6% → 0** |
| `glow-soft` | 8% → 3% → 0 | **10% → 4% → 0** |

Sigue siendo luz ambiente y sigue sin contar en el presupuesto de acento del §2.

### 9.6 Transición entre modos

`transition: background-color .28s, border-color .28s, color .28s` en `body` y en las
superficies de vidrio. Corta, no instantánea (el salto seco marea) y no lenta (por encima de
~400ms parece que la página se cuelga).

**No se anima `transform` ni `opacity`**, que son las propiedades que usan `Reveal`,
`InteractiveLogo`, el flujo del portátil y la barra de progreso: así cambiar de tema a mitad de
un scroll no interrumpe ninguna animación en curso.

## 10. El lienzo del hero, segunda versión

> **Histórico.** Ver el aviso de §6: esta versión del lienzo tampoco está ya en la página.
> Se conserva por las mediciones y por el criterio de "marcas reconocibles, no cajas".

La primera versión acertaba en concepto (desorden → nodo → orden) pero fallaba en lectura: seis
rectángulos vacíos no dicen "tus herramientas", dicen "cajas". Y el trazo era tan tenue que a
1,5 metros de la pantalla el dibujo desaparecía.

Se consideraron dos caminos.

**Variante A — las herramientas reales (elegida)**

```
   ┌──┐ Slack                                    ╭──────╮
   └──┘ ╲                                        │ ▤▤▤▤ │  CRM al día
   ┌──┐  ╲╲        ◜◝                    ╱────▶  ╰──────╯
   └──┘ Gmail ────▶(  ●)  ────────▶     ╱
   ┌──┐  ╱╱        ◟◞  ↑                ╲        ╭──────╮
   └──┘ ╱      el color cambia AQUÍ      ╲────▶  │ ▦▦▦▦ │  Reporte solo
   gris, cruzadas                                ╰──────╯
                                                 naranja, paralelas
```

Los tiles de la izquierda llevan **las marcas reales del carrusel** (Slack, Google Workspace,
Notion, HubSpot, Trello, Mailchimp), desalineados y con las curvas cruzándose. Los de la
derecha van alineados y con las líneas paralelas.

**Variante B — la bandeja de entrada**

Filas de "datos" superpuestas y torcidas a la izquierda (como papeles apilados de cualquier
manera) que atraviesan el anillo y salen como una lista alineada a la derecha. Más literal
sobre el dato, menos sobre la herramienta.

**Se eligió la A.** Razón: el visitante no tiene que descifrar la metáfora si reconoce los
iconos. "Slack y Gmail entran hechos un lío y sale una cosa ordenada" se entiende sin pensar;
"unas filas torcidas se enderezan" hay que interpretarlo. Además la A reutiliza componentes que
ya existen (`/src/components/logos`), así que el dibujo y el carrusel hablan el mismo idioma
visual. La B habría necesitado un lenguaje gráfico nuevo solo para el hero.

### 10.1 Qué cambió respecto a la primera versión

| | Antes | Ahora |
|---|---|---|
| **Entradas** | 6 rectángulos vacíos | 6 tiles de vidrio con la marca real dentro |
| **Trazo de entrada** | 1.5px al 18% | 1.6px al 26%, y el tile levanta el contraste |
| **Trazo de salida** | 1.5px al 45%, mismo color que la entrada | **2.1px en naranja al 92%** |
| **Cambio de estado** | ninguno: todo el dibujo era del mismo color | **la entrada es gris y la salida naranja**, y el anillo lleva un tramo con degradado `paper → nodbu` justo antes de la apertura |
| **Salidas** | 2 cajas vacías | 2 tiles con etiqueta (`CRM al día`, `Reporte solo`) |
| **Vida** | el pulso recorría todo cada 4.5s | pulso **continuo y lento (6s)** solo en las salidas ya ordenadas |

El acento no crece: el naranja del lienzo sigue siendo **uno solo** conceptualmente (la señal
ordenada), solo que ahora se ve. Las entradas y el anillo no llevan ni una gota.

### 10.2 Revisión posterior del lienzo

Tres comprobaciones sobre los problemas de la primera versión, hechas sobre el render real:

| Comprobación | Resultado |
|---|---|
| ¿El naranja mancha el isotipo? | **Resuelto.** El único naranja que toca el anillo es el degradado del tramo de ignición (−110° a −74°), que es la transición pedida. El pulso que antes recorría todo el arco se eliminó: ahora solo corre por las salidas. El arco queda limpio |
| ¿Los 6 iconos son reconocibles? | **Corregido en esta ronda.** Cinco lo eran; **Mailchimp no**: su marca es un mono y a 22px se lee como un emoji de carita. Se sustituyó por **Stripe**, que tiene una letra rotunda e inconfundible a ese tamaño |
| ¿Las etiquetas de salida se cortan? | **Resuelto.** Los tiles acaban en 528 de un `viewBox` de 560 y el sangrado del lienzo bajó de 8vw a 2vw. "CRM al día" y "Reporte solo" entran completas |

**Regla que queda:** no metas Mailchimp en el lienzo. Un mono a 22px es un emoji.

### 10.3 Titular nuevo y altura del hero

El titular pasó a "Escala tu operación / automatizando procesos" (44 caracteres, el doble que
el anterior). Con `display-xl` se iba a cuatro líneas.

Se creó **`display-hero`**, una escala propia para el h1. Los topes salen de medir el texto
real en el navegador con la fuente cargada, no a ojo: la línea larga ocupa **11.45px de ancho
por cada px de cuerpo**.

| | Ancho disponible | Cuerpo máximo | Elegido |
|---|---|---|---|
| ≥1280px | 640px (7 de 12 columnas de 1200) | 55.9px | **3.25rem = 52px** → 595px |
| 360px | 320px | 27.9px | **1.625rem = 26px** → 298px |

A 56px la línea mide **641px y se pasa por un píxel**: de ahí que el tope no sea 3.5rem.

Resultado medido: **dos líneas y ninguna palabra huérfana** en 360, 768, 1280 y 1920.

**El hero ocupa la pantalla** con `min-h-svh`. Es `min-height`, no `height`: en una pantalla
de 360×480 la sección crece a 639px con el contenido en vez de recortarlo o generar scroll
interno. Se usa `svh` (el viewport con la barra del navegador visible) porque es la medida que
aplica justo al cargar, que es el momento en el que importa que la siguiente sección no asome.

Verificado en 1920×1080, 1280×768, 768×1024, 360×640 y 360×480: la siguiente sección empieza
exactamente en el borde inferior y nunca antes.

### 10.4 La malla de puntos era invisible

No se había perdido: `.dot-grid` seguía aplicada en `<Background>` y la variable existía. El
problema era el valor. A `rgba(255,255,255,.05)` sobre `#090909` la diferencia es de **12
niveles sobre 255**: técnicamente presente, visualmente inexistente.

| | Antes | Ahora |
|---|---|---|
| Oscuro | `.05` | **`.12`** |
| Claro | `.07` | **`.11`** |

Comprobado renderizando una comparativa de valores: por debajo de `.10` la trama no se
percibe, y por encima de `.14` empieza a competir con el contenido.

## 11. Textura de fondo: de "correcto" a premium

La ronda anterior dejó el fondo funcionalmente completo (malla + grano + resplandor por
sección) pero con un acabado que se sentía genérico. El diagnóstico no fue "faltan capas":
fue medir cada capa existente con datos, no a ojo, porque a la opacidad de producción
(2–4%) ninguna diferencia se aprecia en una captura de pantalla comprimida. Todo lo de abajo
se verificó decodificando los píxeles reales del render, no mirando una captura.

### 11.1 El grano tenía ruido de color

feTurbulence genera, por defecto, **un canal de ruido independiente para R, G y B**. A simple
vista es invisible, pero es medible: se generó el mismo textura, se decodificó a canvas y se
calculó la correlación entre los canales R y G.

| | Antes | Ahora |
|---|---|---|
| Correlación R/G | **0.039** (prácticamente 0 = canales independientes = ruido de color) | **1.000** (monocromo) |

Un valor de 0.039 confirma que cada píxel del grano llevaba una micro-mota de color
aleatorio (roja, verde o azul) además de variar en brillo. A opacidad baja sobre un fondo casi
negro o casi blanco, eso no se lee como "grano": se lee como ruido de compresión JPEG o
artefacto de pantalla barata — es la diferencia exacta entre grano fotográfico (siempre
monocromo o con muchísimo menos ruido de color que el original) y estática digital.

**Arreglo:** `<feColorMatrix type="saturate" values="0">` después de la turbulencia. Fuerza
R=G=B en cada píxel. Coste: cero — se resuelve en la decodificación del SVG, una sola vez.

### 11.2 El grano no tenía suavizado

El segundo factor medible es el "gradiente medio" (cuánto cambia el brillo entre un píxel y
su vecino): cuanto más alto, más duro/pixelado se percibe; cuanto más bajo, más blando/óptico.

| Config | Octavas | Blur | avgGrad (0–255) |
|---|---|---|---|
| Antes (prod) | 4 | ninguno | 14.56 |
| Solo monocromo | 4 | ninguno | 18.71 (el monocromo por sí solo lo endurece más) |
| **Elegida** | **2** | **`feGaussianBlur stdDeviation=.45`** | **~10** |

Bajar de 4 a 2 octavas quita las dos bandas de frecuencia más altas (las que apilan
"ruido sobre ruido" y dan la sensación de estática ocupada). El `blur` de .45px redondea los
bordes duros entre píxeles sin difuminar la textura hasta que desaparezca — se probaron .35
(casi no cambia nada, 17.1), .5 (9.74) y .7 (5.6, ya demasiado suave/lavado); .45 quedó en el
punto donde el grano se siente **tan presente como antes pero limpio**, no más débil.

```
antes:  baseFrequency=.8 numOctaves=4                                  (color, sin blur)
ahora:  baseFrequency=.8 numOctaves=2 + saturate(0) + blur(.45)        (monocromo, suavizado)
```

### 11.3 Un efecto colateral bueno: coherencia automática entre temas

Al pasar a monocromo, la media de brillo del grano quedó en **127.7/255** — prácticamente el
punto medio entre negro y blanco. Eso significa que, para llegar al mismo contraste percibido
(la misma distancia de brillo respecto al fondo), el oscuro y el claro necesitan **casi la
misma opacidad**, algo que con el grano de color (media 186/255, mucho más cerca del blanco)
no era cierto: ese grano se notaba bastante menos sobre el fondo claro que sobre el oscuro,
aunque llevara un token de opacidad distinto para compensar.

| | Antes | Ahora |
|---|---|---|
| `--noise-opacity` oscuro | `0.03` | **`0.045`** |
| `--noise-opacity` claro | `0.02` | **`0.045`** (mismo valor) |
| Δ de brillo resultante, oscuro | — | ~5.3 sobre 255 |
| Δ de brillo resultante, claro | — | ~5.5 sobre 255 |

Se calculó el delta exacto con la media real del fondo de cada tema (`#090909` y `#FAF9F7`) y
se buscó la opacidad que da un delta de contraste "presente pero discreto" (probado en el
rango Δ=3 a Δ=6; se eligió ~5). El resultado es que ya no hacen falta dos números ajustados
por separado — un único valor sirve para los dos temas y se ve igual de intencional en ambos,
que es justo lo que se pedía verificar.

### 11.4 La malla de puntos competía con el contenido

La ronda anterior subió la opacidad de la malla (`.05→.12` oscuro, `.07→.11` claro) porque a
esos valores no se veía nada. Correcto entonces, pero el otro eje —la **densidad**— no se
había tocado: 32px de espaciado son 961 puntos por cada 1000×1000px.

Igual que con el grano, la palanca correcta no es bajar la opacidad de cada punto (eso
arriesga volver a la invisibilidad que se corrigió antes), sino separarlos:

| | Antes | Ahora |
|---|---|---|
| Espaciado | `32px` | **`48px`** |
| Cobertura de pantalla | 0.307% | **0.136%** (44% de la anterior) |
| Puntos por 1000×1000px | 961 | **400** |
| Opacidad de cada punto | `.12` / `.11` | **sin cambios** |

Cada punto individual es exactamente tan nítido como antes si te fijas en él (mismo
contraste de pico); lo que baja es cuántos hay por pantalla. Es la diferencia entre "rejilla
técnica de milimetrado" y "unas estrellas sueltas": se nota su ausencia si se quita, no su
presencia mientras se lee.

### 11.5 Viñeta — el único elemento nuevo

Después de limpiar grano y malla seguía faltando una sensación de profundidad hacia el centro
del contenido. Se añadió **una** capa nueva (dentro del límite explícito de "malla + grano +
resplandor + viñeta opcional"), muy comedida:

```css
.vignette {
  background-image: radial-gradient(ellipse at 50% 40%, transparent 60%, rgb(var(--c-ink) / .3) 100%);
}
```

- `transparent` hasta el 60% del radio: el centro y buena parte de la pantalla no la tocan.
- Usa el propio token `ink` del tema — no es un color nuevo, así que sigue el tema sin
  declarar nada adicional.
- Está en el mismo contenedor `fixed` que la malla y el grano: mismo coste (cero JS, una
  capa CSS estática, compuesta una vez por el navegador).

Verificado a 1920px y 360px, oscuro y claro: se nota que las esquinas están un poco más
apagadas si las buscas, y no se nota como un marco cuando no las buscas.

### 11.6 Rendimiento: sin cambios de arquitectura

Las tres capas siguen viviendo en `<Background>`, que sigue **sin `'use client'`** (componente
de servidor) y sin ningún listener de scroll ni `requestAnimationFrame`. El grano sigue siendo
un `<img>` de fondo cuyo SVG se decodifica **una vez** al cargar la página, no en cada frame;
la viñeta es un `radial-gradient` CSS estático. El único coste añadido es el propio
`feGaussianBlur`, que corre en la decodificación de esa imagen (una vez), no en tiempo de
scroll.

## 12. Riesgos asumidos

| Riesgo | Mitigación |
|---|---|
| `backdrop-filter` mata FPS en móvil de gama baja | Máx. 3 capas reales; las rejillas usan vidrio sin blur (sección 4) |
| El lienzo SVG del hero retrasa el LCP | El LCP es el `<h1>`, que entra a 0ms; el lienzo es `aria-hidden` y arranca a 150ms |
| El naranja como texto puede quedar bajo AA | Solo ≥16px o peso 500+; nunca como único portador de significado |
| Marquee infinito consume CPU en segundo plano | `animation-play-state: paused` en hover y con `prefers-reduced-motion` |
| Contenido de ejemplo publicado por error | Ya no queda ninguno: `testimonials.ts` son reseñas reales y `cases.ts` se eliminó con la sección de Casos de uso |

---

## 13. El hero y la sección 2, versión actual

Las secciones §6 y §10 describen un lienzo (`FlowCanvas`) que ya no existe. Esta sección
documenta lo que hay hoy en su lugar y **por qué el cambio no perdió el argumento de venta**.

### 13.1 Qué cambió y qué se movió de sitio

| | Antes | Ahora |
|---|---|---|
| Hero, columna derecha | `FlowCanvas`: 6 marcas reales entrando en desorden y saliendo ordenadas | `InteractiveLogo`: el isotipo de NODBU, dibujado y con paralaje al ratón |
| Sección 2 | `PainStrip`: cuatro cifras de "dónde se va el tiempo" | `ValueShowcase`: un MacBook en CSS con un flujo real de 6 pasos |

El riesgo evidente del cambio era quedarse sin la metáfora: el lienzo era lo único que
**explicaba el servicio** sin leer. Lo que ocurrió es que la metáfora bajó una pantalla. El
hero pasó a hablar de marca (un isotipo grande y quieto, que es lo que hace una web premium
en la primera pantalla) y la explicación del servicio pasó a la sección 2, donde además tiene
sitio para seis pasos con texto en vez de seis logos mudos.

Dicho lo cual, hay una **pérdida real que conviene tener presente**: el lienzo enseñaba
herramientas que el visitante reconoce (Slack, Notion, Stripe) y eso hacía el trabajo de
"esto se conecta con lo que ya usas" en cero segundos. Hoy ese trabajo lo hacen el marquee de
integraciones (sección 3) y los nodos del portátil, pero un paso más abajo en la página.

### 13.2 El isotipo: geometría derivada, no dibujada a ojo

Igual que el lienzo anterior, no hay números mágicos. Lienzo de 512, centro en (256,256),
**R = 135.68** (0.265 del lienzo). Todo lo demás es una proporción sobre R:

| Elemento | Valor | En función de R |
|---|---|---|
| Grosor del trazo | `55.296` | `0.4075 R` |
| Radio del punto naranja | `33.28` | `0.2453 R` |
| Inicio del arco | `-16°` | a distancia R |
| Fin del arco | `-74°` | a distancia R |
| Punto naranja | `-45°` | a distancia R |

El arco va de -16° a -74° **por el lado largo**, así que deja una apertura de 58° centrada
exactamente en -45°, y el punto naranja cae en el centro de esa apertura. Eso es lo que hace
que el anillo parezca abrirse *para* el punto en vez de estar cortado por casualidad. Está
verificado midiendo los tres puntos del `path`: los tres dan exactamente 135.680 de radio.

Se mantiene la regla del isotipo limpio: **el único naranja es el punto**. El arco va en
`text-paper` y no se le pasa ningún pulso por encima.

**Comportamiento conocido en tema claro:** la capa de resplandor usa `mix-blend-screen`, que
solo aclara. En claro el arco es casi negro, así que esa capa no aporta nada y el logotipo se
ve plano. Es coherente (un halo sobre fondo crema no se lee como halo) y está asumido.

### 13.3 El portátil: por qué CSS y no una imagen

Se dibuja con utilidades de Tailwind, sin imagen. Pesa 0 bytes de red, escala sin perder
nitidez y responde al tema. Una captura de un portátil real habría costado 150–400 KB y
habría llevado un fondo que no combina con ninguno de los dos temas.

El contenido de la pantalla se desplaza con `scrollYProgress`, no en bucle: el visitante
controla el avance, así que no compite por atención con el resto de la página.

### 13.4 Los tokens `device-*` y `node-*`: la excepción al acento único

El portátil obligó a meter colores que **no son de la marca**, y eso choca de frente con dos
reglas: "el naranja es el único acento" y "ni un hexadecimal fuera de `tailwind.config.ts`".

La segunda no admite excepción y se cumple: todos esos colores son tokens declarados en
`themeTokens`, en los dos temas, como cualquier otro. La primera **sí tiene una excepción
razonada**, y es esta:

- **`device-*` (la carcasa).** Es un objeto físico, no una superficie de marca. Reusar los
  tokens de marca lo rompe: `bg-ink` en el bisel lo volvería crema en tema claro, y una
  pantalla apagada no es crema. El aluminio sí sigue al tema (refleja la luz del entorno); el
  negro del bisel, la lente y el LED no cambian, porque el negro es negro.
- **`node-*` (los iconos de dentro de la pantalla).** Son seis sistemas distintos —web,
  correo, CRM, inventario, datos— y el color es lo que los distingue: ahí el color es
  **información**, no decoración. Son idénticos en los dos temas a propósito, porque
  representan la paleta de *otra* aplicación.

**No cuentan para el presupuesto de acento de la sección** porque están dentro de la pantalla
del portátil, no sobre la página. En la sección 2, los elementos naranjas *de la página*
siguen siendo dos: el nodo del agente IA y los conectores.

**Pendiente honesto:** los seis tonos `node-*` se eligieron sobre fondo oscuro. Sobre el crema
del tema claro tienen bastante menos contraste. Son iconos de 18–22px que siempre van
acompañados de su etiqueta en texto, así que no bloquean AA, pero si algún día se revisa el
tema claro a fondo, este es el sitio donde mirar.

---

## 14. El sistema de artículos (`/recursos`)

La landing pasó a ser un sitio: una sección de artículos, una página de entidad y una tercera
legal. Esta sección documenta las decisiones de diseño de esa parte; las de escritura están en
`src/content/recursos/GUIA.md`.

### 14.1 `/recursos` y no `/blog`

**La regla 10 reserva `public_html/blog` para un WordPress futuro.** Publicar ahí desde Next
ocuparía la carpeta y bloquearía esa puerta: el workflow de despliegue excluye `blog/**`
precisamente para no pisarla, y un `/blog` generado por Next entraría en conflicto el día que
alguien instale WordPress desde hPanel.

`/recursos` además dice mejor lo que hay: guías prácticas, no bitácora. "Blog" promete
frecuencia; "recursos" promete utilidad, y es lo que se puede sostener.

### 14.2 Todas las URL con barra final

El sitio ya se compilaba con `trailingSlash: true`, así que cada ruta es una carpeta con su
`index.html` y Apache la sirve por `DirectoryIndex` **sin depender de `mod_rewrite`**. En
hosting compartido eso es una ventaja concreta: menos piezas que puedan fallar.

Lo que sí había que arreglar era la coherencia. La portada declaraba
`canonical: https://nodbu.com` (sin barra) mientras el sitemap escribía
`https://nodbu.com/` (con barra): dos URL declaradas para la misma página, repartiendo su
autoridad. Ahora **todas** salen de `absoluteUrl()`, que fuerza la barra, y hay una comprobación
que verifica que cada canónica coincide con su entrada del sitemap.

### 14.3 `.prose-nodbu` en vez de `@tailwindcss/typography`

Se descartó el plugin, y no por ligereza: **sus colores por defecto rompen dos reglas del
proyecto a la vez.** Trae su propia escala de grises en hexadecimal (regla 2) y resuelve el
tema oscuro con `prose-invert`, que es duplicar clases por tema — exactamente lo que el sistema
de tokens existe para evitar.

`.prose-nodbu` se escribió a mano en `globals.css`, siguiendo el patrón que ya usaba `.legal`:
cada color sale de un token, así que el modo claro funciona sin una sola regla adicional.

Dos decisiones dentro de la clase:

- **El ancho de línea no se fija ahí.** Lo pone el contenedor de la plantilla (`max-w-[68ch]`),
  porque las tablas y los bloques de código tienen que poder salirse de esa medida.
- **Las tablas se envuelven en un contenedor con desplazamiento propio** (`overflow-x-auto` con
  sangrado negativo). Una tabla de cuatro columnas no cabe en 360px, y sin esto desbordaría y
  haría que se desplazara la **página entera** en horizontal, que es el fallo típico de un blog
  en móvil. Así se desplaza solo la tabla.

Contraste medido sobre el render real, artículo completo:

| | Oscuro | Claro |
|---|---|---|
| `h1`, `h2`, TL;DR | 19.91:1 | 18.19:1 |
| Cuerpo | 7.76:1 | 6.66:1 |
| Eyebrow y cabecera de tabla | 4.98:1 | 4.68:1 |
| Enlace en prosa | 6.43:1 | **4.59:1** ← peor caso |

Todos cumplen AA en los dos modos.

### 14.4 Las imágenes OG son estáticas

Se descartó `next/og`, que genera la imagen al vuelo. **Es incompatible con `output: 'export'`**
—necesita un servidor que la renderice en cada petición— y ese es motivo suficiente, pero
además no compensaría: una OG generada por plantilla queda como una tarjeta de texto sobre un
fondo, y a esa escala la diferencia con una imagen fija bien hecha es nula.

El sistema es: cada artículo puede declarar su `og` apuntando a `/public/og/`, y si no lo hace
**cae a la genérica del sitio**. Así publicar no depende de tener la imagen lista.

Pendiente anotado: la genérica pesa 352 KB, que es mucho para una OG. Si se hacen las
individuales, conviene bajarlas de 200 KB.

### 14.5 El TL;DR va arriba y sin scroll

Es la decisión de estructura que más condiciona el objetivo de que un buscador con IA cite el
artículo: **el TL;DR responde el título por sí solo**, sin contexto previo. Un modelo que
extrae la respuesta no tiene que recortar el cuerpo por su cuenta, y una persona con prisa se
va con la respuesta en veinte segundos.

Se marca además como `abstract` en el `BlogPosting`, así que lo que se lee y lo que se declara
en el marcado son el mismo texto.

Su tratamiento visual es una tarjeta `glass-flat` con **borde izquierdo naranja**, y ese es el
único acento del artículo junto al botón del CTA final. Por eso las tarjetas del hub, el índice
lateral y las migas van en tonos de `paper`: si el artículo tuviera más naranja, el CTA dejaría
de ser el sitio al que va el ojo.

### 14.6 El índice lateral va después del cuerpo en el HTML

En escritorio se ve a la derecha, pero **en el orden del documento va detrás del artículo**.
Quien navega con teclado o con lector de pantalla llega antes al contenido que a su índice. No
hace falta reordenar nada por CSS: cae a la derecha por ser la segunda columna de la rejilla.

Está oculto por debajo de `lg`. En una pantalla estrecha, un índice o empuja el texto media
pantalla hacia abajo o se convierte en un desplegable que nadie abre; el TL;DR ya cumple ahí la
función de "de qué va esto".

El apartado activo se marca con `IntersectionObserver` y no escuchando el scroll: el navegador
ya sabe qué hay en pantalla y avisa solo cuando cambia.

### 14.7 El grafo JSON-LD: definir una vez, referenciar siempre

Los tres nodos de entidad (`#organization`, `#website`, `#diego`) se definen **una sola vez**,
en el layout raíz, y cada página los referencia por `@id` en lugar de redescribirlos. Si cada
página redefiniera la organización, el mismo `@id` aparecería descrito dos veces en el mismo
HTML.

El `ProfessionalService` que había suelto no se perdió: es un tipo más del nodo
`#organization` (`"@type": ["Organization","ProfessionalService"]`), así que `priceRange`,
`serviceType` y `areaServed` siguen ahí sin un segundo nodo compitiendo por representar a la
empresa.

Verificado en las once páginas generadas: JSON válido y cero `@id` duplicados.

### 14.8 Riesgo conocido: las tarjetas dependen de JavaScript

`<Reveal>` renderiza `style="opacity:0"` en el HTML estático y lo anima al entrar en pantalla.
**Sin JavaScript, las tarjetas del hub no se ven.**

No es nuevo —toda la landing funciona así desde el principio— y su impacto real es limitado:
el texto **sí está en el HTML crudo**, así que un rastreador que no ejecute JavaScript lo
extrae igual, y con `prefers-reduced-motion` el componente se pinta directamente sin opacidad.

Queda anotado porque en un sitio pensado para buscadores con IA conviene tenerlo presente. La
corrección, si se decide hacerla, es una regla dentro de `<noscript>` que fuerce
`opacity: 1` sobre los elementos de `Reveal`: no cambia nada para quien tiene JavaScript.
