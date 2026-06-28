/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
