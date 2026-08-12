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
 */

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description:
    'Cómo trata NODBU los datos que dejas en el formulario de contacto: para qué se usan, cuánto se guardan y cómo pedir que se borren.',
  alternates: { canonical: absoluteUrl('/privacidad') },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <LegalShell eyebrow="Legal" title="Política de privacidad" updatedAt="Julio de 2026">
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
        Si no llegamos a trabajar juntos, borramos tus datos <strong>a los 24 meses</strong> del
        último contacto. Si contratas, se conservan mientras dure la relación y después el plazo
        que exijan las obligaciones fiscales y mercantiles aplicables. Puedes pedir que los
        borremos antes escribiendo a <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Quién más puede ver tus datos</h2>
      <p>
        Usamos proveedores que actúan como encargados del tratamiento y solo tratan los datos para
        prestarnos su servicio:
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
