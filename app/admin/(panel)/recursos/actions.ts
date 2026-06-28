"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { saveImage } from "@/lib/upload";

export type ResourceState = { ok?: boolean; error?: string };

async function ensureUniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = base || "nota";
  let n = 1;
  // Busca colisiones y agrega sufijo numérico.
  while (true) {
    const existing = await prisma.resourcePost.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

function revalidateAll(slug?: string) {
  revalidatePath("/recursos");
  revalidatePath("/admin/recursos");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/recursos/${slug}`);
}

async function parseForm(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const contentMd = String(formData.get("content") || "");
  const category = String(formData.get("category") || "").trim();
  const seoTitle = String(formData.get("seoTitle") || "").trim();
  const seoDescription = String(formData.get("seoDescription") || "").trim();
  const status = formData.get("status") === "published" ? "published" : "draft";
  const isFeatured = formData.get("isFeatured") === "on";
  const publishedAtRaw = String(formData.get("publishedAt") || "").trim();

  return { title, slugInput, excerpt, contentMd, category, seoTitle, seoDescription, status, isFeatured, publishedAtRaw };
}

export async function createPost(_prev: ResourceState, formData: FormData): Promise<ResourceState> {
  const session = await getSession();
  if (!session) return { error: "Sesión expirada." };

  const f = await parseForm(formData);
  if (!f.title) return { error: "El título es obligatorio." };

  const base = slugify(f.slugInput || f.title);
  const slug = await ensureUniqueSlug(base);

  let featuredImage = "";
  const img = formData.get("featuredImage");
  if (img instanceof File && img.size > 0) {
    const res = await saveImage(img, "nota");
    if ("error" in res) return { error: res.error };
    featuredImage = res.url;
  }

  const publishedAt =
    f.status === "published" ? (f.publishedAtRaw ? new Date(f.publishedAtRaw) : new Date()) : null;

  try {
    await prisma.resourcePost.create({
      data: {
        title: f.title,
        slug,
        excerpt: f.excerpt,
        content: f.contentMd, // se guarda markdown; se sanitiza al renderizar
        featuredImage,
        category: f.category,
        seoTitle: f.seoTitle,
        seoDescription: f.seoDescription,
        status: f.status,
        isFeatured: f.isFeatured,
        publishedAt,
      },
    });
  } catch {
    return { error: "No se pudo crear la nota." };
  }

  revalidateAll(slug);
  redirect("/admin/recursos");
}

export async function updatePost(_prev: ResourceState, formData: FormData): Promise<ResourceState> {
  const session = await getSession();
  if (!session) return { error: "Sesión expirada." };

  const id = String(formData.get("id") || "");
  if (!id) return { error: "Nota no encontrada." };
  const f = await parseForm(formData);
  if (!f.title) return { error: "El título es obligatorio." };

  const current = await prisma.resourcePost.findUnique({ where: { id } });
  if (!current) return { error: "Nota no encontrada." };

  const base = slugify(f.slugInput || f.title);
  const slug = await ensureUniqueSlug(base, id);

  let featuredImage = current.featuredImage;
  const img = formData.get("featuredImage");
  if (img instanceof File && img.size > 0) {
    const res = await saveImage(img, "nota");
    if ("error" in res) return { error: res.error };
    featuredImage = res.url;
  }

  // Mantener publishedAt si ya estaba publicada; setear al publicar por primera vez.
  let publishedAt = current.publishedAt;
  if (f.status === "published") {
    publishedAt = f.publishedAtRaw ? new Date(f.publishedAtRaw) : current.publishedAt ?? new Date();
  }

  try {
    await prisma.resourcePost.update({
      where: { id },
      data: {
        title: f.title,
        slug,
        excerpt: f.excerpt,
        content: f.contentMd,
        featuredImage,
        category: f.category,
        seoTitle: f.seoTitle,
        seoDescription: f.seoDescription,
        status: f.status,
        isFeatured: f.isFeatured,
        publishedAt,
      },
    });
  } catch {
    return { error: "No se pudo guardar la nota." };
  }

  revalidateAll(slug);
  redirect("/admin/recursos");
}

export async function deletePost(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) return;
  const id = String(formData.get("id") || "");
  if (!id) return;
  try {
    await prisma.resourcePost.delete({ where: { id } });
  } catch {
    /* ignore */
  }
  revalidateAll();
  redirect("/admin/recursos");
}
