import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024; // 3 MB

export type UploadResult = { url: string } | { error: string };

function extFor(type: string): string {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

/**
 * Guarda una imagen validando tipo y tamaño.
 * - Producción (BLOB_READ_WRITE_TOKEN): Vercel Blob.
 * - Desarrollo: /public/uploads (servido como /uploads/...).
 */
export async function saveImage(file: File, prefix = "img"): Promise<UploadResult> {
  if (!file || file.size === 0) return { error: "No se recibió ningún archivo." };
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { error: "Formato no permitido. Usá PNG, JPG o WebP." };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { error: "La imagen supera el tamaño máximo de 3 MB." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${prefix}-${Date.now()}.${extFor(file.type)}`;

  // Producción: Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import("@vercel/blob");
      const blob = await put(filename, buffer, {
        access: "public",
        contentType: file.type,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return { url: blob.url };
    } catch {
      return { error: "No se pudo subir la imagen al almacenamiento." };
    }
  }

  // Desarrollo: filesystem local
  try {
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), buffer);
    return { url: `/uploads/${filename}` };
  } catch {
    return { error: "No se pudo guardar la imagen." };
  }
}
