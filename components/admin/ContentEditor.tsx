"use client";

import { useActionState } from "react";
import Link from "next/link";
import { updatePageContent, type ContentState } from "@/app/admin/(panel)/contenidos/actions";
import type { ContentGroup } from "@/lib/content-labels";

type Props = {
  slug: string;
  name: string;
  seo: { seoTitle: string; seoDescription: string; ogTitle: string; ogDescription: string };
  groups: ContentGroup[];
  publicPath: string;
};

export default function ContentEditor({ slug, name, seo, groups, publicPath }: Props) {
  const [state, formAction, pending] = useActionState<ContentState, FormData>(updatePageContent, {});

  return (
    <form action={formAction}>
      <input type="hidden" name="slug" value={slug} />

      <div className="admin-actions" style={{ marginBottom: 20, justifyContent: "space-between" }}>
        <Link href="/admin/contenidos" className="admin-link">← Volver a páginas</Link>
        <Link href={publicPath} target="_blank" className="admin-link">Ver página pública ↗</Link>
      </div>

      {state.ok && <div className="admin-alert admin-alert--success">✓ Cambios guardados. Ya se reflejan en «{name}».</div>}
      {state.error && <div className="admin-alert admin-alert--error">{state.error}</div>}

      {/* SEO */}
      <div className="admin-card">
        <div className="admin-card__head">
          <h2>SEO y redes sociales</h2>
          <p>Cómo aparece la página en Google y al compartirla.</p>
        </div>
        <div className="admin-field">
          <label htmlFor="seoTitle">Título SEO</label>
          <input type="text" id="seoTitle" name="seoTitle" defaultValue={seo.seoTitle} maxLength={70} />
          <span className="admin-hint">Recomendado: hasta 60 caracteres.</span>
        </div>
        <div className="admin-field">
          <label htmlFor="seoDescription">Meta descripción</label>
          <textarea id="seoDescription" name="seoDescription" defaultValue={seo.seoDescription} rows={2} maxLength={180} />
          <span className="admin-hint">Recomendado: hasta 155 caracteres.</span>
        </div>
        <div className="admin-row">
          <div className="admin-field">
            <label htmlFor="ogTitle">Título para redes (Open Graph)</label>
            <input type="text" id="ogTitle" name="ogTitle" defaultValue={seo.ogTitle} />
            <span className="admin-hint">Opcional. Si se deja vacío, se usa el título SEO.</span>
          </div>
          <div className="admin-field">
            <label htmlFor="ogDescription">Descripción para redes</label>
            <input type="text" id="ogDescription" name="ogDescription" defaultValue={seo.ogDescription} />
            <span className="admin-hint">Opcional.</span>
          </div>
        </div>
      </div>

      {/* Secciones */}
      {groups.map((g) => (
        <div className="admin-card" key={g.group}>
          <div className="admin-card__head"><h2>{g.label}</h2></div>
          {g.fields.map((f) => (
            <div className="admin-field" key={f.key}>
              <label htmlFor={`s:${f.key}`}>{f.label}</label>
              {f.multiline ? (
                <textarea id={`s:${f.key}`} name={`s:${f.key}`} defaultValue={f.value} rows={3} />
              ) : (
                <input type="text" id={`s:${f.key}`} name={`s:${f.key}`} defaultValue={f.value} />
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="admin-actions" style={{ position: "sticky", bottom: 16 }}>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={pending}>
          {pending ? "Guardando…" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
