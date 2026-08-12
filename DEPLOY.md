# DEPLOY.md — cómo publicar la web en Hostinger

Guía literal, paso a paso. **No hace falta saber programar.** Si algo no coincide con lo que
ves en pantalla, para y pregunta antes de borrar nada.

Tiempo estimado la primera vez: 30–40 minutos. Las siguientes: 5 minutos (o cero, si activas
la Opción B).

---

## Paso 0 — Instalar Node.js (solo la primera vez)

**Este Mac todavía no tiene Node.js**, que es el programa que genera la web. Sin él, el paso 1
dará el error `command not found: npm`.

1. Entra en <https://nodejs.org>.
2. Descarga el botón grande que dice **LTS** (versión estable con soporte largo).
3. Abre el `.pkg` descargado y pulsa Siguiente hasta el final. No hay que configurar nada.
4. Cierra la ventana de Terminal si la tenías abierta y ábrela de nuevo.
5. Comprueba que funcionó:

```bash
node -v
```

Tiene que responder algo como `v22.14.0`. Si responde `command not found`, reinicia el Mac y
vuelve a probar.

> Esto se hace **una sola vez**. Si eliges la Opción B (despliegue automático), ni siquiera
> necesitas Node en tu ordenador: GitHub compila la web por ti en sus servidores.

---

## Paso 1 — Generar la web

Todo lo que se publica sale de una carpeta llamada `out`. Para crearla:

1. Abre la aplicación **Terminal** (en Mac: Cmd + Espacio, escribe "Terminal", Enter).

2. Ve a la carpeta del proyecto. Escribe `cd `, deja un espacio, arrastra la carpeta
   `nodbu-web` a la ventana de Terminal y pulsa Enter.

3. Solo la primera vez, instala lo necesario:

```bash
npm install
```

4. Genera la web:

```bash
npm run build
```

5. Cuando termine verás una tabla con las rutas (`/`, `/privacidad`, `/aviso-legal`). Eso
   significa que ha ido bien. Ahora existe una carpeta **`out`** dentro de `nodbu-web`.

**Esa carpeta `out` es la web entera.** Contiene:

```
out/
├── index.html          ← la página principal
├── 404.html            ← página de error
├── .htaccess           ← configuración del servidor (¡es invisible!)
├── og.png              ← imagen que se ve al compartir el enlace
├── sitemap.xml
├── robots.txt
├── rss.xml             ← el feed de los artículos
├── llms.txt            ← resumen del sitio para buscadores con IA
├── favicon.ico
├── recursos/
│   ├── index.html                    ← el listado de artículos
│   ├── automatizar-whatsapp-pyme/index.html
│   ├── que-procesos-automatizar-pyme/index.html
│   └── conectar-excel-crm-facturacion/index.html
├── sobre-nodbu/index.html
├── privacidad/index.html
├── aviso-legal/index.html
├── terminos/index.html
├── gracias/index.html  ← a donde llega quien envía el formulario. No sale en
│                          buscadores a propósito (lleva "noindex")
├── brand/              ← logotipos
└── _next/              ← estilos, fuentes y código
```

> **Cada artículo es una carpeta con su `index.html`.** Al publicar uno nuevo aparecerá una
> carpeta más aquí dentro, sola. No hay que crear nada a mano ni dar de alta la página en
> ningún sitio: basta con volver a compilar y subir.

> **Aviso importante:** el archivo `.htaccess` empieza por punto, y en Mac los archivos que
> empiezan por punto están **ocultos**. En el Finder se ven pulsando `Cmd + Shift + .`
> (comando, mayúsculas y punto). Lo vas a necesitar en el paso 2.

---

## Paso 2 — Opción A: subirlo a mano (recomendada la primera vez)

1. Entra en <https://hpanel.hostinger.com> con tu cuenta.

2. En el menú de arriba elige **Webs** y pulsa **Administrar** en el dominio `nodbu.com`.

3. En el menú de la izquierda busca **Archivos → Administrador de archivos**.

4. Verás una lista de carpetas. Entra en **`public_html`**. Es la carpeta que se publica en
   internet: todo lo que esté ahí dentro se ve desde el navegador.

5. **Activa la vista de archivos ocultos.** Arriba a la derecha hay un icono de engranaje o de
   tres puntos → **Configuración** → marca **Mostrar archivos ocultos (dotfiles)**. Sin esto
   no verás el `.htaccess` y creerás que no se ha subido.

