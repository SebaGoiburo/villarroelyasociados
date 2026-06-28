import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/settings";
import { getPageContent } from "@/lib/content";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { SERVICES } from "@/lib/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import { WhatsAppIcon } from "@/components/Icons";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent("servicios");
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: "/servicios" },
    openGraph: { title: c.ogTitle, description: c.ogDescription },
  };
}

export default async function ServiciosPage() {
  const settings = await getSettings();
  const { c } = await getPageContent("servicios");
  const waUrl = buildWhatsappUrl(settings);
  const waEnabled = settings.whatsappEnabled && settings.whatsappCtaEnabled;

  return (
    <main id="main">
      <section className="hero">
        <div className="container">
          <span className="eyebrow">{c("hero.eyebrow")}</span>
          <h1>{c("hero.title")}</h1>
          <p className="hero__text">{c("hero.text")}</p>
          {waEnabled && (
            <div className="hero__cta">
              <a className="btn btn--wa btn--lg" href={waUrl} data-wa-location="hero" target="_blank" rel="noopener">
                <WhatsAppIcon /> {c("hero.cta")}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Índice */}
      <section className="section--tight section--gray">
        <div className="container">
          <div className="cat-pills">
            {SERVICES.map((s) => (
              <a className="cat-pill" href={`#${s.id}`} key={s.id}>{s.shortTitle}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Detalles */}
      <section className="section">
        <div className="container">
          {SERVICES.map((s) => {
            const serviceWa = buildWhatsappUrl(settings, s.waMessage);
            return (
              <article className={`service-detail accent-${s.accent} reveal`} id={s.id} key={s.id}>
                <div className="service-detail__head">
                  <div className="card__icon"><ServiceIcon name={s.icon} /></div>
                  <div>
                    <h2>{s.title}</h2>
                    <p className="mt-0">{s.tagline}</p>
                  </div>
                </div>
                <div className="service-detail__cols">
                  <div className="spec">
                    <h4>Incluye</h4>
                    <ul>{s.includes.map((x, i) => <li key={i}>{x}</li>)}</ul>
                  </div>
                  <div className="spec">
                    <h4>Beneficios</h4>
                    <ul>{s.benefits.map((x, i) => <li key={i}>{x}</li>)}</ul>
                  </div>
                  <div className="spec">
                    <h4>Ideal para</h4>
                    <p>{s.idealFor}</p>
                  </div>
                </div>
                {s.id === "asociaciones" ? (
                  <div className="hero__cta">
                    {waEnabled && (
                      <a className="btn btn--wa" href={serviceWa} data-wa-location={`serv-${s.id}`} target="_blank" rel="noopener">{s.ctaText}</a>
                    )}
                    <Link className="btn btn--ghost" href="/asociaciones-civiles-fundaciones">Ver página especializada</Link>
                  </div>
                ) : (
                  waEnabled && (
                    <a className="btn btn--wa" href={serviceWa} data-wa-location={`serv-${s.id}`} target="_blank" rel="noopener">{s.ctaText}</a>
                  )
                )}
              </article>
            );
          })}
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
