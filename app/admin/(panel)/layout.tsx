import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "../admin.css";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Doble verificación (además del middleware) por seguridad.
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <AdminSidebar userName={session.name} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
