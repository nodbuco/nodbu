# NODBU — Perfil completo

Documento de contexto portátil. Resume qué es NODBU y todo lo que ofrece, para
usarlo como referencia en otros proyectos (propuestas, nuevas webs, campañas,
sesiones de IA, material comercial).

Todo lo que hay aquí está extraído del sitio en producción (`nodbu.com`), no de
memoria. **La fuente de verdad sigue siendo el repositorio de la web**
(`src/content/`): si algo cambia allí, este documento queda desactualizado.

Última extracción: agosto de 2026.

---

## 1. Qué es NODBU

**NODBU es una agencia de automatización de procesos y desarrollo a medida para
PyMEs en España y Latinoamérica.**

Conecta entre sí las herramientas que una empresa ya usa —CRM, correo, hojas de
cálculo, facturación y WhatsApp— para que la información pase de una a otra sin
que nadie copie y pegue datos. Cuando lo que hace falta no existe, lo construye
a medida.

No vende licencias ni revende software de terceros. El trabajo es de
**diagnóstico, diseño e implantación**, y se cobra por proyecto.

### Los tres pilares

| Pilar | Qué cubre |
|---|---|
| **Automatización de procesos** | Cotizaciones, seguimiento de leads, reportes y coordinación interna que dejan de hacerse a mano. |
| **Integración entre sistemas** | Que el CRM, la facturación, el inventario y la mensajería compartan la misma información sin duplicarla. |
| **Desarrollo a medida** | Agentes de atención, sistemas de pedidos, paneles internos y páginas web cuando ninguna herramienta existente encaja. |

---

## 2. A quién sirve

Empresas pequeñas y medianas donde el trabajo administrativo lo hacen personas
que deberían estar haciendo otra cosa: comerciales que pasan pedidos a mano,
gerentes que arman el reporte del mes copiando celdas, equipos que responden lo
mismo veinte veces al día.

**El interlocutor habitual es el dueño o el gerente de operaciones, no un
departamento de sistemas.** Por eso todo lo que se publica está escrito sin
tecnicismos.

Trabajo **en remoto, en español**. La operación está radicada en Colombia y se
coordina por videollamada y mensajería.

---

## 3. Servicios

### Los seis servicios principales

Cada uno se comunica por el resultado observable, no por la tecnología.

**1. Captación y seguimiento de leads**
Cada contacto que llega por la web, WhatsApp o una campaña entra solo en el CRM,
con su origen y su recordatorio de seguimiento puesto.

**2. Cotizaciones y facturación**
Se dejan de copiar precios a mano: la cotización sale con el formato de la
empresa, se envía firmada y se convierte en factura sin volver a escribir los
datos.

**3. Onboarding de clientes**
Se acabó el "¿alguien mandó ya el contrato?": el alta dispara correos, carpetas,
accesos y tareas en el orden correcto.

**4. Reportes automáticos**
El lunes a las 8 están en el correo las ventas, los pendientes y lo que se
atascó, sin que nadie arme la hoja de cálculo.

**5. Atención por WhatsApp**
Las preguntas repetidas se responden solas y las que importan llegan al
comercial correcto con el historial del cliente delante.

**6. Sincronización entre sistemas**
Se cambia un dato en un sitio y aparece en el resto. Se terminan las tres
versiones distintas del mismo cliente.

### 7. Software a la medida

Cuando el proceso no encaja en ninguna herramienta del mercado, se construye
desde cero. Lo más solicitado:

- **Chatbots de ventas** — responden las preguntas de siempre a cualquier hora,
  preguntan lo que hay que preguntar y pasan la conversación cuando hay
  intención real de comprar.
- **Gestión de pedidos** — un solo sitio donde se ve qué se pidió, qué salió y
  qué falta, con el estado al día sin que nadie lo escriba a mano.
- **Páginas web** — carga rápida, buena lectura en móvil y cada formulario va al
  CRM, no a un correo que nadie abre.

### Ejemplo de flujo completo (el que se muestra en la web)

Cadena real de principio a fin, tal como se ilustra en la sección "Piloto
automático":

1. **Cliente entra a la web** — llena el formulario pidiendo presupuesto.
2. **Agente IA responde** — clasifica al lead y envía la cotización en segundos.
3. **Notificación al equipo** — el equipo recibe un resumen listo para cerrar.
4. **CRM actualizado** — se crea el contacto y se mueve en el embudo.
5. **Inventario reservado** — se aparta stock y se genera orden de despacho.
6. **Dashboard en tiempo real** — conversión, tiempos y costos al instante.

---

## 4. Capacidad de WhatsApp Business (Plataforma de Meta)

