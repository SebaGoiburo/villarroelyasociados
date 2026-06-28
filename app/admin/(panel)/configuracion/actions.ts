"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { normalizeWhatsappNumber } from "@/lib/whatsapp";
import { saveImage } from "@/lib/upload";

export type SettingsState = { ok?: boolean; error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function updateSettings(
  _prev: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const session = await getSession();
  if (!session) return { error: "Sesión expirada. Volvé a iniciar sesión." };

  const whatsappNumber = normalizeWhatsappNumber(String(formData.get("whatsappNumber") || ""));
  const whatsappMessage = String(formData.get("whatsappMessage") || "").trim();
  const whatsappButtonText = String(formData.get("whatsappButtonText") || "").trim() || "WhatsApp";
  const contactRecipientEmail = String(formData.get("contactRecipientEmail") || "").trim();

  const whatsappEnabled = formData.get("whatsappEnabled") === "on";
  const whatsappFloating = formData.get("whatsappFloating") === "on";
  const whatsappCtaEnabled = formData.get("whatsappCtaEnabled") === "on";

  // Validaciones
  if (whatsappEnabled && whatsappNumber.length < 8) {
    return { error: "El número de WhatsApp no es válido. Ingresá solo dígitos con código de país." };
  }
  if (!EMAIL_RE.test(contactRecipientEmail)) {
    return { error: "El email de destino del formulario no es válido." };
  }

  // Logo (opcional)
  let logoUrl: string | undefined;
  const logoFile = formData.get("logo");
  if (logoFile instanceof File && logoFile.size > 0) {
    const res = await saveImage(logoFile, "logo");
    if ("error" in res) return { error: res.error };
    logoUrl = res.url;
  }

  try {
    await prisma.siteSettings.update({
      where: { id: "singleton" },
      data: {
        whatsappNumber,
        whatsappMessage,
        whatsappButtonText,
        whatsappEnabled,
        whatsappFloating,
        whatsappCtaEnabled,
        contactRecipientEmail,
        ...(logoUrl ? { logoUrl } : {}),
      },
    });
  } catch {
    return { error: "No se pudieron guardar los cambios. Intentá nuevamente." };
  }

  // Refrescar el sitio público (layout usa settings) y el dashboard.
  revalidatePath("/", "layout");
  revalidatePath("/admin");

  return { ok: true };
}
