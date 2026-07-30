"use client";

import { useEffect, useState } from "react";

/**
 * Animación de carga: las 5 bolitas de la marca aparecen una a una y luego
 * se funden en el logo oficial. Se muestra en cada carga de página.
 * Respeta prefers-reduced-motion y tiene tope de tiempo para no bloquear.
 */
export default function Preloader({ logoUrl = "/logo_principal.svg" }: { logoUrl?: string }) {
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const tHide = setTimeout(() => setHidden(true), reduce ? 150 : 2700);
    const tGone = setTimeout(() => setGone(true), reduce ? 500 : 3400);
    return () => {
      clearTimeout(tHide);
      clearTimeout(tGone);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`preloader${hidden ? " is-hidden" : ""}`} aria-hidden="true">
      <div className="preloader__stage">
        <svg className="preloader__dots" viewBox="0 0 64 64">
          <circle className="d1" cx="24" cy="14" r="9" fill="#009CDE" />
          <circle className="d2" cx="20" cy="34" r="8" fill="#D22630" />
          <circle className="d3" cx="50" cy="12" r="5" fill="#00B398" />
          <circle className="d4" cx="42" cy="22" r="6" fill="#FF9E1B" />
          <circle className="d5" cx="38" cy="42" r="10" fill="#009F4D" />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="preloader__logo" src={logoUrl} alt="Villarroel & Asociados Consultora" />
      </div>
    </div>
  );
}
