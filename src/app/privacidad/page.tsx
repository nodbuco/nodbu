import type { Metadata } from 'next';
import { LegalShell } from '@/components/LegalShell';
import { site } from '@/content/site';
import { absoluteUrl } from '@/lib/seo';

/**
 * CONTENIDO BASE, NO ASESORAMIENTO JURIDICO.
 *
 * Datos del responsable ya rellenados. Que lo revise quien lleve la asesoria:
 * los plazos de conservacion y la base juridica dependen de como se traten los
 * datos en la practica. El responsable es colombiano y capta datos de
 * residentes en Espana, asi que aplican a la vez el RGPD y la Ley 1581 de 2012.
 *
 * Incluye una seccion propia sobre el tratamiento de datos de WhatsApp
 * (distinta del formulario de contacto de este sitio), necesaria para el App
 * Review de Meta como Tech Provider de WhatsApp Business. Que la revise
 * tambien la asesoria antes de dar el review por bueno.
 */

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description:
    'Cómo trata NODBU los datos del formulario de contacto y de las conversaciones de WhatsApp Business: para qué se usan, cuánto se guardan y cómo pedir que se borren.',
  alternates: { canonical: absoluteUrl('/privacidad') },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <LegalShell eyebrow="Legal" title="Política de privacidad" updatedAt="Agosto de 2026">
      <p>
        Esta política explica qué datos recogemos cuando escribes a {site.name}, para qué los
        usamos y qué puedes exigirnos en cualquier momento. Está redactada conforme al Reglamento
        General de Protección de Datos (RGPD, Reglamento UE 2016/679), porque captamos datos de
        residentes en España, y conforme a la Ley 1581 de 2012 de Colombia, por ser esa la
        residencia del responsable. Si vives en otro país de Latinoamérica, se te aplican las
        mismas garantías.
      </p>

      <h2>Quién es responsable de tus datos</h2>
      <ul>

        <li>
          <strong>Correo de contacto para privacidad:</strong>{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          <strong>Sitio web:</strong> {site.domain}
        </li>
      </ul>

      <h2>Qué datos recogemos</h2>
      <p>Solo los que tú escribes en el formulario de contacto:</p>
      <ul>
        <li>Nombre</li>
        <li>Correo electrónico</li>
        <li>Empresa</li>
        <li>País</li>
        <li>La descripción del proceso que quieres automatizar</li>
      </ul>
      <p>
        No usamos cookies de seguimiento propias ni creamos perfiles publicitarios con esta
        información. Si en el futuro activamos herramientas de medición, esta página se
        actualizará antes de hacerlo.
      </p>

      <h2>Tratamiento de datos de WhatsApp</h2>
      <p>
        {site.name} opera instancias de software de mensajería de código abierto para sus clientes
        empresariales, conectadas a la Plataforma de WhatsApp Business de Meta. Esta sección
        describe ese tratamiento, distinto del formulario de contacto de este sitio web.
      </p>

      <h3>Qué datos recibimos</h3>
      <p>
        Cuando una empresa cliente conecta su número de WhatsApp Business a través de{' '}
        {site.name}, nuestra plataforma recibe y almacena:
      </p>
      <ul>
        <li>
          <strong>El número de teléfono y el nombre de perfil de WhatsApp</strong> de las personas
          que escriben a esa empresa.
        </li>
        <li>
          <strong>El contenido de los mensajes intercambiados:</strong> texto, imágenes, audio,
          vídeo, documentos y ubicaciones.
        </li>
        <li>
          <strong>Metadatos de los mensajes:</strong> fecha, hora y estado de entrega y lectura.
        </li>
        <li>
          <strong>El identificador de la cuenta de WhatsApp Business</strong> y del número de
          teléfono comercial del cliente.
        </li>
        <li>
          Si la empresa cliente activa el <strong>modo de coexistencia</strong> y da su
          consentimiento expreso en su propia aplicación de WhatsApp Business, también podemos
          recibir su agenda de contactos de WhatsApp y su historial de conversaciones de los 180
          días anteriores. Esa sincronización solo ocurre si la empresa la autoriza desde su
          teléfono; puede negarse y el servicio funciona igual.
        </li>
      </ul>

      <h3>Quién es responsable de esos datos</h3>
      <p>
        La empresa cliente es la responsable del tratamiento de las conversaciones con sus propios
        clientes. {site.name} actúa como encargado del tratamiento: tratamos esos datos únicamente
        siguiendo las instrucciones de la empresa cliente y para prestarle el servicio contratado.
        Meta Platforms actúa como proveedor de la infraestructura de mensajería. El tratamiento que
        Meta hace de estos datos se rige por sus propias políticas.
      </p>

      <h3>Dónde se almacenan</h3>
      <p>
        Los mensajes se almacenan en la instancia del cliente, alojada de forma segura en
        servidores de Hostinger ubicados en Estados Unidos. Cada cliente tiene su propia instancia
        privada; no mezclamos datos de conversaciones entre clientes ni compartimos recursos de
        bases de datos.
      </p>

      <h3>Cuánto tiempo los conservamos</h3>
      <p>
        Conservamos las conversaciones mientras dure la relación contractual con la empresa
        cliente. Al terminar el contrato, entregamos una exportación completa de la información al
        cliente y procedemos a la eliminación definitiva de los datos de nuestros servidores en un
        plazo máximo de 30 días naturales. La empresa cliente puede eliminar conversaciones
        concretas en cualquier momento desde su propia instancia.
      </p>

      <h3>Para qué NO usamos estos datos</h3>
      <p>
        No vendemos, cedemos ni alquilamos el contenido de los mensajes. No lo usamos para
        publicidad, ni para segmentación, ni para entrenar modelos de inteligencia artificial
        propios o de terceros. No lo agregamos con datos de otros clientes.
      </p>

      <h3>Cómo ejercer tus derechos</h3>
      <p>
        Si escribiste a una empresa que usa {site.name} y quieres acceder, rectificar o eliminar
        tus datos, dirígete primero a esa empresa, que es la responsable del tratamiento. También
        puedes escribirnos a <a href={`mailto:${site.email}`}>{site.email}</a> y trasladaremos tu
        solicitud a la empresa correspondiente en un plazo máximo de 15 días hábiles. Tratamos
        estos datos conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de la República de
        Colombia, y al Reglamento (UE) 2016/679 cuando resulta aplicable.
      </p>

      <h2>Para qué los usamos y con qué base legal</h2>
      <ul>
        <li>
          <strong>Responder a tu consulta y preparar una propuesta.</strong> Base legal: tu
          consentimiento, que das al marcar la casilla del formulario (art. 6.1.a del RGPD), y las
          gestiones previas a un contrato que tú solicitas (art. 6.1.b).
        </li>
        <li>
          <strong>Mantener el registro de la conversación comercial.</strong> Base legal: nuestro
          interés legítimo en poder acreditar qué se habló y cuándo (art. 6.1.f).
        </li>
      </ul>
      <p>
        No usamos tus datos para enviarte publicidad de terceros ni los vendemos a nadie. Nunca.
      </p>

      <h2>Cuánto tiempo los guardamos</h2>
      <p>
        Este plazo es el del formulario de contacto de este sitio web. Las conversaciones de
        WhatsApp se rigen por el plazo propio que describe{' '}
        <strong>Tratamiento de datos de WhatsApp</strong>, más arriba.
      </p>
      <p>
        Si no llegamos a trabajar juntos, borramos tus datos <strong>a los 24 meses</strong> del
        último contacto. Si contratas, se conservan mientras dure la relación y después el plazo
        que exijan las obligaciones fiscales y mercantiles aplicables. Puedes pedir que los
        borremos antes escribiendo a <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Quién más puede ver tus datos</h2>
      <p>
        Para el formulario de contacto de este sitio web usamos proveedores que actúan como
        encargados del tratamiento y solo tratan los datos para prestarnos su servicio:
      </p>
      <ul>
        <li>
          <strong>Web3Forms</strong> — entrega el contenido del formulario en nuestro correo.
        </li>
        <li>
          <strong>Proveedor de correo electrónico</strong> — donde recibimos y guardamos el mensaje.
        </li>
        <li>
          <strong>Hostinger</strong> — alojamiento del sitio web.
        </li>
      </ul>
      <p>
        Alguno de estos proveedores puede tratar datos fuera del Espacio Económico Europeo. En ese
        caso la transferencia se ampara en las Cláusulas Contractuales Tipo aprobadas por la
        Comisión Europea o en una decisión de adecuación.
      </p>
      <p>
        Para el papel de Meta Platforms como proveedor de la infraestructura de mensajería de
        WhatsApp, ver <strong>Tratamiento de datos de WhatsApp</strong>, más arriba.
      </p>

      <h2>Qué derechos tienes</h2>
      <p>
        Puedes ejercer en cualquier momento y gratis los derechos de <strong>acceso</strong>,{' '}
        <strong>rectificación</strong>, <strong>supresión</strong>, <strong>oposición</strong>,{' '}
        <strong>limitación del tratamiento</strong>, <strong>portabilidad</strong> y{' '}
        <strong>retirada del consentimiento</strong>.
      </p>
      <p>
        Escribe a <a href={`mailto:${site.email}`}>{site.email}</a> indicando qué derecho quieres
        ejercer. Respondemos como máximo en un mes. Si crees que no hemos atendido bien tu
        petición, puedes reclamar ante la Agencia Española de Protección de Datos (
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
          aepd.es
        </a>
        ) o ante la autoridad de control de tu país.
      </p>

      <h2>Seguridad</h2>
      <p>
        El sitio se sirve siempre por HTTPS. El acceso al buzón donde llegan los formularios está
        restringido a las personas de {site.name} que atienden consultas comerciales. En los
        proyectos que implementamos, las automatizaciones se montan dentro de las cuentas del
        cliente, con los permisos mínimos necesarios.
      </p>

      <h2>Cambios en esta política</h2>
      <p>
        Si cambia algo relevante, actualizaremos esta página y la fecha de revisión de arriba. Te
        recomendamos volver a leerla si vuelves a escribirnos pasado un tiempo.
      </p>
    </LegalShell>
  );
}
