import fs from "fs";
import path from "path";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

/**
 * Busca una imagen en /public por nombre base (sin extensión).
 * Devuelve la URL pública (ej. "/oficina-villarroel.jpg") o null si no existe.
 * Así el sitio muestra la foto real si el archivo está, o el placeholder si no.
 */
export function findPublicImage(baseName: string): string | null {
  try {
    for (const ext of EXTENSIONS) {
      const file = `${baseName}.${ext}`;
      if (fs.existsSync(path.join(process.cwd(), "public", file))) {
        return `/${file}`;
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}
