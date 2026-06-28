"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/contenidos", label: "Contenidos", icon: "doc" },
  { href: "/admin/configuracion", label: "Configuración general", icon: "gear" },
  { href: "/admin/medicion", label: "Medición / Píxeles", icon: "chart" },
  { href: "/admin/recursos", label: "Recursos", icon: "news" },
];

const ICONS: Record<string, React.ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  chart: <><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" /><rect x="12" y="8" width="3" height="10" /><rect x="17" y="5" width="3" height="13" /></>,
  news: <><path d="M4 4h13v16H4z" /><path d="M17 8h3v10a2 2 0 0 1-2 2M8 8h5M8 12h5M8 16h3" /></>,
};

export default function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      <button className="admin-burger" aria-label="Menú" onClick={() => setOpen((v) => !v)}>
        <span /><span /><span />
      </button>

      <aside className={`admin-sidebar${open ? " open" : ""}`}>
        <Link href="/admin" className="admin-sidebar__brand" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" width={36} height={36} />
          <div>
            <strong>Villarroel &amp; Asociados</strong>
            <span>Panel admin</span>
          </div>
        </Link>

        <nav className="admin-nav">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                {ICONS[item.icon]}
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-user">
            <span className="admin-user__avatar">{userName.charAt(0).toUpperCase()}</span>
            <div className="admin-user__info">
              <strong>{userName}</strong>
              <span>Administrador</span>
            </div>
          </div>
          <form action={logoutAction}>
            <button type="submit" className="admin-btn admin-btn--ghost admin-btn--block">
              Cerrar sesión
            </button>
          </form>
          <Link href="/" target="_blank" className="admin-sidebar__viewsite">Ver sitio público ↗</Link>
        </div>
      </aside>

      {open && <div className="admin-overlay" onClick={() => setOpen(false)} />}
    </>
  );
}
