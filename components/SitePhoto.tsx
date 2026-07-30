import Image from "next/image";
import { findPublicImage } from "@/lib/site-images";

type Props = {
  /** Nombre base del archivo en /public, sin extensión (ej. "oficina-villarroel") */
  file: string;
  alt: string;
  variant: "hero" | "portrait";
  placeholder: string;
};

/**
 * Muestra la foto real si el archivo existe en /public (con optimización de
 * Next/Vercel: WebP + responsive). Si no existe, muestra el placeholder gris.
 */
export default function SitePhoto({ file, alt, variant, placeholder }: Props) {
  const src = findPublicImage(file);
  const baseClass = variant === "hero" ? "hero__media" : "portrait reveal";

  if (!src) {
    return (
      <div className={baseClass} aria-hidden="true">
        <span className={variant === "hero" ? "ph-label" : undefined}>{placeholder}</span>
      </div>
    );
  }

  return (
    <div className={`${baseClass} has-photo`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 980px) 92vw, 520px"
        style={{ objectFit: "cover" }}
        priority={variant === "hero"}
      />
    </div>
  );
}
