import type { WordpressPage } from "../../../../entities/wordpress";

export type WordpressPost = WordpressPage;

export interface WordpressService {
  getPosts: (params: {
    page: number;
    per_page: number;
  }) => Promise<
    | { body: WordpressPost[]; error: null }
    | { body: WordpressPost[]; error: Error }
  >;
  getPost: (params: {
    slug: string;
  }) => Promise<
    { body: WordpressPost; error: null } | { body: null; error: Error }
  >;
}
