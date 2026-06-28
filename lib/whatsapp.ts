import type { SiteSettings } from "@prisma/client";

/** Normaliza un número de WhatsApp a solo dígitos (formato wa.me). */
export function normalizeWhatsappNumber(raw: string): string {
  return (raw || "").replace(/[^\d]/g, "");
}

/**
 * Construye el enlace wa.me con mensaje prearmado.
 * Permite sobrescribir el mensaje por contexto (ej. un servicio puntual).
 */
export function buildWhatsappUrl(
  settings: Pick<SiteSettings, "whatsappNumber" | "whatsappMessage">,
  customMessage?: string
): string {
  const number = normalizeWhatsappNumber(settings.whatsappNumber);
  const text = encodeURIComponent(customMessage ?? settings.whatsappMessage ?? "");
  return `https://wa.me/${number}${text ? `?text=${text}` : ""}`;
}
