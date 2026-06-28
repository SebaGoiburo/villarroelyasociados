import Script from "next/script";
import type { SiteSettings } from "@prisma/client";

/**
 * Inserta los scripts de medición SOLO si están activos y con ID válido.
 * El ID se inyecta desde el sistema (no se pega script crudo) por seguridad.
 */
export default function Pixels({ settings }: { settings: SiteSettings }) {
  const {
    metaPixelEnabled,
    metaPixelId,
    googleTagManagerEnabled,
    googleTagManagerId,
    googleAnalyticsEnabled,
    googleAnalyticsId,
    googleAdsEnabled,
    googleAdsConversionId,
  } = settings;

  const meta = metaPixelEnabled && metaPixelId.trim();
  const gtm = googleTagManagerEnabled && googleTagManagerId.trim();
  const ga = googleAnalyticsEnabled && googleAnalyticsId.trim();
  const ads = googleAdsEnabled && googleAdsConversionId.trim();
  const gtagId = ga ? googleAnalyticsId.trim() : ads ? googleAdsConversionId.trim() : "";

  return (
    <>
      {/* Google Tag Manager */}
      {gtm && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${googleTagManagerId.trim()}');`}
        </Script>
      )}

      {/* Google Analytics 4 / Google Ads (gtag.js) */}
      {(ga || ads) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${ga ? `gtag('config', '${googleAnalyticsId.trim()}');` : ""}
${ads ? `gtag('config', '${googleAdsConversionId.trim()}');` : ""}`}
          </Script>
        </>
      )}

      {/* Config de Ads para disparar conversiones desde eventos del cliente */}
      {ads && (
        <Script id="va-ads-config" strategy="afterInteractive">
          {`window.__VA_ADS={id:'${googleAdsConversionId.trim()}',label:'${(settings.googleAdsConversionLabel || "").trim()}'};`}
        </Script>
      )}

      {/* Meta Pixel */}
      {meta && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId.trim()}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}

/** Snippet noscript de GTM para insertar al inicio del <body>. */
export function GtmNoScript({ settings }: { settings: SiteSettings }) {
  if (!(settings.googleTagManagerEnabled && settings.googleTagManagerId.trim())) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${settings.googleTagManagerId.trim()}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm"
      />
    </noscript>
  );
}
