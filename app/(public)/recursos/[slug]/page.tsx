import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSettings } from "@/lib/settings";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { prisma } from "@/lib/prisma";
import { sanitize } from "@/lib/markdown";
import { WhatsAppIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getPost(slug: string) {
  try {
    return await prisma.resourcePost.findFirst({
      where: { slug, status: "published" },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Artículo no encontrado" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `/recursos/${post.slug}` },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function ResourcePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const settings = await getSettings();
  const waUrl = buildWhatsappUrl(settings);
  const waEnabled = settings.whatsappEnabled && settings.whatsappCtaEnabled;
  const published = post.publishedAt ?? post.createdAt;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.featuredImage ? [`${siteUrl}${post.featuredImage}`] : undefined,
    datePublished: published.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Organization", name: "Villarroel & Asociados Consultora" },
    publisher: {
      "@type": "Organization",
      name: "Villarroel & Asociados Consultora",
      logo: { "@type": "ImageObject", url: `${siteUrl}${settings.logoUrl}` },
    },
    mainEntityOfPage: `${siteUrl}/recursos/${post.slug}`,
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero">
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="eyebrow">
            <Link href="/recursos" style={{ color: "inherit" }}>Recursos</Link>
            {post.category ? ` · ${post.category}` : ""}
          </span>
          <h1>{post.title}</h1>
          <p className="hero__micro">
            Publicado el{" "}
            {published.toLocaleDateString("es-AR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          {post.featuredImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.featuredImage}
              alt={post.title}
              style={{ width: "100%", borderRadius: "var(--radius-lg)", marginBottom: 32 }}
            />
          )}
          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: sanitize(post.content) }}
          />

          <div className="cta-band reveal" style={{ marginTop: 48 }}>
            <h2>¿Tenés una consulta sobre tu organización?</h2>
            <p>Te orientamos sobre los próximos pasos para ordenar tu gestión y decidir con información confiable.</p>
            <div className="hero__cta">
              {waEnabled && (
                <a className="btn btn--wa btn--lg" href={waUrl} data-wa-location="recurso-detalle" target="_blank" rel="noopener">
                  <WhatsAppIcon /> Hablar por WhatsApp
                </a>
              )}
              <Link className="btn btn--light btn--lg" href="/contacto">Enviar consulta</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
