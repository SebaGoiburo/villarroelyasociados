"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./Icons";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/quienes-somos", label: "Quiénes somos" },
  { href: "/servicios", label: "Servicios" },
  { href: "/asociaciones-civiles-fundaciones", label: "Asociaciones / Fundaciones" },
  { href: "/recursos", label: "Recursos" },
  { href: "/contacto", label: "Contacto" },
];

type Props = {
  logoUrl: string;
  siteName: string;
  whatsappUrl: string;
  whatsappButtonText: string;
  whatsappEnabled: boolean;
};

export default function Header({
  logoUrl,
  siteName,
  whatsappUrl,
  whatsappButtonText,
  whatsappEnabled,
}: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className={`site-header${open ? " open" : ""}`} id="top">
      <div className="container">
        <Link className="brand" href="/" aria-label={`${siteName} — Inicio`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand__logo" src={logoUrl} alt={siteName} />
          <span className="brand__text">
            <span className="brand__name">Villarroel &amp; Asociados</span>
            <span className="brand__sub">Consultora</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <nav className="nav" id="nav" aria-label="Navegación principal">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "active" : undefined}
              aria-current={isActive(item.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {whatsappEnabled && (
          <div className="header-cta">
            <a
              className="btn btn--wa"
              href={whatsappUrl}
              data-wa-location="header"
              target="_blank"
              rel="noopener"
            >
              <WhatsAppIcon /> {whatsappButtonText}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
