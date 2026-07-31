"use client";

import { useActionState, useState, useTransition } from "react";
import Link from "next/link";
import { createPost, updatePost, deletePost, type ResourceState } from "@/app/admin/(panel)/recursos/actions";
import RichTextEditor from "./RichTextEditor";

/** Comprime una imagen en el navegador (máx 1600px, JPEG) para no superar el
 *  límite de subida del servidor. Devuelve un File liviano listo para enviar. */
async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const maxSide = 1600;
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    const blob: Blob | null = await new Promise((res) =>
      canvas.toBlob((b) => res(b), "image/jpeg", 0.82)
    );
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file; // si algo falla, se envía el original
  }
}

type PostData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  status: string;
  isFeatured: boolean;
  publishedAt: string; // yyyy-mm-dd o ""
};

export default function ResourceForm({ post }: { post?: PostData }) {
  const isEdit = !!post?.id;
  const action = isEdit ? updatePost : createPost;
  const [state, formAction, pending] = useActionState<ResourceState, FormData>(action, {});
  const [imgPreview, setImgPreview] = useState(post?.featuredImage || "");
  const [processing, startTransition] = useTransition();
  const busy = pending || processing;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const file = fd.get("featuredImage");
    if (file instanceof File && file.size > 0) {
      const compressed = await compressImage(file);
      fd.set("featuredImage", compressed, compressed.name);
    } else {
      // sin imagen nueva: no enviar un File vacío
      fd.delete("featuredImage");
    }
    startTransition(() => formAction(fd));
  }

  return (
    <>
      {state.error && <div className="admin-alert admin-alert--error">{state.error}</div>}

      <form onSubmit={handleSubmit}>
        {isEdit && <input type="hidden" name="id" value={post!.id} />}

        <div className="admin-actions" style={{ marginBottom: 16, justifyContent: "space-between" }}>
          <Link href="/admin/recursos" className="admin-link">← Volver a Recursos</Link>
          {isEdit && post?.status === "published" && (
            <Link href={`/recursos/${post.slug}`} target="_blank" className="admin-link">Ver nota publicada ↗</Link>
          )}
        </div>

        <div className="admin-card">
          <div className="admin-field">
            <label htmlFor="title">Título *</label>
            <input type="text" id="title" name="title" defaultValue={post?.title || ""} required />
          </div>
          <div className="admin-field">
            <label htmlFor="slug">Slug (URL)</label>
            <input type="text" id="slug" name="slug" defaultValue={post?.slug || ""} placeholder="se-genera-del-titulo" />
            <span className="admin-hint">Dejalo vacío para generarlo automáticamente del título. URL final: /recursos/&lt;slug&gt;</span>
          </div>
          <div className="admin-field">
            <label htmlFor="excerpt">Extracto</label>
            <textarea id="excerpt" name="excerpt" defaultValue={post?.excerpt || ""} rows={2} />
            <span className="admin-hint">Resumen breve que aparece en la lista de Recursos.</span>
          </div>
          <div className="admin-field">
            <label>Contenido de la nota</label>
            <RichTextEditor name="content" initialHTML={post?.content || ""} />
            <span className="admin-hint">Escribí normalmente y usá los botones de arriba para dar formato (títulos, negrita, listas, enlaces).</span>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card__head"><h2>Imagen destacada</h2></div>
          {imgPreview && (
            <div style={{ marginBottom: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgPreview} alt="" style={{ maxHeight: 160, borderRadius: 10 }} />
            </div>
          )}
          <div className="admin-field">
            <input type="file" name="featuredImage" accept="image/png,image/jpeg,image/webp"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) setImgPreview(URL.createObjectURL(f)); }} />
            <span className="admin-hint">PNG, JPG o WebP (máx. 3 MB). {isEdit ? "Dejalo vacío para mantener la actual." : ""}</span>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card__head"><h2>Publicación</h2></div>
          <div className="admin-row">
            <div className="admin-field">
              <label htmlFor="status">Estado</label>
              <select id="status" name="status" defaultValue={post?.status || "draft"}>
                <option value="draft">Borrador (no visible)</option>
                <option value="published">Publicada</option>
              </select>
            </div>
            <div className="admin-field">
              <label htmlFor="category">Categoría</label>
              <input type="text" id="category" name="category" defaultValue={post?.category || ""} placeholder="Ej.: Herramientas para PyMEs" />
            </div>
          </div>
          <div className="admin-row">
            <div className="admin-field">
              <label htmlFor="publishedAt">Fecha de publicación</label>
              <input type="date" id="publishedAt" name="publishedAt" defaultValue={post?.publishedAt || ""} />
            </div>
            <div className="admin-field" style={{ display: "flex", alignItems: "flex-end" }}>
              <label className="admin-toggle">
                <input type="checkbox" name="isFeatured" defaultChecked={post?.isFeatured} />
                <span className="admin-toggle__track" />
                <span className="admin-toggle__label">Destacar nota</span>
              </label>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card__head"><h2>SEO</h2></div>
          <div className="admin-field">
            <label htmlFor="seoTitle">Título SEO</label>
            <input type="text" id="seoTitle" name="seoTitle" defaultValue={post?.seoTitle || ""} />
            <span className="admin-hint">Opcional. Si se deja vacío, se usa el título de la nota.</span>
          </div>
          <div className="admin-field">
            <label htmlFor="seoDescription">Meta descripción</label>
            <textarea id="seoDescription" name="seoDescription" defaultValue={post?.seoDescription || ""} rows={2} />
          </div>
        </div>

        <div className="admin-actions" style={{ justifyContent: "space-between" }}>
          <button type="submit" className="admin-btn admin-btn--primary" disabled={busy}>
            {busy ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear nota"}
          </button>
        </div>
      </form>

      {isEdit && (
        <form
          action={deletePost}
          onSubmit={(e) => { if (!confirm("¿Eliminar esta nota? Esta acción no se puede deshacer.")) e.preventDefault(); }}
          style={{ marginTop: 24 }}
        >
          <input type="hidden" name="id" value={post!.id} />
          <button type="submit" className="admin-btn admin-btn--danger">Eliminar nota</button>
        </form>
      )}
    </>
  );
}
