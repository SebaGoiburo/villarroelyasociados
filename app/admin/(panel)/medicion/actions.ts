"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export type PixelsState = { ok?: boolean; error?: string };

export async function updatePixels(
  _prev: PixelsState,
  formData: FormData
): Promise<PixelsState> {
  const session = await getSession();
  if (!session) return { error: "Sesión expirada. Volvé a iniciar sesión." };

  const metaPixelEnabled = formData.get("metaPixelEnabled") === "on";
  const metaPixelId = String(formData.get("metaPixelId") || "").trim();

  const googleTagManagerEnabled = formData.get("googleTagManagerEnabled") === "on";
  const googleTagManagerId = String(formData.get("googleTagManagerId") || "").trim().toUpperCase();

  const googleAnalyticsEnabled = formData.get("googleAnalyticsEnabled") === "on";
  const googleAnalyticsId = String(formData.get("googleAnalyticsId") || "").trim().toUpperCase();

  const googleAdsEnabled = formData.get("googleAdsEnabled") === "on";
  const googleAdsConversionId = String(formData.get("googleAdsConversionId") || "").trim().toUpperCase();
  const googleAdsConversionLabel = String(formData.get("googleAdsConversionLabel") || "").trim();

  // Validaciones de formato (solo si están activos)
  if (metaPixelEnabled && !/^\d{5,20}$/.test(metaPixelId)) {
    return { error: "El Pixel ID de Meta debe ser numérico (ej.: 1234567890)." };
  }
  if (googleTagManagerEnabled && !/^GTM-[A-Z0-9]+$/.test(googleTagManagerId)) {
    return { error: "El ID de Google Tag Manager debe tener el formato GTM-XXXXXXX." };
  }
  if (googleAnalyticsEnabled && !/^G-[A-Z0-9]+$/.test(googleAnalyticsId)) {
    return { error: "El ID de Google Analytics 4 debe tener el formato G-XXXXXXXXXX." };
  }
  if (googleAdsEnabled && !/^AW-\d+$/.test(googleAdsConversionId)) {
    return { error: "El ID de conversión de Google Ads debe tener el formato AW-123456789." };
  }

  try {
    await prisma.siteSettings.update({
      where: { id: "singleton" },
      data: {
        metaPixelEnabled,
        metaPixelId,
        googleTagManagerEnabled,
        googleTagManagerId,
        googleAnalyticsEnabled,
        googleAnalyticsId,
        googleAdsEnabled,
        googleAdsConversionId,
        googleAdsConversionLabel,
      },
    });
  } catch {
    return { error: "No se pudieron guardar los cambios. Intentá nuevamente." };
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin");
  return { ok: true };
}
