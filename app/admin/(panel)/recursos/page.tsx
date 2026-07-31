import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Recursos · Admin" };
export const dynamic = "force-dynamic";

export default async function RecursosAdminPage() {
  let posts: Awaited<ReturnType<typeof prisma.resourcePost.findMany>> = [];
  try {
    posts = await prisma.resourcePost.findMany({ orderBy: { updatedAt: "desc" } });
  } catch {
    posts = [];
  }

  return (
    <>
      <div className="admin-page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1>Recursos</h1>
          <p>Notas y artículos del sitio. Solo las publicadas se ven en /recursos.</p>
        </div>
        <Link href="/admin/recursos/nuevo" className="admin-btn admin-btn--primary">+ Nueva nota</Link>
      </div>

      {/* MINI TUTORIAL */}
      <details className="admin-card" style={{ borderLeft: "3px solid var(--a-primary)" }}>
        <summary style={{ cursor: "pointer", fontWeight: 700, color: "var(--a-deep)", fontSize: "1.02rem" }}>
          📘 Cómo publicar una nota (guía rápida)
        </summary>
        <div style={{ marginTop: 14, color: "var(--a-muted)", fontSize: ".95rem", lineHeight: 1.7 }}>
          <ol style={{ paddingLeft: 20, listStyle: "decimal" }}>
            <li>Tocá <strong>«+ Nueva nota»</strong> (arriba a la derecha).</li>
            <li>Completá el <strong>Título</strong> y el <strong>Extracto</strong> (resumen corto que se ve en la tarjeta).</li>
            <li>Escribí el <strong>Contenido</strong> normalmente. Usá los <strong>botones de formato</strong> de arriba del editor para poner títulos, negrita, listas o enlaces (como en Word).</li>
            <li><strong>Imagen destacada</strong> (opcional): subí una foto. Se comprime sola, no importa si es pesada.</li>
            <li className="admin-badge admin-badge--on" style={{ display: "inline-block", padding: "6px 12px", margin: "6px 0" }}>
              ⚠️ Clave: en <strong>Estado</strong>, elegí <strong>«Publicada»</strong>. Si queda en «Borrador», <u>no aparece</u> en el sitio.
            </li>
            <li>Tocá <strong>«Crear nota»</strong>. Al terminar, aparece en la lista de abajo y en <strong>villarroelyasociados.com.ar/recursos</strong> al instante.</li>
          </ol>
          <p style={{ marginTop: 10 }}>
            <strong>Para editar o borrar:</strong> tocá <strong>«Editar →»</strong> en la fila de la nota.
            En la tabla, la columna <strong>Estado</strong> te dice si está <em>Publicada</em> (verde) o en <em>Borrador</em> (gris).
          </p>
          <p style={{ marginTop: 8 }}>
            <strong>¿No aparece una nota en el sitio?</strong> Revisá que su Estado sea <em>Publicada</em>.
            Si al guardar ves un cartel rojo, ese es el motivo del error; escribime y lo vemos.
          </p>
        </div>
      </details>

      {posts.length === 0 ? (
        <div className="admin-card"><div className="admin-alert admin-alert--info">Todavía no hay notas. Creá la primera con «Nueva nota».</div></div>
      ) : (
        <div className="admin-card" style={{ padding: 0 }}>
          <table className="admin-table">
            <thead>
              <tr><th>Título</th><th>Estado</th><th>Categoría</th><th>Actualizada</th><th></th></tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.title}</strong>
                    {p.isFeatured && <span className="admin-badge admin-badge--muted" style={{ marginLeft: 8 }}>Destacada</span>}
                    <div className="admin-muted">/recursos/{p.slug}</div>
                  </td>
                  <td>
                    <span className={`admin-badge ${p.status === "published" ? "admin-badge--on" : "admin-badge--muted"}`}>
                      {p.status === "published" ? "Publicada" : "Borrador"}
                    </span>
                  </td>
                  <td className="admin-muted">{p.category || "—"}</td>
                  <td className="admin-muted">{p.updatedAt.toLocaleDateString("es-AR")}</td>
                  <td><Link href={`/admin/recursos/${p.id}`} className="admin-link">Editar →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