6. **Borra lo que hay dentro de `public_html`.** Hostinger deja por defecto un `index.html` de
   bienvenida y a veces una carpeta `default`. Selecciona todo y bórralo.

   > Si ya tienes algo publicado ahí que quieras conservar, descárgalo antes.
   > **No borres la carpeta `public_html` en sí**, solo su contenido.

7. En tu ordenador abre la carpeta `out`. **Entra dentro** y selecciona **todo su contenido**
   (Cmd + A): los archivos y las carpetas que hay dentro, con el `.htaccess` visible.

   > ⚠️ **Sube el CONTENIDO de `out`, no la carpeta `out`.**
   > Correcto: `public_html/index.html`
   > Incorrecto: `public_html/out/index.html` ← así la web no funciona.

8. Arrástralo a la ventana del Administrador de archivos, dentro de `public_html`. Espera a
   que termine la barra de progreso.

9. Comprueba que en `public_html` está el `.htaccess`. Si no aparece, revisa el punto 5 y
   súbelo por separado.

Listo: entra en <https://nodbu.com> y deberías ver la web.

---

## Paso 3 — Opción B: que se suba sola en cada cambio (automática)

Con esto, cada vez que guardes cambios en GitHub la web se actualiza sola. El archivo que lo
hace ya está escrito en `.github/workflows/deploy.yml`; solo hay que darle las claves FTP.

### 3.1 Consigue los datos FTP en hPanel

1. En hPanel, con `nodbu.com` seleccionado, ve a **Archivos → Cuentas FTP**.

2. Anota estos tres datos:

   | Dato | Dónde aparece | Ejemplo |
   |---|---|---|
   | Servidor / Host FTP | "Dirección del servidor FTP" | `ftp.nodbu.com` o `82.197.x.x` |
   | Nombre de usuario | "Nombre de usuario FTP" | `u123456789.nodbu` |
   | Contraseña | La creas tú con **Cambiar contraseña de cuenta FTP** | la que elijas |

3. Si no recuerdas la contraseña, pulsa **Cambiar contraseña de cuenta FTP** y pon una nueva.
   Cópiala en un sitio seguro: solo se muestra una vez.

### 3.2 Guarda las claves en GitHub

1. Entra en tu repositorio en GitHub.
2. Pestaña **Settings** (arriba a la derecha del repositorio, no la de tu perfil).
3. Menú izquierdo: **Secrets and variables → Actions**.
4. Botón verde **New repository secret**. Crea estos tres, uno por uno, con el nombre
   **exactamente** así en mayúsculas:

   | Name | Secret |
   |---|---|
   | `FTP_SERVER` | el servidor del paso 3.1 |
   | `FTP_USERNAME` | el usuario del paso 3.1 |
   | `FTP_PASSWORD` | la contraseña del paso 3.1 |

5. Si además tienes la clave del formulario y la de Google Tag Manager, añade también:

   | Name | Secret |
   |---|---|
   | `NEXT_PUBLIC_WEB3FORMS_KEY` | tu clave de Web3Forms |
   | `NEXT_PUBLIC_GTM_ID` | tu `GTM-XXXXXXX` (opcional) |

   > Sin `NEXT_PUBLIC_WEB3FORMS_KEY` la web se publica igual, pero el formulario avisará de
   > que todavía no está conectado y pedirá escribir por WhatsApp.

### 3.3 bis — Resumen de los seis secretos y qué pasa si falta uno

| Secreto | ¿Obligatorio? | Si falta |
|---|---|---|
| `FTP_SERVER` | Sí, para la Opción B | El despliegue automático falla entero: no sube nada |
| `FTP_USERNAME` | Sí, para la Opción B | Igual que arriba |
| `FTP_PASSWORD` | Sí, para la Opción B | Igual que arriba |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | No, pero sin ella no hay formulario | El sitio se publica igual; el formulario avisa de que no está conectado |
| `NEXT_PUBLIC_GTM_ID` | No | Simplemente no se carga ninguna analítica; nada se rompe |

**Los dos `NEXT_PUBLIC_*` se incrustan en el momento de compilar, no cuando alguien visita la
web.** Si los añades o cambias después de que la web ya estaba publicada, no basta con guardar
el secreto en GitHub: hace falta un `npm run build` nuevo (o un push a `main` que dispare la
Opción B) y volver a subir `/out`. Guardar el secreto sin recompilar no cambia nada en la web ya
publicada.

