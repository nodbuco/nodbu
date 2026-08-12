import Script from 'next/script';

/**
 * Google Tag Manager, listo para conectar Google Ads sin tocar codigo.
 *
 * Si NEXT_PUBLIC_GTM_ID esta vacio no renderiza NADA: ni script, ni iframe, ni
 * dataLayer. Asi el sitio no carga nada de Google mientras no haga falta.
 *
 * Como el build es estatico, la variable se incrusta al compilar: si la anades
 * o la cambias, hay que volver a ejecutar `npm run build` y subir.
 */
export function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  if (!gtmId) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>

      {/* Respaldo para navegadores sin JavaScript. */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
