"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "./Icons";

export type ResourceCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  featuredImage: string;
  publishedAt: string | null;
};

export default function ResourcesGrid({ posts }: { posts: ResourceCard[] }) {
  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean))
  );
  const [filter, setFilter] = useState<string>("all");

  const visible =
    filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <>
      {categories.length > 0 && (
        <div className="cat-pills" role="tablist" aria-label="Categorías de recursos">
          <button
            className="cat-pill"
            data-active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className="cat-pill"
              data-active={filter === cat}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-3">
        {visible.map((p) => (
          <article className="card article-card reveal" key={p.slug}>
            <div className="thumb" aria-hidden="true">
              {p.featuredImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.featuredImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                "Imagen del artículo"
              )}
            </div>
            <div className="body">
              {p.category && (
                <span className="badge" style={{ background: "rgba(0,156,222,.1)", color: "var(--blue)" }}>
                  {p.category}
                </span>
              )}
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <Link className="card__link" href={`/recursos/${p.slug}`}>
                Leer artículo <ArrowRight />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
