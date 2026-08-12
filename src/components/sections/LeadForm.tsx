'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useId, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { countries, OTHER_COUNTRY } from '@/content/countries';
import { leadForm } from '@/content/form';
import { site } from '@/content/site';
import { track } from '@/lib/analytics';
import { LeadError, submitLead } from '@/lib/submit-lead';
import { cn } from '@/lib/cn';

/**
 * Formulario de contacto. Se envia desde el navegador a Web3Forms: no hay
 * backend porque el sitio es un export estatico.
 *
 * Criterio de los mensajes de error: dicen QUE paso y COMO se arregla, en una
 * linea, sin pedir perdon. "Falta el nombre" no ayuda; "Escribe tu nombre para
 * saber cómo dirigirnos a ti" si.
 *
 * El envio correcto NO se queda en un estado local: navega a `/gracias/`
 * (site.routes.thanks). Esa pagina, no un panel que sustituye al formulario,
 * es lo que da una URL medible en GTM como conversion.
 */

type Status = 'idle' | 'submitting' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'company' | 'country' | 'process' | 'consent', string>>;

/**
 * Solo comprueba FORMATO. A proposito no hay lista de dominios permitidos ni
 * rechazados: muchisimas PyMEs de Latinoamerica gestionan el negocio desde
 * Gmail o Hotmail, y rechazar esas cuentas seria rechazar clientes reales.
 * Si alguna vez alguien propone "solo correos corporativos", la respuesta es no.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const field =
  'w-full rounded-xl border bg-paper/[.03] px-4 py-3 text-body-s text-paper placeholder:text-paper-faint ' +
  'transition-colors focus:border-paper/25 focus:outline-none focus-visible:outline-none';

export function LeadForm() {
  const uid = useId();
  const router = useRouter();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const country = String(data.get('country') ?? '');
    const process = String(data.get('process') ?? '').trim();
    const consent = data.get('consent');

    if (name.length < 2) next.name = 'Escribe tu nombre para saber cómo dirigirnos a ti.';
    if (!EMAIL_RE.test(email))
      next.email = 'Revisa el correo: necesitamos una dirección con @ y dominio para responderte.';
    if (company.length < 2) next.company = 'Escribe el nombre de tu empresa, aunque seas tú solo.';
    if (!country) next.country = 'Elige tu país para atenderte en tu horario.';
    if (process.length < 10)
      next.process = 'Cuéntanos el proceso en una frase; con eso preparamos la llamada.';
    if (!consent) next.consent = 'Marca la casilla para que podamos guardar tus datos y responderte.';

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    setFormError(null);

    if (Object.keys(found).length > 0) {
      // Lleva el foco al primer campo con problema.
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus('submitting');

    try {
      await submitLead({
        name: String(data.get('name') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        company: String(data.get('company') ?? '').trim(),
        country: String(data.get('country') ?? ''),
        process: String(data.get('process') ?? '').trim(),
        honeypot: String(data.get('website') ?? ''),
      });

      track('lead_submit', { country: String(data.get('country') ?? '') });
      form.reset();
      // Se navega DESPUES de trackear: si router.push desmonta el componente
      // a mitad de la animacion de salida, el evento ya salio hacia dataLayer.
      router.push(site.routes.thanks);
    } catch (error) {
      const message =
        error instanceof LeadError
          ? error.message
          : `El envío no llegó a su destino. Escríbenos a ${site.email} y lo vemos igual.`;
      track('lead_submit_error', { message });
      setFormError(message);
      setStatus('error');
    }
  }

  const busy = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-flat p-6 sm:p-8">
      {/* Campo trampa: invisible para personas, tentador para bots.
          Se saca de pantalla con posicion absoluta en lugar de display:none
          porque muchos bots ignoran los campos ocultos con display. */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        <label htmlFor={`${uid}-website`}>No rellenes este campo</label>
        <input id={`${uid}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${uid}-name`}
          name="name"
          label="Nombre"
          autoComplete="name"
          placeholder="Marta Iglesias"
          error={errors.name}
          disabled={busy}
        />
        <Field
          id={`${uid}-email`}
          name="email"
          type="email"
          label="Correo electrónico"
          autoComplete="email"
          placeholder="marta@gmail.com"
          error={errors.email}
          disabled={busy}
        />
        <Field
          id={`${uid}-company`}
          name="company"
          label="Empresa"
          autoComplete="organization"
          placeholder="Nombre de tu empresa"
          error={errors.company}
          disabled={busy}
        />

        {/* Pais */}
        <div>
          <label htmlFor={`${uid}-country`} className="block font-mono text-mono uppercase text-paper-faint">
            País
          </label>
          <select
            id={`${uid}-country`}
            name="country"
            defaultValue=""
            disabled={busy}
            aria-invalid={errors.country ? true : undefined}
            aria-describedby={errors.country ? `${uid}-country-error` : undefined}
            className={cn(
              field,
              'mt-2 appearance-none',
              errors.country ? 'border-nodbu' : 'border-hairline',
            )}
          >
            <option value="" disabled>
              Elige tu país
            </option>
            {countries.map((c) => (
              <option key={c.code} value={c.name} className="bg-ink-raised">
                {c.name}
              </option>
            ))}
            <option value={OTHER_COUNTRY} className="bg-ink-raised">
              {OTHER_COUNTRY}
            </option>
          </select>
          {errors.country ? (
            <p id={`${uid}-country-error`} className="mt-2 text-body-s text-nodbu">
              {errors.country}
            </p>
          ) : null}
        </div>
      </div>

      {/* Proceso */}
      <div className="mt-5">
        <label htmlFor={`${uid}-process`} className="block font-mono text-mono uppercase text-paper-faint">
          ¿Qué proceso te quita más tiempo?
        </label>
        <textarea
          id={`${uid}-process`}
          name="process"
          rows={4}
          disabled={busy}
          placeholder="Por ejemplo: paso los pedidos de WhatsApp al programa de facturación uno por uno."
          aria-invalid={errors.process ? true : undefined}
          aria-describedby={errors.process ? `${uid}-process-error` : undefined}
          className={cn(field, 'mt-2 resize-y', errors.process ? 'border-nodbu' : 'border-hairline')}
        />
        {errors.process ? (
          <p id={`${uid}-process-error`} className="mt-2 text-body-s text-nodbu">
            {errors.process}
          </p>
        ) : null}
      </div>

      {/* Consentimiento: obligatorio (Ley 1581 de 2012 en Colombia, RGPD en
          España). El texto vive en content/form.ts; lo que se envia a
          Web3Forms como prueba de que se acepto esta en submit-lead.ts. */}
      <div className="mt-6">
        <label htmlFor={`${uid}-consent`} className="flex cursor-pointer items-start gap-3">
          <input
            id={`${uid}-consent`}
            name="consent"
            type="checkbox"
            disabled={busy}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${uid}-consent-error` : undefined}
            className="mt-1 h-4 w-4 shrink-0 accent-nodbu"
          />
          <span className="text-body-s text-paper-muted">
            {leadForm.consent.prefix}
            <a href={site.routes.privacy} className="text-paper underline underline-offset-2">
              {leadForm.consent.linkLabel}
            </a>
            {leadForm.consent.suffix}
          </span>
        </label>
        {errors.consent ? (
          <p id={`${uid}-consent-error`} className="mt-2 text-body-s text-nodbu">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {/* Error de envio */}
      {formError ? (
        <p role="alert" className="mt-6 rounded-xl border border-nodbu/40 bg-nodbu/10 px-4 py-3 text-body-s text-paper">
          {formError}
        </p>
      ) : null}

      <Button type="submit" disabled={busy} className="mt-7 w-full disabled:opacity-70">
        {busy ? (
          <>
            <Loader2 size={17} aria-hidden="true" className="animate-spin" />
            Enviando tus datos
          </>
        ) : (
          'Enviar mis datos'
        )}
      </Button>

      <p className="mt-4 text-center text-body-s text-paper-faint">
        Te respondemos el mismo día. Sin llamadas comerciales sin avisar.
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ campo -- */

function Field({
  id,
  name,
  label,
  error,
  type = 'text',
  ...rest
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-mono uppercase text-paper-faint">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(field, 'mt-2', error ? 'border-nodbu' : 'border-hairline')}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-body-s text-nodbu">
          {error}
        </p>
      ) : null}
    </div>
  );
}
