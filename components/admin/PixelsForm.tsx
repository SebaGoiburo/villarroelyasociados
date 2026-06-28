"use client";

import { useActionState } from "react";
import type { SiteSettings } from "@prisma/client";
import { updatePixels, type PixelsState } from "@/app/admin/(panel)/medicion/actions";

function Toggle({ name, defaultChecked, label }: { name: string; defaultChecked: boolean; label: string }) {
  return (
    <label className="admin-toggle" style={{ marginBottom: 16 }}>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      <span className="admin-toggle__track" />
      <span className="admin-toggle__label">{label}</span>
    </label>
  );
}

export default function PixelsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState<PixelsState, FormData>(updatePixels, {});

  return (
    <form action={formAction}>
      {state.ok && <div className="admin-alert admin-alert--success">✓ Configuración de medición guardada. Se aplica en todas las páginas del sitio.</div>}
      {state.error && <div className="admin-alert admin-alert--error">{state.error}</div>}

      {/* META */}
      <div className="admin-card">
        <div className="admin-card__head">
          <h2>Meta Pixel (Facebook / Instagram)</h2>
          <p>Al activarlo se inserta el código en todas las páginas. Se mide <strong>PageView</strong>, <strong>Lead</strong> (envío de formulario) y <strong>WhatsAppClick</strong>.</p>
        </div>
        <Toggle name="metaPixelEnabled" defaultChecked={settings.metaPixelEnabled} label="Activar Meta Pixel" />
        <div className="admin-field">
          <label htmlFor="metaPixelId">Pixel ID</label>
          <input type="text" id="metaPixelId" name="metaPixelId" defaultValue={settings.metaPixelId} placeholder="Ej.: 1234567890" />
          <span className="admin-hint">Solo el número del Pixel. Lo encontrás en el Administrador de Eventos de Meta.</span>
        </div>
      </div>

      {/* GTM */}
      <div className="admin-card">
        <div className="admin-card__head">
          <h2>Google Tag Manager</h2>
          <p>Contenedor para gestionar etiquetas. Si lo usás, podés administrar GA4 y Ads desde GTM.</p>
        </div>
        <Toggle name="googleTagManagerEnabled" defaultChecked={settings.googleTagManagerEnabled} label="Activar Google Tag Manager" />
        <div className="admin-field">
          <label htmlFor="googleTagManagerId">Container ID</label>
          <input type="text" id="googleTagManagerId" name="googleTagManagerId" defaultValue={settings.googleTagManagerId} placeholder="GTM-XXXXXXX" />
        </div>
      </div>

      {/* GA4 */}
      <div className="admin-card">
        <div className="admin-card__head">
          <h2>Google Analytics 4</h2>
          <p>Medición de tráfico y eventos. Se registran las conversiones de formulario y WhatsApp.</p>
        </div>
        <Toggle name="googleAnalyticsEnabled" defaultChecked={settings.googleAnalyticsEnabled} label="Activar Google Analytics 4" />
        <div className="admin-field">
          <label htmlFor="googleAnalyticsId">Measurement ID</label>
          <input type="text" id="googleAnalyticsId" name="googleAnalyticsId" defaultValue={settings.googleAnalyticsId} placeholder="G-XXXXXXXXXX" />
        </div>
      </div>

      {/* ADS */}
      <div className="admin-card">
        <div className="admin-card__head">
          <h2>Google Ads (conversiones)</h2>
          <p>Para medir conversiones de campañas en el envío del formulario y clicks de WhatsApp.</p>
        </div>
        <Toggle name="googleAdsEnabled" defaultChecked={settings.googleAdsEnabled} label="Activar Google Ads" />
        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="googleAdsConversionId">Conversion ID</label>
            <input type="text" id="googleAdsConversionId" name="googleAdsConversionId" defaultValue={settings.googleAdsConversionId} placeholder="AW-123456789" />
          </div>
          <div className="admin-field">
            <label htmlFor="googleAdsConversionLabel">Conversion Label</label>
            <input type="text" id="googleAdsConversionLabel" name="googleAdsConversionLabel" defaultValue={settings.googleAdsConversionLabel} placeholder="AbC-D_efG" />
            <span className="admin-hint">Opcional. Etiqueta de la acción de conversión.</span>
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
          {pending ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
