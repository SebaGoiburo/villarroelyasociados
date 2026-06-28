import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ResourceForm from "@/components/admin/ResourceForm";

export const metadata: Metadata = { title: "Editar nota · Admin" };
export const dynamic = "force-dynamic";

export default async function EditarNotaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.resourcePost.findUnique({ where: { id } });
  if (!post) notFound();

  const publishedAt = post.publishedAt
    ? post.publishedAt.toISOString().slice(0, 10)
    : "";

  return (
    <>
      <div className="admin-page-head">
        <h1>Editar nota</h1>
        <p>Modificá la nota y guardá los cambios.</p>
      </div>
      <ResourceForm
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featuredImage: post.featuredImage,
          category: post.category,
          seoTitle: post.seoTitle,
          seoDescription: post.seoDescription,
          status: post.status,
          isFeatured: post.isFeatured,
          publishedAt,
        }}
      />
    </>
  );
}
