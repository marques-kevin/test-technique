import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import type { WordpressPage } from "../entities/wordpress";
import { BlogArticlePage } from "../components/pages/blog_article_page";
import { WordpressServiceApi } from "../scripts/fetch_and_store_wordpress_data/services/wordpress_service/wordpress_service_api";

const api = new WordpressServiceApi();

const PreviewTemplate: React.FC<PageProps> = ({ location }) => {
  const [post, setPost] = React.useState<WordpressPage | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchPost = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const slug = params.get("slug");

        if (!slug) {
          setError("Paramètre 'slug' manquant dans l'URL.");
          setLoading(false);
          return;
        }

        const result = await api.getPost({ slug });

        if ("error" in result && result.error) {
          setError(
            result.error.message || "Erreur lors du chargement de l'article."
          );
          setLoading(false);
          return;
        }

        setPost(result.body as WordpressPage);
        setLoading(false);
      } catch (err) {
        setError("Erreur inattendue lors du chargement de l'article.");
        setLoading(false);
      }
    };

    void fetchPost();
  }, [location.search]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700">
        <div className="rounded-2xl bg-white px-6 py-4 text-sm shadow-sm shadow-slate-200 ring-1 ring-slate-200">
          Chargement de l&apos;aperçu de l&apos;article…
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700">
        <div className="relative mx-4 max-w-xl rounded-2xl bg-white px-6 py-4 text-sm shadow-sm shadow-slate-200 ring-2 ring-amber-400/80">
          <span className="pointer-events-none absolute -left-px -top-px inline-flex items-center gap-1 rounded-br-xl rounded-tl-2xl bg-amber-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-950 shadow-sm shadow-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-950" />
            Preview
          </span>
          <p className="mt-4 font-semibold text-red-600">Mode preview</p>
          <p className="mt-1 text-sm text-slate-700">
            {error || "Impossible de charger l&apos;article demandé."}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Vérifiez que le paramètre <code>slug</code> est bien présent dans
            l&apos;URL et correspond à un article WordPress existant.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <BlogArticlePage wordpress={post} />
      <div className="fixed z-50 pointer-events-none inset-0 border-2 border-dashed border-amber-500">
        <div className="absolute bottom-0 left-0 bg-amber-500 p-2 text-xs text-white rounded-tr font-medium">
          Preview mode
        </div>
      </div>
    </main>
  );
};

export default PreviewTemplate;

export const Head: HeadFC = () => (
  <>
    <title>Prévisualisation d&apos;article</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
);
