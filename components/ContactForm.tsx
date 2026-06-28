"use client";

import { useState } from "react";
import { trackEvent, fireAdsConversion } from "./SiteAnalytics";

type Props = {
  successMessage: string;
  submitLabel: string;
  whatsappUrl: string;
  whatsappEnabled: boolean;
};

const ORG_TYPES = ["PyME", "Comercio", "Profesional", "Asociación civil", "Fundación", "Emprendedor", "Otro"];
const SERVICES = [
  "Asesoramiento contable",
  "Gestión impositiva",
  "Auditoría y estados contables",
  "Constitución societaria",
  "Asociaciones y fundaciones",
  "Consultoría organizacional",
  "Planeamiento y desarrollo",
  "Transformación digital",
  "Otro",
];

export default function ContactForm({
  successMessage,
  submitLabel,
  whatsappUrl,
  whatsappEnabled,
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Validación cliente
    const errs: Record<string, boolean> = {};
    if (!data.name?.trim()) errs.name = true;
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = true;
    if (!data.phone?.trim()) errs.phone = true;
    if (!data.message?.trim()) errs.message = true;
    if (!data.privacy) errs.privacy = true;
    setInvalid(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "No pudimos enviar tu consulta.");
      }
      setStatus("success");
      form.reset();
      // Conversión
      trackEvent("form_submit", { servicio_interes: data.service || "", tipo_organizacion: data["org-type"] || "" });
      if (typeof window.fbq === "function") window.fbq("track", "Lead");
      fireAdsConversion();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Ocurrió un error. Probá nuevamente.");
    }
  }

  const cls = (k: string) => `field${invalid[k] ? " invalid" : ""}`;

  return (
    <div className="form-wrap reveal">
      <h2>Enviá tu consulta</h2>
      <p className="mt-0">Completá el formulario y te respondemos a la brevedad.</p>

      {status === "success" && (
        <div className="form-success show" role="status" tabIndex={-1}>{successMessage}</div>
      )}
      {status === "error" && (
        <div className="form-success show" role="alert" style={{ background: "rgba(210,38,48,.08)", borderColor: "rgba(210,38,48,.3)", color: "#9b1c23" }}>
          {errorMsg}
        </div>
      )}

      <form className="mt-2" onSubmit={onSubmit} noValidate>
        {/* Honeypot anti-spam (oculto) */}
        <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
          <label>No completar<input type="text" name="company_website" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div className={cls("name")}>
          <label htmlFor="name">Nombre y apellido <span className="req">*</span></label>
          <input type="text" id="name" name="name" autoComplete="name" required />
          <span className="hint">¿Con quién hablamos?</span>
        </div>
        <div className="field">
          <label htmlFor="org">Organización</label>
          <input type="text" id="org" name="org" autoComplete="organization" />
          <span className="hint">Empresa, emprendimiento, asociación o fundación</span>
        </div>
        <div className="field-row">
          <div className={cls("email")}>
            <label htmlFor="email">Email <span className="req">*</span></label>
            <input type="email" id="email" name="email" autoComplete="email" required />
            <span className="hint">Para enviarte respuesta o documentación</span>
          </div>
          <div className={cls("phone")}>
            <label htmlFor="phone">Teléfono / WhatsApp <span className="req">*</span></label>
            <input type="tel" id="phone" name="phone" autoComplete="tel" required />
            <span className="hint">Para coordinar el contacto</span>
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="org-type">Tipo de organización</label>
            <select id="org-type" name="org-type" defaultValue="">
              <option value="">Seleccioná una opción</option>
              {ORG_TYPES.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="service">Servicio de interés</label>
            <select id="service" name="service" defaultValue="">
              <option value="">Seleccioná una opción</option>
              {SERVICES.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className={cls("message")}>
          <label htmlFor="message">Mensaje <span className="req">*</span></label>
          <textarea id="message" name="message" required placeholder="Contanos brevemente qué necesitás" />
        </div>
        <div className={invalid.privacy ? "field invalid" : "field"}>
          <label className="checkbox">
            <input type="checkbox" id="privacy" name="privacy" value="1" required />
            <span>Acepto que mis datos sean utilizados para responder esta consulta. <span className="req">*</span></span>
          </label>
        </div>
        <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : submitLabel}
        </button>
        {whatsappEnabled && (
          <p className="hint text-center mt-2">
            ¿Preferís una respuesta inmediata?{" "}
            <a href={whatsappUrl} data-wa-location="contacto-form" target="_blank" rel="noopener" style={{ color: "var(--blue)", fontWeight: 700 }}>
              Escribinos por WhatsApp
            </a>
          </p>
        )}
      </form>
    </div>
  );
}
