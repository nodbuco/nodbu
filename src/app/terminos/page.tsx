import type { Metadata } from 'next';
import { LegalShell } from '@/components/LegalShell';
import { guarantee } from '@/content/plans';
import { site } from '@/content/site';
import { absoluteUrl } from '@/lib/seo';

/**
 * CONTENIDO BASE, NO ASESORAMIENTO JURIDICO. Que lo revise quien lleve la
 * asesoria antes de darlo por bueno.
 *
 * POR QUE ESTA PAGINA NO REPITE EL AVISO LEGAL. /aviso-legal/ ya cubre las
 * condiciones de USO DEL SITIO WEB: propiedad intelectual, responsabilidad
 * sobre los contenidos y legislacion aplicable. Repetir eso aqui seria
 * contenido duplicado, que penaliza a las dos paginas.
 *
 * Esto es lo otro: las condiciones de CONTRATACION DEL SERVICIO. Que se
 * contrata exactamente, como se acuerda, quien es dueno de lo que se entrega y
 * que pasa si algo se tuerce.
 *
 * LOS BLOQUES MARCADOS CON .placeholder SON LOS UNICOS QUE FALTAN, y faltan a
 * proposito: son decisiones comerciales del titular (plazos de pago, plazos de
 * entrega, cancelaciones) que este proyecto no puede inventarse. Una condicion
 * de pago inventada es una obligacion contractual inventada. Rellenalos antes
 * de enlazar esta pagina desde ningun sitio comercial.
 */

export const metadata: Metadata = {
  title: 'Términos y condiciones del servicio',
  description:
    'Condiciones de contratación de los servicios de NODBU: qué se contrata, cómo se acuerda el ' +
    'alcance, de quién es lo que se entrega y qué garantía se ofrece.',
  alternates: { canonical: absoluteUrl('/terminos') },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Términos y condiciones del servicio"
      updatedAt="Agosto de 2026"
    >
      <p>
        Estas condiciones regulan la contratación de los servicios de {site.name}. Las condiciones
        de uso de este sitio web, la propiedad intelectual de sus contenidos y la legislación
        aplicable están en el <a href="/aviso-legal/">aviso legal</a>, y el tratamiento de tus
        datos, en la <a href="/privacidad/">política de privacidad</a>.
      </p>

      <h2>Quién presta el servicio</h2>
      <ul>

        <li>
          <strong>Correo de contacto:</strong> <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
      </ul>

      <h2>Qué se contrata</h2>
      <p>
        {site.name} presta servicios de automatización de procesos, integración entre sistemas y
        desarrollo de software a la medida. El servicio es de diagnóstico, diseño e implantación:
        no se venden licencias de software de terceros ni se revende software ajeno.
      </p>
      <p>
        Cuando un proyecto necesita herramientas de terceros (plataformas de automatización, CRM,
        pasarelas de pago o servicios de mensajería), sus licencias, cuotas y condiciones son
        ajenas a {site.name} y las contrata el cliente a su nombre. {site.name} no responde de sus
        precios, sus cambios de condiciones ni sus interrupciones de servicio.
      </p>

      <h2>Cómo se acuerda el alcance</h2>
      <p>
        Todo proyecto empieza con una llamada de diagnóstico gratuita de {site.callMinutes}{' '}
        minutos, sin compromiso. A partir de ahí, el alcance se fija <strong>por escrito</strong>{' '}
        antes de empezar: qué procesos se automatizan, con qué herramientas, qué entrega
        {' '}{site.name} y qué tiene que aportar el cliente.
      </p>
      <p>
        Ese documento escrito es el que manda. Lo que no esté recogido ahí no forma parte del
        alcance contratado, y cualquier ampliación posterior se acuerda y se presupuesta aparte.
      </p>

      <h2>Qué tiene que aportar el cliente</h2>
      <p>
        Para poder implantar un flujo hacen falta accesos a los sistemas implicados y una persona
        de contacto que pueda decidir. El cliente se compromete a facilitar ambos, y a que la
        información y los accesos que entrega sean suyos o disponga de autorización para cederlos.
      </p>
      <p>
        Los retrasos derivados de la falta de accesos, de respuesta o de decisión por parte del
        cliente no son imputables a {site.name} y desplazan los plazos acordados.
      </p>

      <h2>Precio, pago y plazos</h2>
      <p>
        Cada proyecto se presupuesta de forma individual, porque el trabajo depende de los sistemas
        que ya tenga la empresa. El presupuesto aceptado por escrito es el precio del proyecto.
      </p>
      <p>
        <span className="placeholder">Pendiente de rellenar</span> — forma de pago, calendario de
        facturación, impuestos aplicables y plazo de entrega estándar.
      </p>

      <h2>Cancelación</h2>
      <p>
        <span className="placeholder">Pendiente de rellenar</span> — condiciones de cancelación por
        cada parte y tratamiento del trabajo ya ejecutado en el momento de la cancelación.
      </p>

      <h2>De quién es lo que se entrega</h2>
      <p>
        Una vez abonado el precio acordado, el cliente es titular de las automatizaciones,
        configuraciones y desarrollos hechos específicamente para su proyecto, y puede usarlos,
        modificarlos y mantenerlos por su cuenta o con quien quiera.
      </p>
      <p>
        {site.name} conserva la titularidad de sus métodos de trabajo, plantillas y componentes
        propios previos o de uso general, y puede reutilizarlos en otros proyectos. Esa reutilización
        nunca incluye datos, contenidos ni información de negocio del cliente.
      </p>

      <h2>Confidencialidad</h2>
      <p>
        Toda la información de negocio a la que {site.name} accede durante un proyecto es
        confidencial y no se comparte con terceros ni se usa para otra cosa que ejecutar el
        encargo. Esta obligación sigue vigente después de terminar el proyecto.
      </p>
      <p>
        Publicar el nombre o el logotipo de un cliente como referencia comercial requiere su
        autorización expresa y previa.
      </p>

      <h2>Garantía</h2>
      <p>
        <strong>{guarantee.title}.</strong> {guarantee.text}
      </p>
      <p>
        La garantía cubre que lo entregado haga lo que se acordó por escrito. No cubre cambios en
        las herramientas de terceros de las que depende el flujo (cambios de precio, de API o de
        condiciones), ni modificaciones hechas por el cliente o por terceros después de la entrega,
        ni funcionalidades distintas de las acordadas.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        {site.name} responde de la correcta ejecución de los servicios contratados. No responde de
        los daños indirectos, del lucro cesante ni de las pérdidas derivadas de la indisponibilidad
        de servicios de terceros ajenos a su control.
      </p>
      <p>
        El cliente sigue siendo responsable del cumplimiento normativo de su propia actividad,
        incluida la protección de los datos personales que trate a través de los flujos
        implantados.
      </p>

      <h2>Cambios en estas condiciones</h2>
      <p>
        Estas condiciones pueden actualizarse. A un proyecto en curso se le aplican las que
        estuvieran vigentes al aceptar su presupuesto, no las posteriores. La fecha de la última
        revisión aparece al principio de esta página.
      </p>

      <h2>Legislación aplicable</h2>
      <p>
        El titular tiene su domicilio en {site.legalEntity.country}, de modo que estas condiciones
        se rigen por la legislación colombiana. Para cualquier controversia, y salvo que una norma
        imperativa de protección del consumidor disponga otra cosa, las partes se someten a los
        jueces y tribunales de {site.legalEntity.city}.
      </p>
    </LegalShell>
  );
}