NODBU **opera instancias de software de mensajería de código abierto para sus
clientes empresariales, conectadas a la Plataforma de WhatsApp Business de
Meta.**

> **Estado:** en trámite de App Review con Meta como proveedor de tecnología
> (Tech Provider) de WhatsApp Business. No describirlo como aprobado hasta que
> Meta lo confirme.

### Cómo funciona el modelo

- Cada cliente tiene **su propia instancia privada**. No se mezclan datos de
  conversaciones entre clientes ni se comparten recursos de bases de datos.
- Las instancias se alojan en **servidores de Hostinger ubicados en Estados
  Unidos**.
- **La empresa cliente es la responsable del tratamiento** de las conversaciones
  con sus propios clientes. **NODBU actúa como encargado del tratamiento**, y
  **Meta Platforms como proveedor de la infraestructura** de mensajería.

### Datos que se tratan

Número de teléfono y nombre de perfil de quien escribe; contenido de los
mensajes (texto, imágenes, audio, vídeo, documentos, ubicaciones); metadatos
(fecha, hora, estado de entrega y lectura); identificador de la cuenta de
WhatsApp Business y del número comercial.

Con **modo de coexistencia** activado y consentimiento expreso de la empresa
desde su propia app, también agenda de contactos e historial de los 180 días
anteriores. Es opcional: el servicio funciona igual sin ello.

### Compromisos explícitos

- Conservación mientras dure el contrato. Al terminar: exportación completa al
  cliente y **eliminación definitiva en máximo 30 días naturales**.
- **No se vende, cede ni alquila** el contenido de los mensajes.
- **No se usa** para publicidad, segmentación ni para entrenar modelos de IA,
  propios o de terceros. No se agrega con datos de otros clientes.
- Marco legal: **Ley 1581 de 2012** y **Decreto 1377 de 2013** (Colombia), y
  **Reglamento (UE) 2016/679 (RGPD)** cuando resulta aplicable.

---

## 5. Planes

Tres niveles. **Sin precios cerrados publicados**: el precio sale del
diagnóstico.

### Automatización puntual — "Desde"
Para un proceso concreto que ya se sabe que está costando horas.
- Diagnóstico y dibujo del flujo
- Un proceso automatizado de principio a fin
- Conexión de hasta 3 herramientas
- Guía corta para el equipo
- 3 meses de soporte incluidos

### Operación conectada — "A medida" *(plan destacado)*
Para varias áreas que hoy no se hablan entre sí: ventas, administración y
entrega.
- Todo lo del plan anterior
- De 3 a 6 procesos automatizados
- Herramientas sin límite de número
- Reportes automáticos por correo
- Panel con el estado de cada flujo
- Formación en vivo con el equipo
- 6 meses de soporte incluidos

### Acompañamiento continuo — "Empresarial"
Para varias sedes o equipos, con procesos que cambian cada trimestre.
- Todo lo del plan anterior
- Revisión trimestral de procesos
- Persona de contacto asignada
- Tiempo de respuesta acordado por contrato
- Acuerdo de confidencialidad y tratamiento de datos
- Documentación técnica entregada

### Garantía de satisfacción

> Si el flujo no funciona como se acordó por escrito, se ajusta **sin cargo
> adicional** hasta que funcione. Un proyecto no se cierra hasta que hace lo que
> se dijo que iba a hacer.

Cubre que lo entregado haga lo acordado por escrito. **No cubre** cambios en
herramientas de terceros (precio, API, condiciones), modificaciones hechas por
el cliente o terceros tras la entrega, ni funcionalidades distintas de las
acordadas.

---

## 6. Cómo se trabaja (4 pasos)

| # | Fase | Duración | Qué pasa |
|---|---|---|---|
| 01 | **Diagnóstico gratuito** | 15 minutos | Se cuenta qué proceso come tiempo y se dice si se puede automatizar, cuánto ahorraría y qué no conviene tocar. Sin compromiso y sin propuesta comercial en esa llamada. |
| 02 | **Diseño del flujo** | 2 a 5 días | Un dibujo de qué pasa con cada dato: de dónde sale, dónde entra y qué ocurre si algo falla. Se revisa y aprueba antes de escribir una línea. Aquí se decide alcance y precio. |
| 03 | **Implementación** | 1 a 4 semanas | Se conectan las herramientas y se prueba con datos reales antes de encenderlo. El equipo recibe una guía corta. No se para la operación para hacer el cambio. |
| 04 | **Soporte y mejora continua** | Continuo | Se vigila que siga funcionando y se avisa desde NODBU si algo se rompe. Se ajusta al cambiar de herramienta o proceso. Cancelable cuando se quiera; todo lo hecho queda en las cuentas del cliente. |

