import type { Metadata } from 'next';
import { LegalShell } from '@/components/LegalShell';
import { site } from '@/content/site';
import { absoluteUrl } from '@/lib/seo';

/**
 * CONTENIDO BASE, NO ASESORAMIENTO JURIDICO.
 *
 * Datos del titular ya rellenados (persona natural con NIT colombiano y
 * domicilio en Bogota). Al ser titular colombiano que ademas capta datos de
 * residentes en Espana, conviven dos marcos: la LSSI-CE espanola por dirigir el
 * servicio a Espana, y la ley colombiana como ley del domicilio del titular.
 * Que lo revise un abogado antes de publicar.
 */

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: `Datos identificativos del titular de ${site.domain}, condiciones de uso del sitio y régimen de propiedad intelectual.`,
  alternates: { canonical: absoluteUrl('/aviso-legal') },
  robots: { index: true, follow: true },
};

export default function AvisoLegalPage() {
  return (
    <LegalShell eyebrow="Legal" title="Aviso legal" updatedAt="Julio de 2026">
      <p>
        Este aviso regula el acceso y el uso del sitio web {site.domain}. Al navegar por él
        aceptas estas condiciones. Se publica en cumplimiento de la Ley 34/2002 de Servicios de la
        Sociedad de la Información y de Comercio Electrónico (LSSI-CE).
      </p>

      <h2>Datos del titular</h2>
      <ul>

        <li>
          <strong>Correo de contacto:</strong>{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          <strong>Nombre comercial:</strong> {site.name}
        </li>
        <li>
          <strong>Dominio:</strong> {site.domain}
        </li>
      </ul>

      <h2>Objeto del sitio</h2>
      <p>
        {site.domain} es un sitio informativo sobre los servicios de automatización e integración
        de sistemas que presta {site.name}. No es una tienda: desde aquí no se contrata ni se paga
        nada. Cualquier contratación se formaliza aparte, por escrito y con presupuesto aceptado.
      </p>

      <h2>Condiciones de uso</h2>
      <p>Al usar este sitio te comprometes a:</p>
      <ul>
        <li>No emplearlo para fines contrarios a la ley o a estas condiciones.</li>
        <li>No intentar dañar el sitio, saturarlo ni acceder a partes no públicas.</li>
        <li>
          Facilitar datos veraces en el formulario de contacto y no suplantar la identidad de
          otra persona o empresa.
        </li>
      </ul>

      <h2>Propiedad intelectual e industrial</h2>
      <p>
        Los textos, el diseño, el código, la marca {site.name} y su logotipo pertenecen al titular
        del sitio o cuentan con licencia para su uso. No se permite reproducirlos, distribuirlos ni
        transformarlos sin autorización previa por escrito.
      </p>
      <p>
        Las marcas de terceros que aparecen en la sección de integraciones (herramientas de
        software con las que trabajamos) pertenecen a sus respectivos titulares. Se muestran
        únicamente a título informativo, para indicar compatibilidad. Su presencia no implica
        patrocinio, asociación ni respaldo por parte de esas empresas.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        Cuidamos que la información publicada sea correcta y esté al día, pero no garantizamos que
        esté libre de errores. Los tiempos, plazos y escenarios que aparecen en la web son
        orientativos y no constituyen una oferta vinculante: el alcance concreto de cada proyecto
        se define en su propuesta.
      </p>
      <p>
        Este sitio puede enlazar a páginas de terceros (por ejemplo, WhatsApp). No controlamos su
        contenido y no respondemos de él.
      </p>

      <h2>Protección de datos</h2>
      <p>
        El tratamiento de los datos que dejas en el formulario se explica en la{' '}
        <a href="/privacidad/">política de privacidad</a>. El responsable de datos es{' '}
        [NOMBRE FISCAL] y el correo de contacto para ejercer
        tus derechos es <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>Legislación aplicable</h2>
      <p>
        El titular tiene su domicilio en Colombia, de modo que estas condiciones se rigen con
        carácter general por la legislación colombiana y las controversias se someten a los
        jueces y tribunales de Bogotá.
      </p>
      <p>
        Ahora bien, el sitio se dirige también a usuarios en España: en lo relativo a servicios
        de la sociedad de la información resulta aplicable la Ley 34/2002 (LSSI-CE), y el
        tratamiento de datos personales de residentes en la Unión Europea se rige por el RGPD,
        tal y como se detalla en la <a href="/privacidad/">política de privacidad</a>. Si eres
        consumidor y resides en la Unión Europea, conservas el derecho a acudir a los tribunales
        de tu lugar de residencia; nada de lo anterior te lo quita.
      </p>
    </LegalShell>
  );
}
