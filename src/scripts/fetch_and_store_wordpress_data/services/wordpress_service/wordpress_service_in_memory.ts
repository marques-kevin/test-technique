import { WordpressPost, WordpressService } from "./wordpress_service";

export class WordpressServiceInMemory implements WordpressService {
  private posts: WordpressPost[] = [];

  constructor(initialPosts: WordpressPost[] = []) {
    this.posts = initialPosts;
  }

  setPosts(posts: WordpressPost[]) {
    this.posts = posts;
  }

  async getPost(params: {
    slug: string;
  }): ReturnType<WordpressService["getPost"]> {
    const post = this.posts.find((post) => post.slug === params.slug);
    if (!post) {
      return {
        body: null,
        error: new Error("Post not found"),
      };
    }

    return {
      body: post,
      error: null,
    };
  }

  async getPosts(params: {
    page: number;
    per_page: number;
  }): ReturnType<WordpressService["getPosts"]> {
    if (this.posts.length === 0) {
      return {
        body: [],
        error: new Error("On simule une erreur car il n'y a pas de posts"),
      };
    }

    return {
      body: this.posts.slice(
        (params.page - 1) * params.per_page,
        params.page * params.per_page
      ),
      error: null,
    };
  }
}
