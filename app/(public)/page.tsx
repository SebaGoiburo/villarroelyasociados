import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/settings";
import { getPageContent } from "@/lib/content";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { SERVICES } from "@/lib/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import { WhatsAppIcon, ArrowRight, ClockIcon } from "@/components/Icons";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent("inicio");
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: "/" },
    openGraph: { title: c.ogTitle, description: c.ogDescription },
  };
}

const VALUE_DOTS = [
  { key: "values.capacidad", label: "Capacidad", color: "var(--blue)" },
  { key: "values.costos", label: "Costos", color: "var(--orange)" },
  { key: "values.control", label: "Control", color: "var(--red)" },
  { key: "values.comunicacion", label: "Comunicación", color: "var(--teal)" },
  { key: "values.competitividad", label: "Competitividad", color: "var(--green)" },
];

export default async function HomePage() {
  const settings = await getSettings();
  const { c } = await getPageContent("inicio");
  const waUrl = buildWhatsappUrl(settings);
  const waEnabled = settings.whatsappEnabled && settings.whatsappCtaEnabled;

  const accentClass = (a: string) => `card accent-${a} reveal`;

  return (
    <main id="main">
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div>
              <span className="eyebrow">{c("hero.kicker")}</span>
              <h1>{c("hero.title")}</h1>
              <p className="hero__text">{c("hero.text")}</p>
              <div className="hero__cta">
                {waEnabled && (
                  <a className="btn btn--wa btn--lg" href={waUrl} data-wa-location="hero" target="_blank" rel="noopener">
                    <WhatsAppIcon /> {c("hero.ctaPrimary")}
                  </a>
                )}
                <Link className="btn btn--outline-light btn--lg" href="/servicios">
                  {c("hero.ctaSecondary")}
                </Link>
              </div>
              <p className="hero__micro">
                <ClockIcon width={16} height={16} /> {c("hero.micro")}
              </p>
            </div>
            <div className="hero__media" aria-hidden="true">
              <span className="ph-label">
                Espacio para foto profesional del equipo u oficina de Villarroel &amp; Asociados
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MÉTRICAS */}
      <section className="section--tight section--blue">
        <div className="container">
          <div className="metrics">
            {[1, 2, 3, 4].map((i) => (
              <div className="metric" key={i}>
                <div className="metric__num">{c(`metrics.${i}.num`)}</div>
                <div className="metric__label">{c(`metrics.${i}.label`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESAFÍO */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="reveal">
              <span className="eyebrow">{c("challenge.eyebrow")}</span>
              <h2>{c("challenge.title")}</h2>
              <p className="lead mt-2">{c("challenge.text")}</p>
            </div>
            <ul className="checklist reveal">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i}>{c(`challenge.item${i}`)}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* EJES DE VALOR */}
      <section className="section section--gray">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">{c("values.eyebrow")}</span>
            <h2>{c("values.title")}</h2>
          </div>
          <div className="grid grid-3">
            {VALUE_DOTS.map((v) => (
              <div className="value-card reveal" key={v.key}>
                <div className="tag">
                  <span className="dot" style={{ background: v.color }} />
                  {v.label}
                </div>
                <p>{c(v.key)}</p>
              </div>
            ))}
            <div className="value-card reveal" style={{ background: "var(--deep-blue)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h3 style={{ color: "#fff" }}>¿Querés ver cómo se aplica a tu caso?</h3>
              <p style={{ color: "#c7d2de", margin: "8px 0 16px" }}>
                Conversemos por WhatsApp y te orientamos sin compromiso.
              </p>
              {waEnabled && (
                <a className="btn btn--wa" href={waUrl} data-wa-location="ejes" target="_blank" rel="noopener">
                  Hablar por WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS DESTACADOS */}
      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">{c("services.eyebrow")}</span>
            <h2>{c("services.title")}</h2>
          </div>
          <div className="grid grid-4">
            {SERVICES.map((s) => {
              const href =
                s.id === "asociaciones"
                  ? "/asociaciones-civiles-fundaciones"
                  : `/servicios#${s.id}`;
              return (
                <article className={accentClass(s.accent)} key={s.id}>
                  <div className="card__icon"><ServiceIcon name={s.icon} /></div>
                  <h3>{s.shortTitle}</h3>
                  <p>{s.tagline}</p>
                  <Link className="card__link" href={href}>
                    Ver detalle <ArrowRight />
                  </Link>
                </article>
              );
            })}
          </div>
          <div className="text-center mt-3">
            <Link className="btn btn--ghost btn--lg" href="/servicios">Ver todos los servicios</Link>
          </div>
        </div>
      </section>

      {/* MÉTODO */}
      <section className="section section--gray">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">{c("method.eyebrow")}</span>
            <h2>{c("method.title")}</h2>
          </div>
          <div className="steps">
            {[1, 2, 3, 4].map((i) => (
              <div className="step reveal" key={i}>
                <div className="step__num">{i}</div>
                <h3>{c(`method.${i}.title`)}</h3>
                <p>{c(`method.${i}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS RESUMIDO */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="portrait reveal" aria-hidden="true">
              <span>Espacio para foto institucional / equipo de Villarroel &amp; Asociados</span>
            </div>
            <div className="reveal">
              <span className="eyebrow">{c("about.eyebrow")}</span>
              <h2>{c("about.title")}</h2>
              <p className="lead mt-2">{c("about.text")}</p>
              <div className="mt-3">
                <Link className="btn btn--primary" href="/quienes-somos">{c("about.cta")}</Link>
              </div>
            </div>
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
          <Faq
            items={[1, 2, 3, 4].map((i) => ({
              q: c(`faq.${i}.q`),
              a: c(`faq.${i}.a`),
            }))}
          />
        </div>
      </section>

      {/* CTA FINAL */}
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
