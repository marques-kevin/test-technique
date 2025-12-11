import { faker } from "@faker-js/faker";
import { WordpressPost, WordpressService } from "./wordpress_service";

const createMockPost = (index: number): WordpressPost => {
  const title = faker.lorem.sentence(6).replace(/\.$/, "");
  const slug = faker.helpers.slugify(title.toLowerCase());
  const categoryName = faker.lorem.word();

  const createdAt = faker.date.past({ years: 1 });
  const modifiedAt = faker.date.recent({ days: 2 });

  return {
    id: String(index),
    slug,
    title,
    content: faker.lorem.paragraphs(10, "\n\n"),
    date: createdAt.toISOString(),
    modified: modifiedAt.toISOString(),
    categories: [
      {
        id: "1",
        name: categoryName,
        slug: faker.helpers.slugify(categoryName.toLowerCase()),
      },
    ],
    seo: {
      title,
      description: faker.lorem.sentence(12),
    },
  };
};

const mock_posts: WordpressPost[] = Array.from({ length: 2000 }, (_, index) =>
  createMockPost(index + 1)
);

export class WordpressServiceApi implements WordpressService {
  async getPost(params: {
    slug: string;
  }): ReturnType<WordpressService["getPost"]> {
    if (!params.slug) {
      return {
        body: null,
        error: new Error("Post not found"),
      };
    }

    return {
      body: createMockPost(0),
      error: null,
    };
  }

  async getPosts(params: {
    page: number;
    per_page: number;
  }): ReturnType<WordpressService["getPosts"]> {
    /**
     *
     * Ici on implémente le code pour récupérer la liste des posts WordPress.
     * C'est ici qu'on va faire la boucle récursive pour récupérer tous les posts.
     * Dans le cadre du test technique, on va simplement simuler une réponse de l'API.
     *
     */
    return {
      body: mock_posts.slice(
        (params.page - 1) * params.per_page,
        params.page * params.per_page
      ),
      error: null,
    };
  }
}
