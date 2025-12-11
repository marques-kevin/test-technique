import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import type { WordpressPage } from "../entities/wordpress";
import { BlogArticlePage } from "../components/pages/blog_article_page";

interface PageContext {
  slug: string;
  wordpress: WordpressPage;
}

const BlogArticleTemplate: React.FC<PageProps<undefined, PageContext>> = ({
  pageContext,
}) => {
  const wordpress = pageContext.wordpress;

  return <BlogArticlePage wordpress={wordpress} />;
};

export default BlogArticleTemplate;

export const Head: HeadFC<undefined, PageContext> = ({ pageContext }) => {
  const wordpress = pageContext.wordpress;

  const title = wordpress.seo.title;
  const description = wordpress.seo.description;

  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </>
  );
};
