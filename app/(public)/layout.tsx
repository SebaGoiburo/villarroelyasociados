import { getSettings } from "@/lib/settings";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SiteAnalytics from "@/components/SiteAnalytics";
import Pixels, { GtmNoScript } from "@/components/Pixels";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const waUrl = buildWhatsappUrl(settings);

  return (
    <>
      <Pixels settings={settings} />
      <GtmNoScript settings={settings} />

      <a className="skip-link" href="#main">Saltar al contenido</a>

      <Header
        logoUrl={settings.logoUrl}
        siteName={settings.siteName}
        whatsappUrl={waUrl}
        whatsappButtonText={settings.whatsappButtonText}
        whatsappEnabled={settings.whatsappEnabled}
      />

      {children}

      <Footer settings={settings} />

      {settings.whatsappEnabled && settings.whatsappFloating && (
        <WhatsAppFloat url={waUrl} />
      )}

      <SiteAnalytics />
    </>
  );
}
