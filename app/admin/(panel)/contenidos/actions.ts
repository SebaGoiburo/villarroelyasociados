"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { PAGE_DEFAULTS } from "@/lib/content-defaults";

export type ContentState = { ok?: boolean; error?: string };

// Mapa slug -> ruta pública (para revalidar la página editada).
const PUBLIC_PATH: Record<string, string> = {
  inicio: "/",
  "quienes-somos": "/quienes-somos",
  servicios: "/servicios",
  "asociaciones-civiles-fundaciones": "/asociaciones-civiles-fundaciones",
  recursos: "/recursos",
  contacto: "/contacto",
};

export async function updatePageContent(
  _prev: ContentState,
  formData: FormData
): Promise<ContentState> {
  const session = await getSession();
  if (!session) return { error: "Sesión expirada. Volvé a iniciar sesión." };

  const slug = String(formData.get("slug") || "");
  const def = PAGE_DEFAULTS.find((p) => p.slug === slug);
  if (!def) return { error: "Página no encontrada." };

  const seoTitle = String(formData.get("seoTitle") || "").trim();
  const seoDescription = String(formData.get("seoDescription") || "").trim();
  const ogTitle = String(formData.get("ogTitle") || "").trim();
  const ogDescription = String(formData.get("ogDescription") || "").trim();

  // Reconstruir sections a partir de los campos s:<clave> (solo claves conocidas).
  const sections: Record<string, string> = {};
  for (const key of Object.keys(def.sections)) {
    const val = formData.get(`s:${key}`);
    sections[key] = val === null ? def.sections[key] : String(val);
  }

  try {
    await prisma.pageContent.update({
      where: { slug },
      data: {
        seoTitle,
        seoDescription,
        ogTitle,
        ogDescription,
        sections: JSON.stringify(sections),
      },
    });
  } catch {
    return { error: "No se pudieron guardar los cambios. Intentá nuevamente." };
  }

  const path = PUBLIC_PATH[slug];
  if (path) revalidatePath(path);
  revalidatePath("/admin/contenidos");

  return { ok: true };
}
