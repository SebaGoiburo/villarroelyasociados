import Link from "next/link";
import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Dashboard · Admin" };
export const dynamic = "force-dynamic";

function Badge({ on, labelOn = "Configurado", labelOff = "No configurado" }: { on: boolean; labelOn?: string; labelOff?: string }) {
  return (
    <span className={`admin-badge ${on ? "admin-badge--on" : "admin-badge--off"}`}>
      {on ? labelOn : labelOff}
    </span>
  );
}

export default async function DashboardPage() {
  const settings = await getSettings();

  let publishedCount = 0;
  let draftCount = 0;
  try {
    publishedCount = await prisma.resourcePost.count({ where: { status: "published" } });
    draftCount = await prisma.resourcePost.count({ where: { status: "draft" } });
  } catch {
    /* ignore */
  }

  const metaOn = settings.metaPixelEnabled && !!settings.metaPixelId.trim();
  const googleOn =
    (settings.googleTagManagerEnabled && !!settings.googleTagManagerId.trim()) ||
    (settings.googleAnalyticsEnabled && !!settings.googleAnalyticsId.trim()) ||
    (settings.googleAdsEnabled && !!settings.googleAdsConversionId.trim());

  return (
    <>
      <div className="admin-page-head">
        <h1>Dashboard</h1>
        <p>Resumen del estado del sitio y accesos rápidos.</p>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__label">Sitio</div>
          <div className="admin-stat__value small">{settings.siteName}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Formulario de contacto</div>
          <div className="admin-stat__value small">{settings.contactRecipientEmail}</div>
          <div style={{ marginTop: 8 }}>
            <Badge on={!!settings.contactRecipientEmail} labelOn="Activo" labelOff="Sin email" />
          </div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">WhatsApp</div>
          <div className="admin-stat__value small">
            {settings.whatsappEnabled ? settings.whatsappNumber : "Desactivado"}
          </div>
          <div style={{ marginTop: 8 }}>
            <Badge on={settings.whatsappEnabled} labelOn="Activo" labelOff="Desactivado" />
          </div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Pixel de Meta</div>
          <div className="admin-stat__value small">{metaOn ? settings.metaPixelId : "—"}</div>
          <div style={{ marginTop: 8 }}><Badge on={metaOn} /></div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Google (GTM / GA4 / Ads)</div>
          <div className="admin-stat__value small">
            {googleOn ? (settings.googleTagManagerId || settings.googleAnalyticsId || settings.googleAdsConversionId) : "—"}
          </div>
          <div style={{ marginTop: 8 }}><Badge on={googleOn} /></div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Notas en Recursos</div>
          <div className="admin-stat__value">{publishedCount}</div>
          <div className="admin-muted" style={{ marginTop: 6 }}>
            {publishedCount} publicada{publishedCount === 1 ? "" : "s"} · {draftCount} borrador{draftCount === 1 ? "" : "es"}
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card__head">
          <h2>Accesos rápidos</h2>
          <p>Las tareas más frecuentes de gestión del sitio.</p>
        </div>
        <div className="admin-quick">
          <Link href="/admin/contenidos">
            <span className="admin-quick__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg></span>
            <div><strong>Editar contenidos</strong><span>Textos de cada página</span></div>
          </Link>
          <Link href="/admin/configuracion">
            <span className="admin-quick__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg></span>
            <div><strong>Configuración general</strong><span>Logo, WhatsApp y email</span></div>
          </Link>
          <Link href="/admin/medicion">
            <span className="admin-quick__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><rect x="7" y="12" width="3" height="6" /><rect x="12" y="8" width="3" height="10" /></svg></span>
            <div><strong>Medición / Píxeles</strong><span>Meta y Google</span></div>
          </Link>
          <Link href="/admin/recursos">
            <span className="admin-quick__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h13v16H4z" /><path d="M17 8h3v10a2 2 0 0 1-2 2M8 8h5M8 12h5" /></svg></span>
            <div><strong>Recursos</strong><span>Crear y editar notas</span></div>
          </Link>
        </div>
      </div>
    </>
  );
}
