import * as path from "path";
import { WordpressService } from "./services/wordpress_service/wordpress_service";
import { FilesystemService } from "./services/filesystem_service/filesystem_service";

export async function fetch_and_store_wordpress_data(params: {
  wordpress_service: WordpressService;
  filesystem_service: FilesystemService;
  output_dir: string;
}) {
  const per_page = 1000;
  let page = 1;

  while (true) {
    const { body, error } = await params.wordpress_service.getPosts({
      page,
      per_page,
    });

    if (error) throw error;

    if (body.length === 0) return;

    for (const post of body) {
      const file_path = path.join(
        params.output_dir,
        `${post.slug}-${post.id}.json`
      );

      await params.filesystem_service.write_file({
        file_path,
        content: JSON.stringify(post, null, 2),
      });
    }

    page++;
  }
}
