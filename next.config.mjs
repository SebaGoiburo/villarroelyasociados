/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Permitir subir imágenes en formularios del panel (default es 1 MB).
    serverActions: { bodySizeLimit: "8mb" },
  },
  images: {
    // Permitir imágenes servidas desde Vercel Blob en producción.
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  // No incluir la carpeta legacy (sitio estático de referencia) en el build.
  outputFileTracingExcludes: {
    "*": ["./legacy/**"],
  },
};

export default nextConfig;
