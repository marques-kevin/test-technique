import { describe, it, expect } from "vitest";
import { fetch_and_store_wordpress_data } from "../fetch_and_store_wordpress_data";
import { FilesystemServiceInMemory } from "../services/filesystem_service/filesystem_service_in_memory";
import { WordpressPost } from "../services/wordpress_service/wordpress_service";
import { WordpressServiceInMemory } from "../services/wordpress_service/wordpress_service_in_memory";

describe("fetch_and_store_wordpress_data", () => {
  it("writes one file per WordPress post to the filesystem_service", async () => {
    const filesystem = new FilesystemServiceInMemory();
    const output_dir = "cms";
    const posts: WordpressPost[] = [
      {
        id: "1",
        slug: "post-1",
        title: "Post 1",
        content: "Content 1",
        date: "2021-01-01",
        modified: "2021-01-02",
        categories: [
          {
            id: "1",
            name: "Category 1",
            slug: "category-1",
          },
        ],
        seo: {
          title: "Post 1",
          description: "Description 1",
        },
      },
    ];

    const wordpress_service = new WordpressServiceInMemory(posts);

    await fetch_and_store_wordpress_data({
      wordpress_service,
      filesystem_service: filesystem,
      output_dir,
    });

    const expected_file_path = `${output_dir}/${posts[0].slug}-${posts[0].id}.json`;
    const stored = await filesystem.read_file({
      file_path: expected_file_path,
    });

    expect(JSON.parse(stored)).toEqual(posts[0]);
  });

  it("writes multiple files per WordPress post to the filesystem_service", async () => {
    const filesystem = new FilesystemServiceInMemory();
    const output_dir = "cms";
    const posts: WordpressPost[] = Array.from({ length: 1500 }, (_, index) => ({
      id: index.toString(),
      slug: `post-${index}`,
      title: `Post ${index}`,
      content: `Content ${index}`,
      date: "2021-01-01",
      modified: "2021-01-02",
      categories: [{ id: "1", name: "Category 1", slug: "category-1" }],
      seo: { title: `Post ${index}`, description: `Description ${index}` },
    }));

    const wordpress_service = new WordpressServiceInMemory(posts);

    await fetch_and_store_wordpress_data({
      wordpress_service,
      filesystem_service: filesystem,
      output_dir,
    });

    const all_files = filesystem.get_files();
    expect(Object.keys(all_files).length).toEqual(posts.length);
    expect(
      Object.keys(all_files).map((file) => JSON.parse(all_files[file]))
    ).toEqual(posts);
  });

  it("throws when wordpress_service returns an error", async () => {
    const filesystem = new FilesystemServiceInMemory();
    const wordpress_service = new WordpressServiceInMemory(); // no posts -> error
    const output_dir = "cms";

    await expect(
      fetch_and_store_wordpress_data({
        wordpress_service,
        filesystem_service: filesystem,
        output_dir,
      })
    ).rejects.toThrow("On simule une erreur car il n'y a pas de posts");
  });
});
