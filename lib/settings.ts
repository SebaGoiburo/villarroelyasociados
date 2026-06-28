import { prisma } from "./prisma";
import type { SiteSettings } from "@prisma/client";
import { cache } from "react";

// Valores por defecto si todavía no existe la fila de settings.
export const DEFAULT_SETTINGS = {
  id: "singleton",
  siteName: "Villarroel & Asociados Consultora",
  logoUrl: "/logo.svg",
  whatsappEnabled: true,
  whatsappNumber: "549263346645",
  whatsappMessage:
    "Hola Villarroel & Asociados, quiero realizar una consulta sobre [servicio/tema]. Mi nombre es [nombre] y represento a [organización].",
  whatsappButtonText: "Contactar",
  whatsappFloating: true,
  whatsappCtaEnabled: true,
  contactRecipientEmail: "info@villarroelyasoc.com.ar",
  metaPixelEnabled: false,
  metaPixelId: "",
  googleTagManagerEnabled: false,
  googleTagManagerId: "",
  googleAnalyticsEnabled: false,
  googleAnalyticsId: "",
  googleAdsEnabled: false,
  googleAdsConversionId: "",
  googleAdsConversionLabel: "",
  updatedAt: new Date(),
} satisfies SiteSettings;

/**
 * Devuelve la configuración global. Crea la fila singleton si no existe.
 * Cacheado por request con React cache().
 */
export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const settings = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: {},
      create: { id: "singleton" },
    });
    return settings;
  } catch {
    // Si la DB no está disponible (ej. build sin DB), usar defaults.
    return DEFAULT_SETTINGS;
  }
});
