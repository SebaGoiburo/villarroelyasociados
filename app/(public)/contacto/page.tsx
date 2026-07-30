import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { getPageContent } from "@/lib/content";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import ContactForm from "@/components/ContactForm";
import { WhatsAppIcon, MailIcon, MapPinIcon, ClockIcon, PhoneIcon } from "@/components/Icons";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent("contacto");
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: "/contacto" },
    openGraph: { title: c.ogTitle, description: c.ogDescription },
  };
}

export default async function ContactoPage() {
  const settings = await getSettings();
  const { c } = await getPageContent("contacto");
  const waUrl = buildWhatsappUrl(settings);
  const waEnabled = settings.whatsappEnabled && settings.whatsappCtaEnabled;
  const email = settings.contactRecipientEmail;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AccountingService", "ProfessionalService"],
    name: "Villarroel & Asociados Consultora",
    url: `${siteUrl}/contacto`,
    telephone: "+5492634346645",
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Albuera 21, 1° Piso, Oficina A",
      addressLocality: "San Martín",
      addressRegion: "Mendoza",
      addressCountry: "AR",
    },
    areaServed: { "@type": "State", name: "Mendoza" },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "16:00",
    },
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero">
        <div className="container">
          <span className="eyebrow">{c("hero.eyebrow")}</span>
          <h1>{c("hero.title")}</h1>
          <p className="hero__text">{c("hero.text")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-grid" style={{ alignItems: "start" }}>
            {/* Datos */}
            <div className="reveal">
              <h2>{c("data.title")}</h2>
              <div className="mt-3">
                {waEnabled && (
                  <div className="contact-item">
                    <span className="ci-icon"><WhatsAppIcon /></span>
                    <div>
                      <h4>WhatsApp / Teléfono</h4>
                      <a href={waUrl} data-wa-location="contacto-datos" target="_blank" rel="noopener">{c("data.phone")}</a>
                    </div>
                  </div>
                )}
                <div className="contact-item">
                  <span className="ci-icon"><MailIcon /></span>
                  <div><h4>Email</h4><a href={`mailto:${email}`}>{email}</a></div>
                </div>
                <div className="contact-item">
                  <span className="ci-icon"><MapPinIcon /></span>
                  <div><h4>Dirección</h4><p>{c("data.address")}</p></div>
                </div>
                <div className="contact-item">
                  <span className="ci-icon"><ClockIcon /></span>
                  <div><h4>Horario</h4><p>{c("data.hours")}</p></div>
                </div>
                <div className="contact-item">
                  <span className="ci-icon"><PhoneIcon /></span>
                  <div><h4>Modalidad</h4><p>{c("data.modality")}</p></div>
                </div>
              </div>
              <iframe
                className="map-embed mt-2"
                title="Ubicación de Villarroel & Asociados Consultora en San Martín, Mendoza"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Albuera%2021%2C%20San%20Mart%C3%ADn%2C%20Mendoza%2C%20Argentina&output=embed"
              />
            </div>

            {/* Formulario */}
            <ContactForm
              successMessage={c("form.success")}
              submitLabel={c("form.submit")}
              whatsappUrl={waUrl}
              whatsappEnabled={waEnabled}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