---

## 7. Condiciones comerciales

### Pago
- Cotización individual tras la llamada de diagnóstico, con alcance, plazo y
  precio total. **Validez de 30 días.**
- **30%** al aceptar la cotización, como anticipo para iniciar.
- **70% restante** contra entrega y aceptación.
- **Servicios recurrentes** (mantenimiento, alojamiento de instancias, soporte):
  mensualidades o anualidades anticipadas.
- Precios en **COP (Pesos Colombianos)**, sin IVA salvo indicación expresa.

### Facturación
Factura electrónica conforme a la normativa colombiana. **Plazo de pago: 7 días
calendario** desde la emisión. El retraso faculta a suspender el servicio con
aviso de 3 días de antelación.

### Cancelación
- **Proyectos puntuales:** cancelables por escrito en cualquier momento. Se
  factura el trabajo realizado. El anticipo no es reembolsable una vez iniciado.
- **Servicios recurrentes:** cualquiera de las partes, por escrito, con **1 día
  de antelación**. Sin permanencia mínima ni penalización.
- **Datos al terminar:** exportación completa disponible hasta 30 días después.
  Pasado ese plazo se eliminan definitivamente.
- **Terminación por parte de NODBU:** inmediata si se usa para fines ilícitos,
  comunicaciones no solicitadas, o infringiendo políticas de plataformas de
  terceros (incluidas WhatsApp y Meta).

### Propiedad de lo entregado
Abonado el precio, **el cliente es titular** de las automatizaciones,
configuraciones y desarrollos hechos para su proyecto, y puede usarlos,
modificarlos y mantenerlos por su cuenta o con quien quiera.

NODBU conserva la titularidad de sus métodos, plantillas y componentes propios
previos o de uso general, y puede reutilizarlos. Esa reutilización **nunca**
incluye datos, contenidos ni información de negocio del cliente.

---

## 8. Herramientas que se integran

Las 21 marcas que se muestran en la web:

**Productividad y gestión:** Google Workspace, Slack, Notion, Asana,
Monday.com, Trello
**CRM y marketing:** HubSpot, Salesforce, Pipedrive, Mailchimp, ActiveCampaign
**Automatización:** Zapier, Make
**Pagos y comercio:** Stripe, MercadoPago, Shopify
**Mensajería y soporte:** WhatsApp, Meta, Zendesk
**Datos y formularios:** Excel, Typeform

> Estas son las más habituales, no una lista cerrada. Se conecta casi cualquier
> programa que tenga conexión con otros o permita exportar datos. Los sistemas
> antiguos o hechos a medida se revisan en el diagnóstico.

---

## 9. Cobertura geográfica

14 países: **España**, México, Colombia, Argentina, Chile, Perú, Ecuador,
Uruguay, Costa Rica, Panamá, República Dominicana, Guatemala, Paraguay, Bolivia.

Más opción "Otro país" en el formulario para quien escribe desde fuera de la
lista.

---

## 10. Objeciones frecuentes y sus respuestas

**¿Cuánto tarda?** Un proceso concreto, 1–2 semanas. Algo que toca varias áreas
(pedidos + facturación), 3–6 semanas. El plazo se da en la llamada gratuita
antes de decidir nada.

**¿Cuánto cuesta?** Depende de cuántos sistemas hay que conectar y de si
permiten conexión directa. **Precio cerrado por proyecto**, conocido antes de
empezar, sin cuotas ocultas. No cambia salvo ampliación de alcance por parte del
cliente.

**No uso ninguna de esas herramientas, ¿sirve igual?** Sí. Se conecta casi
cualquier programa con conexión o exportación. Si el sistema es antiguo o a
medida, se revisa en el diagnóstico y se dice con franqueza si se puede o si no
compensa.

**¿Y la seguridad de mis datos?** Todo se monta **dentro de las cuentas del
cliente**: conexiones y datos son suyos y quedan a su nombre. Accesos con
permisos mínimos, acuerdo de confidencialidad si se necesita, RGPD para
residentes en España. Al terminar la relación, el cliente se queda con todo
funcionando y NODBU pierde el acceso.

**¿Qué necesitan de mí?** Una llamada de 15 minutos, una revisión del flujo
dibujado (≈1 hora) y los accesos. Después, unas 2 horas repartidas durante la
implementación. **No hace falta nadie técnico en el equipo.**

