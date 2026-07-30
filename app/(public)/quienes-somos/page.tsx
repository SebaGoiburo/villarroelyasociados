import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/settings";
import { getPageContent } from "@/lib/content";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import CtaBand from "@/components/CtaBand";
import SitePhoto from "@/components/SitePhoto";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent("quienes-somos");
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: "/quienes-somos" },
    openGraph: { title: c.ogTitle, description: c.ogDescription },
  };
}

const VALUE_ICONS: Record<string, { bg: string; color: string; path: React.ReactNode }> = {
  "1": { bg: "rgba(0,156,222,.1)", color: "var(--blue)", path: <path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1L12 16.6 5.7 21l2.3-7.1-6-4.5h7.6z" /> },
  "2": { bg: "rgba(0,159,77,.1)", color: "var(--green)", path: <><circle cx="12" cy="8" r="5" /><path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5" /></> },
  "3": { bg: "rgba(210,38,48,.09)", color: "var(--red)", path: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /> },
  "4": { bg: "rgba(0,179,152,.12)", color: "var(--teal)", path: <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" /> },
};

export default async function QuienesSomosPage() {
  const settings = await getSettings();
  const { c } = await getPageContent("quienes-somos");
  const waUrl = buildWhatsappUrl(settings);
  const waEnabled = settings.whatsappEnabled && settings.whatsappCtaEnabled;

  return (
    <main id="main">
      <section className="hero">
        <div className="container">
          <span className="eyebrow">{c("hero.eyebrow")}</span>
          <h1>{c("hero.title")}</h1>
          <p className="hero__text">{c("hero.text")}</p>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <SitePhoto
              file="equipo-villarroel"
              alt="Oficina de Villarroel & Asociados Consultora en San Martín, Mendoza"
              variant="portrait"
              placeholder="Espacio para foto profesional del equipo / oficina"
            />
            <div className="reveal">
              <span className="eyebrow">{c("history.eyebrow")}</span>
              <h2>{c("history.title")}</h2>
              <p className="mt-2">{c("history.p1")}</p>
              <p className="mt-2">{c("history.p2")}</p>
              <p className="mt-2">{c("history.p3")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="section section--gray">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">{c("values.eyebrow")}</span>
            <h2>{c("values.title")}</h2>
          </div>
          <div className="grid grid-4">
            {["1", "2", "3", "4"].map((i) => {
              const ic = VALUE_ICONS[i];
              return (
                <div className="card reveal" key={i}>
                  <div className="value-icon" style={{ background: ic.bg, color: ic.color }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{ic.path}</svg>
                  </div>
                  <h3>{c(`values.${i}.title`)}</h3>
                  <p>{c(`values.${i}.text`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MIRADA */}
      <section className="section">
        <div className="container">
          <div className="cta-band" style={{ background: "linear-gradient(120deg,#0F2238,#143a5a)" }}>
            <span className="eyebrow" style={{ color: "var(--teal)" }}>{c("vision.eyebrow")}</span>
            <h2>{c("vision.title")}</h2>
            <p>{c("vision.text")}</p>
          </div>
        </div>
      </section>

      {/* DIRECTOR */}
      <section className="section section--gray">
        <div className="container">
          <div className="about-grid">
            <SitePhoto
              file="juan-villarroel"
              alt="Dr. Juan Antonio Villarroel, Director General de Villarroel & Asociados Consultora"
              variant="portrait"
              placeholder="Espacio para foto profesional del Dr. Juan Antonio Villarroel — Director General"
            />
            <div className="reveal">
              <span className="eyebrow">{c("director.eyebrow")}</span>
              <h2>{c("director.name")}</h2>
              <p style={{ fontWeight: 700, color: "var(--blue)", marginTop: 4 }}>{c("director.role")}</p>
              <p className="mt-2">{c("director.text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO — CRA. MARÍA SOLEDAD VILLARROEL */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="reveal">
              <span className="eyebrow">{c("soledad.eyebrow")}</span>
              <h2>{c("soledad.name")}</h2>
              <p style={{ fontWeight: 700, color: "var(--blue)", marginTop: 4 }}>{c("soledad.role")}</p>
              <p className="mt-2">{c("soledad.text")}</p>
              <div className="mt-3">
                <Link className="btn btn--primary" href="/servicios">Ver nuestros servicios</Link>
              </div>
            </div>
            <SitePhoto
              file="soledad-villarroel"
              alt="Cra. María Soledad Villarroel, Contadora Pública de Villarroel & Asociados Consultora"
              variant="portrait"
              placeholder="Espacio para foto profesional de la Cra. María Soledad Villarroel"
            />
          </div>
        </div>
      </section>

      <CtaBand
        title={c("ctaFinal.title")}
        text={c("ctaFinal.text")}
        waUrl={waUrl}
        primaryLabel={c("ctaFinal.ctaPrimary")}
        secondaryLabel={c("ctaFinal.ctaSecondary")}
        waEnabled={waEnabled}
      />
    </main>
  );
}
