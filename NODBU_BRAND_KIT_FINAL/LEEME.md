# NODBU · Kit de identidad visual v2.0

Sistema completo derivado del logo original. Los ficheros de `NODBU_KIT_LOGO/`
(v1, junio 2026) **no se han modificado**: este kit vive aparte.

---

## Qué uso en cada sitio — matriz de casos de uso

| Contexto | Fichero | Notas |
|---|---|---|
| Cabecera de web (claro) | `01_logo/svg/nodbu-logotipo.svg` | Altura 28–40 px |
| Cabecera de web (oscuro) | `01_logo/svg/nodbu-logotipo-blanco.svg` | |
| Pie de web | `nodbu-logotipo-blanco.svg` | |
| Favicon | `02_iconos/favicon.svg` + `favicon.ico` | El SVG se adapta a tema claro/oscuro |
| App / PWA | `02_iconos/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Declarados en `site.webmanifest` |
| iOS home screen | `02_iconos/apple-touch-icon-180.png` | Sin esquinas redondeadas: iOS aplica su máscara |
| Avatar redes | `03_social/avatar-1024.png` | A sangre: cualquier recorte circular funciona |
| Compartir enlace (OG) | `03_social/og-image-1200x630.png` | Metadatos en `02_iconos/_snippet-head.html` |
| Portada LinkedIn empresa | `03_social/linkedin-empresa-1128x191.png` | |
| Portada LinkedIn personal | `03_social/linkedin-banner-1584x396.png` | |
| Cabecera X | `03_social/x-header-1500x500.png` | |
| Canal YouTube | `03_social/youtube-banner-2560x1440.png` | Zona segura central 1546×423 |
| WhatsApp Business | `03_social/whatsapp-perfil-640.png` | |
| Firma de correo | `05_plantillas/firma-email.html` | Requiere PNG en URL pública |
| Propuestas / facturas | `nodbu-logotipo.svg` a 25 mm de ancho | |
| Presentaciones (portada) | `nodbu-lockup-vertical.svg` | |
| Merchandising, sellos, grabado | `nodbu-logotipo-mono-negro.svg` | Una sola tinta |
| Bordado / serigrafía < 30 mm | `nodbu-simbolo-mono-negro.svg` | El logotipo completo no aguanta |
| Cuando aparece junto a otra marca | `nodbu-lockup-horizontal.svg` | El nodo aparece una sola vez |
| Web / app: colores y tipografía | `04_tokens/nodbu-tokens.css` | Fuente única de verdad |

---

## Estructura

```
01_logo/        svg/ (fuente) · png/ (1200 y 2400 px de ancho, recorte exacto)
02_iconos/      favicons, iconos PWA, site.webmanifest, _snippet-head.html
03_social/      OG, banners, avatares
04_tokens/      nodbu-tokens.css · .json · .scss · nodbu-tailwind.css
05_plantillas/  firma-email.html · og-plantilla.html
06_tipografias/ Outfit · Inter · JetBrains Mono (variables, OFL, self-hosted)
00_manual/      manual de marca (HTML)
```

## Nomenclatura

`nodbu-<pieza>[-blanco|-mono-negro|-mono-blanco][-<ancho>w|-<px>].<ext>`

- sin sufijo → negro `#090909` + punto naranja `#FF5C00` (versión principal)
- `-blanco` → letras blancas + punto naranja (fondos oscuros)
- `-mono-*` → **una sola tinta**, sin naranja (grabado, sello, fax, serigrafía barata)

## Reglas que no se saltan

1. **Área de respeto** = 1,5 × el grosor del anillo del nodo, por los cuatro lados.
2. **Tamaño mínimo del logotipo**: 128 px de ancho en pantalla (recomendado ≥ 160 px),
   25 mm impreso. Por debajo, usar sólo el símbolo.
3. **Tamaño mínimo del símbolo**: 24 px. De 16 a 24 px, usar la versión micro.
4. **`#FF5C00` no vale para texto sobre blanco** (3,10:1, no cumple WCAG AA).
   Para texto y enlaces sobre blanco: `--naranja-700` = `#B94102` (5,50:1).
5. El logotipo **no se re-teclea nunca**: es un trazado vectorial, no una fuente.
6. Nunca poner el símbolo suelto al lado del logotipo normal: el nodo se duplicaría.
   Para eso está `nodbu-lockup-horizontal.svg`, que lleva la O neutra.

## Licencias

Tipografías **Outfit**, **Inter** y **JetBrains Mono**: SIL Open Font License 1.1.
Se pueden incrustar en web, app y documentos, y redistribuir con el kit.
