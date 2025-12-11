import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Link } from "gatsby";
import type { WordpressPage } from "../entities/wordpress";
import { Navbar } from "../components/navbar";

interface BlogPageContext {
  posts: WordpressPage[];
}

const formatDate = (value?: string) => {
  if (!value) return null;
  try {
    return new Date(value).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return value ?? null;
  }
};

export const BlogTemplate: React.FC<PageProps<undefined, BlogPageContext>> = ({
  pageContext,
}) => {
  const posts = pageContext.posts ?? [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 text-slate-900">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Blog
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Derniers articles
          </h1>
          <p className="mt-4 text-sm text-slate-600 sm:text-base">
            Une sélection de contenus issus de WordPress. Retrouvez ici les
            derniers articles publiés.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-2xl bg-white/80 p-8 text-center shadow-sm shadow-slate-200 ring-1 ring-slate-100">
            <p className="text-base font-medium text-slate-900">
              Aucun article n'est disponible pour le moment.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Revenez bientôt, de nouveaux contenus arrivent.
            </p>
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => {
              const publishedAt = formatDate(post.date);

              const excerpt =
                post.content.length > 180
                  ? post.content.slice(0, 180).trimEnd() + "…"
                  : post.content;

              return (
                <article
                  key={post.id}
                  className="group flex flex-col justify-between rounded-2xl bg-white/80 p-5 shadow-sm shadow-slate-200 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:bg-white hover:shadow-md hover:shadow-slate-200/80"
                >
                  <div>
                    {post.categories && post.categories.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.categories.map((category) => (
                          <span
                            key={category.id}
                            className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 ring-1 ring-inset ring-emerald-100"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-baseline gap-1 rounded-md text-slate-900 no-underline group-hover:text-emerald-700"
                      >
                        <span>{post.title}</span>
                      </Link>
                    </h2>

                    {publishedAt && (
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Publié le {publishedAt}
                      </p>
                    )}

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {excerpt}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>{post.categories?.[0]?.name ?? "Article"}</span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white shadow-sm shadow-slate-400/40 transition group-hover:bg-emerald-600"
                    >
                      Lire l'article
                    </Link>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
};

export default BlogTemplate;

export const Head: HeadFC<undefined, BlogPageContext> = () => {
  return (
    <>
      <title>Blog</title>
      <meta
        name="description"
        content="Découvrez les derniers articles du blog."
      />
    </>
  );
};