**¿Y si algo deja de funcionar?** Los 3 primeros meses de soporte van incluidos:
se vigilan los flujos y se avisa desde NODBU, normalmente antes de que se note.
Pasado el plazo, o acompañamiento mensual, o quedarse con lo entregado, que
sigue siendo suyo y funcionando.

---

## 11. Identidad y contacto

| Campo | Valor |
|---|---|
| Nombre comercial | NODBU |
| Titular | Diego Alonso Torres Alvarado |
| NIT | 1005259304 |
| Domicilio | CR 1 G # 38 Sur - 09, Bogotá, Colombia |
| Web | https://nodbu.com |
| Correo | hola@nodbu.com |
| WhatsApp | +57 313 793 8618 |
| Agenda (demo 15 min) | https://cal.com/nodbu/15min |
| Rol del titular | Fundador de NODBU |

**Marco legal aplicable:** legislación colombiana como ley del domicilio del
titular; LSSI-CE (Ley 34/2002) por dirigir el servicio a España; RGPD para datos
de residentes en la UE; Ley 1581 de 2012 y Decreto 1377 de 2013 en Colombia.
Jurisdicción: Bogotá, salvo norma imperativa de consumo.

---

## 12. Presencia web

**Estructura del sitio:** landing con anclas (`/#servicios`, `/#como-funciona`,
`/#planes`, `/#faq`), más `/recursos/` (artículos), `/sobre-nodbu/`,
`/privacidad/`, `/aviso-legal/`, `/terminos/`, `/gracias/`.

**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion,
export estático a Hostinger, desplegado por GitHub Actions vía FTP.

**Contenido editorial** — 4 categorías de artículos:
- *Automatización* — procesos que dejan de hacerse a mano.
- *Inteligencia artificial* — qué hace hoy la IA en una PyME y qué todavía no.
- *Herramientas* — CRM, hojas de cálculo, facturación y mensajería.
- *Gestión* — cómo organizar el trabajo antes de automatizarlo.

Artículos publicados:
1. Cómo automatizar la atención por WhatsApp en una PyME *(automatización)*
2. Conectar Excel o Google Sheets con el CRM y la facturación *(herramientas)*
3. Qué procesos de una PyME se pueden automatizar de verdad *(gestión)*

Los artículos están optimizados también para buscadores con IA (ChatGPT Search,
Perplexity, Google AI Overviews, Claude). El sitio publica `/llms.txt` y
`/rss.xml`.

**Prueba social:** 6 reseñas reales publicadas con autorización expresa, con
foto, nombre y cargo. Perfiles: Consultora Senior de Sostenibilidad, Gerente de
Operaciones, Especialista en Logística Internacional, Director Comercial,
Abogada Litigante, Coordinador Clínico.

---

## 13. Cómo comunica NODBU (guía de tono)

Útil si se genera copy nuevo para otro proyecto y debe sonar igual.

**Español neutro, directo y concreto.** Se habla de lo que la persona controla
("tus cotizaciones"), nunca de cómo funciona el sistema por dentro.

**Los servicios se nombran por el resultado observable**, en segunda persona y
en pasado del problema: "Dejas de…", "Se acabó…". Nada de sustantivos
abstractos: debe entenderse qué cambia el lunes.

**Los botones dicen qué ocurre al pulsarlos** ("Hablar por WhatsApp", nunca
"Enviar"), y ese nombre se mantiene igual en todo el flujo.

### Prohibido
"Soluciones innovadoras", "transformación digital", "llevamos tu negocio al
siguiente nivel", "potencia", "revoluciona", "sinergia".

### Nunca inventar cifras
No se afirma ninguna estadística sin fuente real. Si se usa una estimación, va
marcada como tal (con "~" y su etiqueta). **Una garantía con cifra es una
obligación contractual**: no prometer "devolución del 100%", "en 30 días" ni
"gratis para siempre".

---

## 14. Lo que NODBU NO hace

Importante para no prometer de más en material comercial:

- **No vende licencias** de software de terceros ni revende software ajeno.
  Cuando un proyecto necesita herramientas de terceros, sus licencias y cuotas
  las contrata el cliente a su nombre.
- **No responde** de precios, cambios de condiciones ni interrupciones de
  servicios de terceros.
- **No es una tienda:** desde la web no se contrata ni se paga nada. Toda
  contratación se formaliza aparte, por escrito y con presupuesto aceptado.
- **No usa los datos de conversaciones** para publicidad, segmentación ni
  entrenamiento de modelos de IA.
- **No publica el nombre o logotipo de un cliente** como referencia comercial
  sin su autorización expresa y previa.
- **No responde** de daños indirectos, lucro cesante ni pérdidas por
  indisponibilidad de servicios de terceros ajenos a su control.
