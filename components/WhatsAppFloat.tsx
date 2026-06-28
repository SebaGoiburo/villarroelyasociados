import { WhatsAppIcon } from "./Icons";

export default function WhatsAppFloat({ url }: { url: string }) {
  return (
    <a
      className="wa-float"
      href={url}
      data-wa-location="float"
      aria-label="Escribinos por WhatsApp"
      target="_blank"
      rel="noopener"
    >
      <WhatsAppIcon />
    </a>
  );
}
