import * as React from "react";
import type { WordpressPage } from "../../entities/wordpress";
import { Navbar } from "../navbar";

export interface BlogArticlePageProps {
  wordpress: WordpressPage;
  preview?: boolean;
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

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({
  wordpress,
}) => {
  const publishedAt = formatDate(wordpress.date);
  const updatedAt =
    wordpress.modified && wordpress.modified !== wordpress.date
      ? formatDate(wordpress.modified)
      : null;

  const content = wordpress.content;

  return (
    <div className={"min-h-screen"}>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 text-slate-900">
        <Navbar />
        <div className="mx-auto max-w-5xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
          {/* Top breadcrumb / label */}
          <div className="mb-6 flex items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              Blog
            </span>
            <span className="h-px w-6 bg-slate-200" />
            {publishedAt && (
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Publié le {publishedAt}</span>
              </span>
            )}
            {updatedAt && (
              <>
                <span className="text-slate-400">•</span>
                <span>Mise à jour le {updatedAt}</span>
              </>
            )}
          </div>

          <article className="grid gap-10 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] lg:items-start">
            {/* Main content */}
            <div>
              <header className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  {wordpress.title}
                </h1>

                {wordpress.categories && wordpress.categories.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {wordpress.categories.map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-100"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              <section className="rounded-3xl bg-white/80 p-6 shadow-sm shadow-slate-200 ring-1 ring-slate-100 backdrop-blur-sm sm:p-8">
                <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24">
                  <p className="leading-relaxed text-slate-700 whitespace-pre-line">
                    {content}
                  </p>
                </div>
              </section>
            </div>

            {/* Side panel */}
            <aside className="space-y-4 lg:sticky lg:top-8">
              <div className="rounded-2xl bg-white/80 p-5 shadow-sm shadow-slate-200 ring-1 ring-slate-100 backdrop-blur-sm">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  À propos de cet article
                </h2>
                <dl className="mt-4 space-y-2 text-sm text-slate-600">
                  {publishedAt && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Publication</dt>
                      <dd className="font-medium text-slate-800">
                        {publishedAt}
                      </dd>
                    </div>
                  )}
                  {updatedAt && (
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Dernière mise à jour</dt>
                      <dd className="font-medium text-slate-800">
                        {updatedAt}
                      </dd>
                    </div>
                  )}
                  {wordpress.categories && wordpress.categories.length > 0 && (
                    <div>
                      <dt className="text-slate-500">Catégories</dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">
                        {wordpress.categories.map((category) => (
                          <span
                            key={category.id}
                            className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                          >
                            {category.name}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>
          </article>
        </div>
      </main>
    </div>
  );
};
