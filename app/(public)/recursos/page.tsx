import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { getPageContent } from "@/lib/content";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { prisma } from "@/lib/prisma";
import ResourcesGrid, { type ResourceCard } from "@/components/ResourcesGrid";
import CtaBand from "@/components/CtaBand";

export const dynamic = "force-dynamic"; // siempre refleja notas publicadas

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent("recursos");
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: "/recursos" },
    openGraph: { title: c.ogTitle, description: c.ogDescription },
  };
}

export default async function RecursosPage() {
  const settings = await getSettings();
  const { c } = await getPageContent("recursos");
  const waUrl = buildWhatsappUrl(settings);
  const waEnabled = settings.whatsappEnabled && settings.whatsappCtaEnabled;

  let posts: ResourceCard[] = [];
  try {
    const rows = await prisma.resourcePost.findMany({
      where: { status: "published" },
      orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
    });
    posts = rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      category: r.category,
      featuredImage: r.featuredImage,
      publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
    }));
  } catch {
    posts = [];
  }

  return (
    <main id="main">
      <section className="hero">
        <div className="container">
          <span className="eyebrow">{c("hero.eyebrow")}</span>
          <h1>{c("hero.title")}</h1>
          <p className="hero__text">{c("hero.text")}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {posts.length > 0 ? (
            <ResourcesGrid posts={posts} />
          ) : (
            <div className="section-head center">
              <h2>{c("empty.title")}</h2>
              <p className="lead mt-2">{c("empty.text")}</p>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title={c("ctaFinal.title")}
        text={c("ctaFinal.text")}
        waUrl={waUrl}
        primaryLabel={c("ctaFinal.ctaPrimary")}
        secondaryLabel={c("ctaFinal.ctaSecondary")}
        waEnabled={waEnabled}
      />
    </main>
  );
}
