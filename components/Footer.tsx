import Link from "next/link";
import type { SiteSettings } from "@prisma/client";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import {
  WhatsAppIcon,
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  ClockIcon,
} from "./Icons";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const waUrl = buildWhatsappUrl(settings);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link className="brand brand--footer" href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="brand__logo" src={settings.logoUrl} alt="Villarroel & Asociados Consultora" />
              <span className="brand__text">
                <span className="brand__name">Villarroel &amp; Asociados</span>
                <span className="brand__sub">Consultora</span>
              </span>
            </Link>
            <p>
              Más de 22 años acompañando a empresas y organizaciones con profesionalismo,
              experiencia, cercanía y una visión moderna de la gestión.
            </p>
            <div className="socials">
              <a href="#" aria-label="LinkedIn (próximamente)" rel="noopener"><LinkedInIcon /></a>
              <a href="#" aria-label="Instagram (próximamente)" rel="noopener"><InstagramIcon /></a>
              <a href="#" aria-label="Facebook (próximamente)" rel="noopener"><FacebookIcon /></a>
              {settings.whatsappEnabled && (
                <a href={waUrl} aria-label="WhatsApp" target="_blank" rel="noopener" data-wa-location="footer"><WhatsAppIcon /></a>
              )}
            </div>
          </div>

          <div className="footer-col">
            <h4>Sitio</h4>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/quienes-somos">Quiénes somos</Link></li>
              <li><Link href="/servicios">Servicios</Link></li>
              <li><Link href="/asociaciones-civiles-fundaciones">Asociaciones / Fundaciones</Link></li>
              <li><Link href="/recursos">Recursos</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Servicios</h4>
            <ul>
              <li><Link href="/servicios#asesoramiento-contable">Asesoramiento contable</Link></li>
              <li><Link href="/servicios#gestion-impositiva">Gestión impositiva</Link></li>
              <li><Link href="/servicios#auditoria">Auditoría</Link></li>
              <li><Link href="/servicios#societario">Constitución societaria</Link></li>
              <li><Link href="/servicios#consultoria">Consultoría organizacional</Link></li>
              <li><Link href="/servicios#transformacion-digital">Transformación digital</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <ul className="footer-contact">
              <li><MapPinIcon /><span>Albuera 21, 1° Piso, Of. A,<br />San Martín, Mendoza, Argentina</span></li>
              <li><MailIcon /><a href={`mailto:${settings.contactRecipientEmail}`}>{settings.contactRecipientEmail}</a></li>
              <li><PhoneIcon /><a href={`tel:+${settings.whatsappNumber}`}>+54 9 2634 34-6645</a></li>
              <li><ClockIcon /><span>Lunes a viernes de 9:00 a 16:00</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Villarroel &amp; Asociados Consultora. Todos los derechos reservados.</span>
          <span><Link href="/politicas-de-privacidad">Políticas de privacidad</Link></span>
        </div>
      </div>
    </footer>
  );
}
