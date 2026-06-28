import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/settings";
import { getPageContent } from "@/lib/content";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon, ArrowRight } from "@/components/Icons";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent("asociaciones-civiles-fundaciones");
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: "/asociaciones-civiles-fundaciones" },
    openGraph: { title: c.ogTitle, description: c.ogDescription },
  };
}

const HELP_ICONS: Record<string, { accent: string; path: React.ReactNode }> = {
  "1": { accent: "green", path: <><path d="M12 2 3 7v6c0 5 3.8 8.5 9 9 5.2-.5 9-4 9-9V7z" /><path d="m9 12 2 2 4-4" /></> },
  "2": { accent: "blue", path: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 14l2 2 4-4" /></> },
  "3": { accent: "teal", path: <><path d="M3 3v18h18" /><path d="M7 14l4-4 3 3 5-6" /></> },
  "4": { accent: "red", path: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></> },
  "5": { accent: "orange", path: <><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></> },
};

export default async function AsociacionesPage() {
  const settings = await getSettings();
  const { c } = await getPageContent("asociaciones-civiles-fundaciones");
  const entityWa = buildWhatsappUrl(
    settings,
    "Hola Villarroel & Asociados, quiero consultar por mi entidad. Mi nombre es [nombre] y represento a [organización]."
  );
  const waEnabled = settings.whatsappEnabled && settings.whatsappCtaEnabled;

  return (
    <main id="main">
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div>
              <span className="eyebrow">{c("hero.eyebrow")}</span>
              <h1>{c("hero.title")}</h1>
              <p className="hero__text">{c("hero.text")}</p>
              <div className="hero__cta">
                {waEnabled && (
                  <a className="btn btn--wa btn--lg" href={entityWa} data-wa-location="hero" target="_blank" rel="noopener">
                    <WhatsAppIcon /> {c("hero.cta")}
                  </a>
                )}
                <a className="btn btn--outline-light btn--lg" href="#acompanar">Cómo podemos ayudar</a>
              </div>
            </div>
            <div className="hero__media" aria-hidden="true">
              <span className="ph-label">Espacio para imagen de reunión / comisión directiva (overlay azul sutil)</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMAS */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">{c("problems.eyebrow")}</span>
            <h2>{c("problems.title")}</h2>
          </div>
          <div className="grid grid-2">
            <ul className="problem-list reveal">
              {["1", "2", "3"].map((i) => <li key={i}>{c(`problems.${i}`)}</li>)}
            </ul>
            <ul className="problem-list reveal">
              {["4", "5", "6"].map((i) => <li key={i}>{c(`problems.${i}`)}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* CÓMO ACOMPAÑAMOS */}
      <section className="section section--gray" id="acompanar">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">{c("help.eyebrow")}</span>
            <h2>{c("help.title")}</h2>
          </div>
          <div className="grid grid-3">
            {["1", "2", "3", "4", "5"].map((i) => {
              const ic = HELP_ICONS[i];
              return (
                <article className={`card accent-${ic.accent} reveal`} key={i}>
                  <div className="card__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{ic.path}</svg>
                  </div>
                  <h3>{c(`help.${i}.title`)}</h3>
                  <p>{c(`help.${i}.text`)}</p>
                </article>
              );
            })}
            <article className="card reveal" style={{ background: "var(--deep-blue)", justifyContent: "center" }}>
              <h3 style={{ color: "#fff" }}>¿Tu entidad necesita ordenarse?</h3>
              <p style={{ color: "#c7d2de" }}>Escribinos y armamos juntos un plan de trabajo claro.</p>
              {waEnabled && (
                <a className="card__link" style={{ color: "var(--teal)" }} href={entityWa} data-wa-location="acompanar" target="_blank" rel="noopener">
                  Hablar por WhatsApp <ArrowRight />
                </a>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="reveal">
              <span className="eyebrow">{c("benefits.eyebrow")}</span>
              <h2>{c("benefits.title")}</h2>
              <p className="lead mt-2">{c("benefits.lead")}</p>
            </div>
            <ul className="checklist reveal">
              {["1", "2", "3", "4", "5"].map((i) => <li key={i}>{c(`benefits.${i}`)}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--gray">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">{c("faq.eyebrow")}</span>
            <h2>{c("faq.title")}</h2>
          </div>
          <Faq items={[1, 2, 3, 4].map((i) => ({ q: c(`faq.${i}.q`), a: c(`faq.${i}.a`) }))} />
        </div>
      </section>

      <CtaBand
        title={c("ctaFinal.title")}
        text={c("ctaFinal.text")}
        waUrl={entityWa}
        primaryLabel={c("ctaFinal.ctaPrimary")}
        secondaryLabel={c("ctaFinal.ctaSecondary")}
        waEnabled={waEnabled}
      />
    </main>
  );
}