**Si el formulario deja de funcionar solo en producción** (en tu ordenador con `npm run dev`
va bien, pero en `nodbu.com` no), la causa casi siempre es esta: el secreto
`NEXT_PUBLIC_WEB3FORMS_KEY` no está guardado en GitHub, o se guardó después del último
despliegue y no se ha vuelto a compilar. La clave en sí no suele ser el problema: se puede
probar en cualquier momento abriendo la consola del navegador en `nodbu.com`, pegando el
código de `src/lib/submit-lead.ts` con la clave real, y mirando si la respuesta trae
`"success": true`.

### 3.3 Comprobar que funciona

1. Haz cualquier cambio y súbelo a la rama `main`.
2. En GitHub, pestaña **Actions**: verás una ejecución llamada "Desplegar en Hostinger".
3. Cuando salga el tick verde, entra en <https://nodbu.com> y refresca con `Cmd + Shift + R`.

---

## Paso 4 — Apuntar el dominio y activar el SSL (candado de HTTPS)

### 4.1 Si compraste nodbu.com en Hostinger

Normalmente ya está apuntado. Comprueba en **Webs → nodbu.com → Panel** que dice
"Dominio conectado". Si es así, salta a 4.3.

### 4.2 Si el dominio está en otro proveedor (GoDaddy, Namecheap, Google Domains…)

1. En hPanel ve a **Webs → nodbu.com → Panel** y busca los **servidores DNS (nameservers)**.
   Suelen ser:

```
ns1.dns-parking.com
ns2.dns-parking.com
```

2. Entra en la web donde compraste el dominio, busca **DNS / Nameservers / Servidores de
   nombres** y sustituye los que haya por esos dos.

3. El cambio tarda entre 30 minutos y 24 horas. Es normal que durante ese rato la web no
   cargue o cargue a ratos.

### 4.3 Activar el certificado SSL gratuito

