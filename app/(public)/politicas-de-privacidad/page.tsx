import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Políticas de privacidad",
  description:
    "Información sobre el tratamiento de datos personales en Villarroel & Asociados Consultora.",
  alternates: { canonical: "/politicas-de-privacidad" },
  robots: { index: false },
};

export default function PrivacidadPage() {
  return (
    <main id="main">
      <section className="hero">
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="eyebrow">Legal</span>
          <h1>Políticas de privacidad</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose" style={{ maxWidth: 820 }}>
          <p>
            Esta página es un marcador temporal. El texto definitivo de las políticas de
            privacidad será provisto por Villarroel &amp; Asociados Consultora antes de la
            publicación del sitio.
          </p>
          <p>
            Los datos que ingresás en el formulario de contacto se utilizan exclusivamente
            para responder tu consulta y no se comparten con terceros.
          </p>
        </div>
      </section>
    </main>
  );
}
