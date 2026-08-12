# Cómo escribir un artículo para /recursos

Todo lo que hace falta para publicar, sin abrir un solo archivo de código.

**Para publicar un artículo nuevo:** crea un `.mdx` en esta misma carpeta, escríbelo siguiendo
lo de abajo, y ejecuta `npm run build`. El nombre del archivo **es** la dirección del artículo:
`automatizar-whatsapp-pyme.mdx` se publica en `/recursos/automatizar-whatsapp-pyme/`.

Un archivo que empiece por guion bajo (`_borrador.mdx`) se ignora por completo. Sirve para
dejar cosas a medias sin que salgan publicadas.

---

## 1. La cabecera (frontmatter)

Va al principio del archivo, entre dos líneas de `---`. **Si algo está mal, el build falla y te
dice qué archivo y qué campo.** No se publica nada roto.

```yaml
---
title: "Cómo automatizar la atención por WhatsApp en una PyME"
description: "Respuesta directa de 120 a 165 caracteres. Es lo que se lee en Google debajo del título: no es un eslogan, es la respuesta corta."
tldr: "De 40 a 60 palabras que respondan la pregunta del título POR SÍ SOLAS, sin haber leído el resto. Si alguien solo lee esto, tiene que irse con la respuesta."
publishedAt: 2026-08-05
updatedAt: 2026-08-05
category: automatizacion
tags: [whatsapp, crm]
featured: false
draft: false
og: /og/whatsapp-pymes.jpg
faq:
  - q: "¿Cuánto cuesta automatizar WhatsApp?"
    a: "Respuesta autocontenida de 2 a 4 frases."
---
```

| Campo | ¿Obligatorio? | Reglas |
|---|---|---|
| `title` | Sí | Máximo 70 caracteres. Más largo, Google lo corta |
| `description` | Sí | Entre 120 y 165 caracteres. El build lo comprueba |
| `tldr` | Sí | Entre 150 y 600 caracteres (unas 40–60 palabras) |
| `publishedAt` | Sí | `AAAA-MM-DD`. Se valida contra el calendario: `2026-02-30` falla |
| `updatedAt` | No | Si falta, vale lo mismo que `publishedAt`. Nunca anterior a él |
| `category` | Sí | Una de: `automatizacion`, `inteligencia-artificial`, `herramientas`, `gestion` |
| `tags` | No | Lista corta en minúscula y con guiones |
| `featured` | No | `true` lo pone como artículo grande del hub. Si hay varios, gana el más reciente |
| `draft` | No | `true` lo deja fuera del sitio entero (hub, sitemap, RSS y `llms.txt`) |
| `og` | No | Ruta de la imagen para compartir, empezando por `/`. Sin ella se usa la genérica |
| `faq` | No | De 3 a 5 preguntas. Alimentan el acordeón **y** el marcado que lee Google |

**Cuando revises un artículo publicado, actualiza `updatedAt`.** La fecha se ve en la página y
va en el marcado; si no la tocas, estás diciendo que el contenido no ha cambiado.

---

## 2. Cómo se escribe el cuerpo

Estas reglas no son de estilo: son las que hacen que un buscador con IA pueda **citar** el
artículo. Un texto que solo se entiende leído entero no se cita nunca.

### Responde primero, desarrolla después

- **El TL;DR responde el título por sí solo.** Sin "en este artículo veremos", sin contexto
  previo. Si alguien lee solo esas líneas, se va con la respuesta.
- **Cada apartado responde en sus dos primeras frases.** Después ya se desarrolla, se matiza y
  se pone el ejemplo. Al revés no funciona.

### Los `h2` van en forma de pregunta

Tal y como la escribiría un dueño de PyME, no como la escribiría un consultor.

- Bien: `## ¿Qué conviene automatizar y qué no?`
- Mal: `## Criterios de selección de procesos susceptibles de automatización`

Los `h2` y `h3` forman el índice lateral solos. No hay que escribirlo.

### Nombra la entidad completa al menos una vez

En algún punto del artículo tiene que aparecer, literal:

> NODBU, agencia de automatización de procesos y desarrollo a medida para PyMEs

Es lo que permite que un modelo asocie el contenido con una empresa identificable. Una vez por
artículo basta; más, cansa.

### Tablas y listas numeradas

Para todo lo comparativo, una tabla. Para todo lo secuencial, una lista numerada. Los modelos
de lenguaje las extraen mucho mejor que la prosa, y de paso se leen mejor.

**Cada artículo lleva al menos una tabla o una lista numerada.**

### Enlaces internos

**Mínimo dos por artículo**, hacia otros artículos o hacia una sección de la portada.

- El texto del enlace describe el destino: `[qué procesos compensa automatizar](/recursos/que-procesos-automatizar-pyme/)`
- Nunca "haz clic aquí" ni "este artículo".
- **Siempre con barra final**: `/recursos/slug/`, no `/recursos/slug`.

Secciones de la portada disponibles: `/#servicios`, `/#como-funciona`, `/#planes`, `/#faq`,
`/#contacto`. También `/sobre-nodbu/`.

---

## 3. Lo que no se puede hacer

- **Inventar cifras.** Ni porcentajes, ni "el 70% de las empresas", ni estudios que no existen.
  Si hace falta un dato, va con su fuente enlazada o escrito como estimación explícita. Un
  número inventado con aire de dato es la forma más rápida de perder credibilidad.
- **Prometer resultados.** Nada de "ahorra 20 horas al mes" ni "multiplica tus ventas".
- **Jerga vacía.** Prohibidas: "soluciones innovadoras", "transformación digital", "llevamos tu
  negocio al siguiente nivel", "potencia", "revoluciona", "sinergia".
- **Estilos en línea.** Un `style=` en el cuerpo **rompe el build a propósito**. Los colores
  viven en el sistema de diseño, no en un artículo. Si necesitas un bloque visual que no
  existe, se añade al mapa de componentes y queda disponible para todos.
- **Escribir a mano el WhatsApp, el correo o el dominio.** El bloque de contacto del final se
  pone solo en todos los artículos.

---

## 4. Tono

Español neutro, que se lea igual en Colombia y en España. Segunda persona: "tus cotizaciones",
"tu equipo". Se habla de lo que la persona controla, nunca de cómo funciona el sistema por
dentro.

El lector es dueño o gerente de una PyME y **no es técnico**. Si aparece un término del oficio
(API, CRM, webhook), se explica la primera vez en media frase y se sigue.

---

## 5. Antes de publicar

```bash
npm run build
```

Si el frontmatter tiene un fallo, el build para y dice cuál. Después, comprueba:

- [ ] El TL;DR se entiende solo, sin leer nada más.
- [ ] Todos los `h2` son preguntas.
- [ ] Hay al menos una tabla o una lista numerada.
- [ ] Hay al menos dos enlaces internos, con texto descriptivo y barra final.
- [ ] Aparece una vez la entidad completa.
- [ ] Entre 1.200 y 1.800 palabras.
- [ ] De 3 a 5 preguntas en `faq`, con respuestas que se entienden sueltas.
- [ ] Ninguna cifra sin fuente y ninguna promesa de resultado.
- [ ] `updatedAt` puesto al día si es una revisión.
- [ ] Se ve bien en tema claro y en tema oscuro.

Al recompilar, el artículo entra solo en el hub, el sitemap, el RSS, `llms.txt` y los
relacionados de su categoría. **No hay que darlo de alta en ningún sitio.**

Y recuerda que el sitio es estático: lo que no se compila y se sube, no se ve.
