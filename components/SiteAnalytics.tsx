"use client";

import { useEffect } from "react";

/**
 * Listeners globales de conversión + animaciones de scroll.
 * Captura clicks en enlaces de WhatsApp, email y teléfono y los envía a
 * dataLayer (GTM/GA4) y fbq (Meta Pixel). El detalle de eventos de
 * formulario se dispara desde el propio formulario.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    __VA_ADS?: { id: string; label: string };
  }
}

export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  if (typeof window.gtag === "function") window.gtag("event", event, params);
}

/** Dispara la conversión de Google Ads si está configurada. */
export function fireAdsConversion() {
  if (typeof window === "undefined") return;
  const ads = window.__VA_ADS;
  if (ads?.id && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: ads.label ? `${ads.id}/${ads.label}` : ads.id,
    });
  }
}

export default function SiteAnalytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";

      if (href.includes("wa.me") || href.includes("api.whatsapp")) {
        trackEvent("click_whatsapp", {
          location: link.getAttribute("data-wa-location") || "site",
        });
        if (typeof window.fbq === "function") window.fbq("trackCustom", "WhatsAppClick");
        fireAdsConversion();
      } else if (href.startsWith("mailto:")) {
        trackEvent("click_email", {});
      } else if (href.startsWith("tel:")) {
        trackEvent("click_phone", {});
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  return null;
}
