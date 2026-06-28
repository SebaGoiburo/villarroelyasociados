import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content";
import { PAGE_DEFAULTS } from "@/lib/content-defaults";
import { groupSections } from "@/lib/content-labels";
import ContentEditor from "@/components/admin/ContentEditor";

export const metadata: Metadata = { title: "Editar contenido · Admin" };
export const dynamic = "force-dynamic";

const PUBLIC_PATH: Record<string, string> = {
  inicio: "/",
  "quienes-somos": "/quienes-somos",
  servicios: "/servicios",
  "asociaciones-civiles-fundaciones": "/asociaciones-civiles-fundaciones",
  recursos: "/recursos",
  contacto: "/contacto",
};

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const def = PAGE_DEFAULTS.find((p) => p.slug === slug);
  if (!def) notFound();

  const content = await getPageContent(slug);
  const groups = groupSections(content.sections);

  return (
    <>
      <div className="admin-page-head">
        <h1>Editar: {content.name}</h1>
        <p>Modificá los textos de esta página. Cada bloque corresponde a una sección visible en el sitio.</p>
      </div>
      <ContentEditor
        slug={slug}
        name={content.name}
        seo={{
          seoTitle: content.seoTitle,
          seoDescription: content.seoDescription,
          ogTitle: content.ogTitle,
          ogDescription: content.ogDescription,
        }}
        groups={groups}
        publicPath={PUBLIC_PATH[slug] || "/"}
      />
    </>
  );
}
