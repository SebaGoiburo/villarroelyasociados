import Link from "next/link";
import { WhatsAppIcon } from "./Icons";

type Props = {
  title: string;
  text: string;
  waUrl: string;
  primaryLabel: string;
  secondaryLabel: string;
  secondaryHref?: string;
  waEnabled?: boolean;
};

export default function CtaBand({
  title,
  text,
  waUrl,
  primaryLabel,
  secondaryLabel,
  secondaryHref = "/contacto",
  waEnabled = true,
}: Props) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band reveal">
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="hero__cta">
            {waEnabled && (
              <a
                className="btn btn--wa btn--lg"
                href={waUrl}
                data-wa-location="cta-final"
                target="_blank"
                rel="noopener"
              >
                <WhatsAppIcon /> {primaryLabel}
              </a>
            )}
            <Link className="btn btn--light btn--lg" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
