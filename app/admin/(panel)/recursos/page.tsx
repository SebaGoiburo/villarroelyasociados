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
