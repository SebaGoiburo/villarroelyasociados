import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/quienes-somos",
    "/servicios",
    "/asociaciones-civiles-fundaciones",
    "/recursos",
    "/contacto",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  let posts: { url: string; lastModified: Date }[] = [];
  try {
    const rows = await prisma.resourcePost.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
    });
    posts = rows.map((r) => ({
      url: `${siteUrl}/recursos/${r.slug}`,
      lastModified: r.updatedAt,
    }));
  } catch {
    posts = [];
  }

  return [...staticRoutes, ...posts];
}
