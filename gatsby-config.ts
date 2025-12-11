import type { GatsbyConfig } from "gatsby";

const domain = "https://www.pretto.fr";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Pretto`,
    description: `Pretto`,
    siteUrl: domain,
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
                pageContext
              }
            }
          }
        `,
        resolveSiteUrl: ({ site }: any) => site.siteMetadata.siteUrl,
        resolvePages: ({ allSitePage: { nodes } }: any) =>
          nodes
            // Keep only indexable pages when sitemap info is available
            .filter(
              (page: any) => page.pageContext?.sitemap?.indexable !== false
            )
            .map((page: any) => ({
              path: page.path,
              sitemap: page.pageContext?.sitemap,
            })),
        serialize: ({ path, sitemap }: any) => ({
          url: path,
          // Use pageContext.sitemap.lastmod for last modification date
          lastmod: sitemap?.lastmod,
        }),
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "wordpress",
        path: "./cms/wordpress/",
      },
      __key: "wordpress",
    },
    "gatsby-transformer-json",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allWordpressJson } }: any) => {
              return allWordpressJson.nodes.map((page: any) => {
                const baseUrl = site.siteMetadata.siteUrl.replace(/\/$/, "");
                const url = `${baseUrl}/blog/${page.slug}`;

                return {
                  title: page.seo?.title || page.title,
                  description: page.seo?.description || page.content,
                  date: page.date,
                  url,
                  guid: url,
                };
              });
            },
            query: `
              {
                allWordpressJson(sort: { date: DESC }, limit: 10) {
                  nodes {
                    id
                    slug
                    title
                    content
                    date
                    seo {
                      title
                      description
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Pretto - Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: domain,
        stripQueryString: true,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: domain,
        sitemap: `${domain}/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};

export default config;