1. En hPanel: **Seguridad → SSL**.
2. Pulsa **Instalar SSL** en `nodbu.com`. Es gratis (Let's Encrypt).
3. Espera a que el estado sea **Activo** (unos minutos).
4. Si ves la opción **Forzar HTTPS**, actívala.

> El `.htaccess` que subes ya redirige a HTTPS y quita el `www` por su cuenta. Pero el
> certificado tiene que estar activo **antes**, o el navegador mostrará un aviso de sitio no
> seguro.

---

## Paso 5 — Comprobar que todo funciona

Recórrelo entero. Son cinco minutos y evitan sustos.

| # | Qué comprobar | Cómo | Qué tiene que pasar |
|---|---|---|---|
| 1 | HTTPS | Entra en `http://nodbu.com` (sin la s) | Salta solo a `https://` y sale el candado |
| 2 | Sin www | Entra en `https://www.nodbu.com` | Salta solo a `https://nodbu.com` |
| 3 | Página legal | Entra en `https://nodbu.com/privacidad/` | Carga la política, no un error 404 |
| 4 | Aviso legal y términos | Entra en `/aviso-legal/` y en `/terminos/` | Cargan bien las dos |
| 5 | Página 404 | Entra en `https://nodbu.com/esto-no-existe/` | Sale la página de error con el diseño de NODBU |
| 6 | WhatsApp | Pulsa "Hablar por WhatsApp" | Abre WhatsApp con el mensaje ya escrito |
| 7 | Botón flotante | Baja un poco | Aparece el botón naranja abajo a la derecha |
| 8 | **Formulario** | Rellénalo con tus datos reales, marca la casilla de aceptación y envíalo | Te lleva a `/gracias/` **y llega el correo a hola@nodbu.com**, con un campo "Consentimiento" que confirma que se aceptó |
| 9 | Móvil | Ábrelo en tu teléfono | Se lee bien y el menú se abre a pantalla completa |
| 10 | Al compartir | Pega el enlace en WhatsApp | Sale la imagen negra con el logo NODBU |
| 11 | **Los artículos** | Entra en `https://nodbu.com/recursos/` y abre uno | Carga el listado y el artículo, con su índice a la derecha en pantalla grande |
| 12 | **Volver desde un artículo** | Dentro de un artículo, pulsa "Servicios" en el menú | Te lleva a la portada y baja hasta esa sección |
| 13 | Sobre NODBU | Entra en `https://nodbu.com/sobre-nodbu/` | Carga con los datos del titular |
| 14 | Feed y llms.txt | Entra en `/rss.xml` y en `/llms.txt` | Se ven como texto, no dan 404 |

**El punto 12 es el que más conviene mirar**, porque es lo que se rompe si algo del menú se
toca mal: desde un artículo, los enlaces del menú tienen que llevar a la portada, no quedarse
buscando dentro del artículo.

**Si el punto 8 falla** y sale "El formulario todavía no está conectado": falta la clave de
Web3Forms. Mírate la sección correspondiente del `README.md`, ponla en `.env.local` y **vuelve
a hacer `npm run build` y a subir**. Como la web es estática, la clave se queda grabada en el
momento de compilar. Si en cambio el formulario intenta enviar pero nunca llega el correo,
repasa la tabla de la sección 3.3 bis: en producción casi siempre es que el secreto está en
GitHub pero no se ha vuelto a desplegar desde que se añadió.

**Si el punto 3 da error 404:** revisa que subiste el `.htaccess` (paso 2.9) y que las carpetas
`privacidad` y `aviso-legal` están dentro de `public_html`, cada una con su `index.html`.

---

## Paso 6 — Publicar un artículo nuevo

Los artículos son archivos de texto dentro del proyecto. Para publicar uno:

1. Crea un archivo `.mdx` en `src/content/recursos/`. **El nombre del archivo es la dirección
   web**: `automatizar-facturas.mdx` se publica en `https://nodbu.com/recursos/automatizar-facturas/`.
2. Escríbelo siguiendo `src/content/recursos/GUIA.md`, que explica todo sin necesidad de
   entender el código.
3. `npm run build` y sube el contenido de `out` como siempre (o push a `main` con la Opción B).

**Si te falta algún dato obligatorio o pones una fecha que no existe, el build para y te dice
exactamente qué archivo y qué campo.** Es a propósito: mejor no publicar que publicar roto.

Al recompilar, el artículo entra solo en el listado, en el `sitemap.xml`, en el `rss.xml`, en
el `llms.txt`, en los artículos relacionados y en el pie de página. **No hay que darlo de alta
en ningún sitio.**

---

## Paso 7 — Si más adelante quieres un blog en WordPress

La web **no usa** la carpeta `public_html/blog`, y sigue libre a propósito. **La sección de
artículos está en `/recursos`, no en `/blog`, justamente para no ocupar ese sitio.**

El workflow de despliegue excluye `blog/**`, así que subir la web nunca toca esa carpeta.

Cuando quieras un WordPress ahí:

1. En hPanel: **Webs → nodbu.com → Auto Instalador → WordPress**.
2. Cuando pregunte el directorio de instalación, escribe **`blog`**.
3. Quedará en `https://nodbu.com/blog` sin tocar ni romper el resto del sitio.

Las tres cosas conviven: la web estática, los artículos de `/recursos` y WordPress en `/blog`.

---

## Sobre el `.htaccess` (no hay que tocarlo)

**No cambia nada al pasar de una página a varias**, y conviene saber por qué para no
"arreglarlo" por error.

El sitio se genera con cada ruta como una carpeta con su `index.html` dentro. El `.htaccess`
tiene una línea, `DirectoryIndex index.html`, que hace que Apache sirva ese archivo cuando
alguien entra en la carpeta. Eso vale igual para dos rutas que para veinte, así que **añadir
artículos no obliga a tocarlo**.

Dos cosas que **no** hay que hacerle:

- **No añadas reglas que quiten la barra final.** Todas las direcciones del sitio la llevan
  (`/recursos/algo/`), y el `sitemap.xml` y las etiquetas canónicas dicen exactamente eso.
  Quitarla crearía dos direcciones para la misma página.
- **No añadas reglas para reescribir `.html`.** No hacen falta y pueden romper el
  funcionamiento actual.

Lo que sí lleva y conviene conservar: HTTPS forzado, `www` → dominio raíz, compresión, caché
larga para estilos e imágenes, HTML sin cachear, cabeceras de seguridad y
`ErrorDocument 404 /404.html`.

---

## Recordatorio final

Cada vez que cambies **cualquier cosa** (un texto, un precio, el número de WhatsApp, una
reseña) hay que repetir:

```bash
npm run build
```

y volver a subir el contenido de `out` (Opción A), o simplemente hacer push a `main` si tienes
activada la Opción B. La web es estática: lo que no se compila, no se ve.
