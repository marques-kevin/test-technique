export interface WordpressCategory {
  id: string;
  name: string;
  slug: string;
}

export interface WordpressSeo {
  title: string;
  description: string;
}

// Core WordPress page/post shape used across the project
export interface WordpressPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  date: string;
  modified: string;
  categories: WordpressCategory[];
  seo: WordpressSeo;
}
