"use client";

import { useActionState, useState } from "react";
import type { SiteSettings } from "@prisma/client";
import { updateSettings, type SettingsState } from "@/app/admin/(panel)/configuracion/actions";

function Toggle({ name, defaultChecked, label, hint }: { name: string; defaultChecked: boolean; label: string; hint?: string }) {
  return (
    <label className="admin-toggle" style={{ marginBottom: 14 }}>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      <span className="admin-toggle__track" />
      <span className="admin-toggle__label">{label}{hint && <small>{hint}</small>}</span>
    </label>
  );
}

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState<SettingsState, FormData>(updateSettings, {});
  const [logoPreview, setLogoPreview] = useState<string>(settings.logoUrl);

  function onLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  }

  return (
    <form action={formAction}>
      {state.ok && <div className="admin-alert admin-alert--success">✓ Cambios guardados. Ya se reflejan en el sitio.</div>}
      {state.error && <div className="admin-alert admin-alert--error">{state.error}</div>}

      {/* LOGO */}
      <div className="admin-card">
        <div className="admin-card__head">
          <h2>Logo</h2>
          <p>Se usa en el header y el footer del sitio. Formatos: PNG, JPG o WebP (máx. 3 MB).</p>
        </div>
        <div className="admin-logo-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoPreview} alt="Logo actual" />
        </div>
        <div className="admin-field">
          <label htmlFor="logo">Reemplazar logo</label>
          <input type="file" id="logo" name="logo" accept="image/png,image/jpeg,image/webp" onChange={onLogoChange} />
          <span className="admin-hint">Dejalo vacío para mantener el logo actual.</span>
        </div>
      </div>

      {/* WHATSAPP */}
      <div className="admin-card">
        <div className="admin-card__head">
          <h2>WhatsApp</h2>
          <p>Botón principal de conversión en todo el sitio.</p>
        </div>
        <Toggle name="whatsappEnabled" defaultChecked={settings.whatsappEnabled} label="Mostrar WhatsApp en el sitio" hint="Botón del header y enlaces de contacto." />
        <Toggle name="whatsappFloating" defaultChecked={settings.whatsappFloating} label="Botón flotante de WhatsApp" hint="Burbuja fija en la esquina inferior." />
        <Toggle name="whatsappCtaEnabled" defaultChecked={settings.whatsappCtaEnabled} label="Botones CTA hacia WhatsApp" hint="Botones de WhatsApp dentro de las secciones." />

        <div className="admin-field">
          <label htmlFor="whatsappNumber">Número de WhatsApp</label>
          <input type="text" id="whatsappNumber" name="whatsappNumber" defaultValue={settings.whatsappNumber} />
          <span className="admin-hint">Solo dígitos, con código de país y sin símbolos. Ejemplo: 5492633466645</span>
        </div>
        <div className="admin-field">
          <label htmlFor="whatsappButtonText">Texto del botón</label>
          <input type="text" id="whatsappButtonText" name="whatsappButtonText" defaultValue={settings.whatsappButtonText} />
        </div>
        <div className="admin-field">
          <label htmlFor="whatsappMessage">Mensaje prearmado</label>
          <textarea id="whatsappMessage" name="whatsappMessage" defaultValue={settings.whatsappMessage} rows={3} />
          <span className="admin-hint">Texto que se carga automáticamente al abrir el chat.</span>
        </div>
      </div>

      {/* EMAIL */}
      <div className="admin-card">
        <div className="admin-card__head">
          <h2>Email del formulario</h2>
          <p>Este email recibirá las consultas enviadas desde el formulario del sitio.</p>
        </div>
        <div className="admin-field">
          <label htmlFor="contactRecipientEmail">Email de destino</label>
          <input type="email" id="contactRecipientEmail" name="contactRecipientEmail" defaultValue={settings.contactRecipientEmail} />
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
