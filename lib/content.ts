import { prisma } from "./prisma";
import { PAGE_DEFAULTS, type PageDefault } from "./content-defaults";
import { cache } from "react";

export type PageContentResult = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  sections: Record<string, string>;
  /** Devuelve el texto de una clave de sección (con fallback al default). */
  c: (key: string, fallback?: string) => string;
};

function getDefault(slug: string): PageDefault | undefined {
  return PAGE_DEFAULTS.find((p) => p.slug === slug);
}

function parseSections(raw: string | null | undefined): Record<string, string> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Devuelve el contenido de una página: los valores guardados en la DB
 * mergeados sobre los defaults del código. Si la DB no está disponible,
 * usa únicamente los defaults (sitio nunca queda en blanco).
 */
export const getPageContent = cache(
  async (slug: string): Promise<PageContentResult> => {
    const def = getDefault(slug);
    const defaultSections = def?.sections ?? {};

    let dbRow: Awaited<ReturnType<typeof prisma.pageContent.findUnique>> = null;
    try {
      dbRow = await prisma.pageContent.findUnique({ where: { slug } });
    } catch {
      dbRow = null;
    }

    const sections: Record<string, string> = {
      ...defaultSections,
      ...parseSections(dbRow?.sections),
    };

    const result: PageContentResult = {
      slug,
      name: dbRow?.name || def?.name || slug,
      seoTitle: dbRow?.seoTitle || def?.seoTitle || "",
      seoDescription: dbRow?.seoDescription || def?.seoDescription || "",
      ogTitle: dbRow?.ogTitle || def?.ogTitle || dbRow?.seoTitle || def?.seoTitle || "",
      ogDescription:
        dbRow?.ogDescription ||
        def?.ogDescription ||
        dbRow?.seoDescription ||
        def?.seoDescription ||
        "",
      ogImage: dbRow?.ogImage || "",
      sections,
      c: (key: string, fallback = "") => sections[key] ?? defaultSections[key] ?? fallback,
    };
    return result;
  }
);
