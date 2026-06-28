import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-hanken",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Villarroel & Asociados Consultora",
    template: "%s | Villarroel & Asociados",
  },
  description:
    "Consultora contable, impositiva y organizacional para empresas, PyMEs, asociaciones civiles y fundaciones en Mendoza.",
  openGraph: { locale: "es_AR", type: "website" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className={hanken.variable}>
      <body>{children}</body>
    </html>
  );
}
