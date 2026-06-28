import type { Metadata } from "next";
import Link from "next/link";
import { PAGE_DEFAULTS } from "@/lib/content-defaults";

export const metadata: Metadata = { title: "Contenidos · Admin" };

export default function ContenidosPage() {
  return (
    <>
      <div className="admin-page-head">
        <h1>Contenidos</h1>
        <p>Editá los textos de cada página del sitio. Los cambios se reflejan al guardar.</p>
      </div>
      <div className="admin-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead>
            <tr><th>Página</th><th>Ruta</th><th></th></tr>
          </thead>
          <tbody>
            {PAGE_DEFAULTS.map((p) => (
              <tr key={p.slug}>
                <td><strong>{p.name}</strong></td>
                <td className="admin-muted">/{p.slug === "inicio" ? "" : p.slug}</td>
                <td><Link href={`/admin/contenidos/${p.slug}`} className="admin-link">Editar →</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
