import type { GatsbyNode } from "gatsby";
import path from "path";
import type { WordpressPage } from "./src/entities/wordpress";

interface WordpressGraphqlResult {
  allWordpressJson: {
    nodes: WordpressPage[];
  };
}

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql<WordpressGraphqlResult>(`
    {
      allWordpressJson {
        nodes {
          id
          slug
          title
          content
          date
          modified
          categories {
            id
            name
            slug
          }
          seo {
            title
            description
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      "Error while running GraphQL query for WordPress pages",
      result.errors
    );
    return;
  }

  const pages = result.data?.allWordpressJson.nodes ?? [];

  createPage({
    path: `/`,
    component: path.resolve("./src/templates/home.tsx"),
    context: {
      sitemap: {
        indexable: true,
        lastmod: new Date().toISOString(),
      },
    },
  });

  // Create individual blog post pages
  pages.forEach((page) => {
    const pagePath = `/blog/${page.slug}`;

    createPage({
      path: pagePath,
      component: path.resolve("./src/templates/blog-article.tsx"),
      context: {
        slug: page.slug,
        wordpress: page,
        sitemap: {
          indexable: true,
          lastmod: page.modified,
        },
      },
    });
  });

  createPage({
    path: `/preview/`,
    component: path.resolve("./src/templates/preview.tsx"),
    context: {
      sitemap: {
        indexable: false,
        lastmod: new Date().toISOString(),
      },
    },
  });

  const blogPosts = pages.slice(0, 8);

  createPage({
    path: `/blog/`,
    component: path.resolve("./src/templates/blog.tsx"),
    context: {
      posts: blogPosts,
      sitemap: {
        indexable: true,
        lastmod: new Date().toISOString(),
      },
    },
  });
};
