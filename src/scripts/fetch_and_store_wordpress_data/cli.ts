import { WordpressServiceApi } from "./services/wordpress_service/wordpress_service_api";
import { FilesystemServiceFs } from "./services/filesystem_service/filesystem_service_fs";
import { fetch_and_store_wordpress_data } from "./fetch_and_store_wordpress_data";
import * as path from "path";

async function main() {
  const wordpress_service = new WordpressServiceApi();
  const filesystem_service = new FilesystemServiceFs();

  try {
    await fetch_and_store_wordpress_data({
      wordpress_service,
      filesystem_service,
      output_dir: path.resolve(__dirname, "../../../cms/wordpress"),
    });

    console.log("WordPress data fetched and stored successfully");
  } catch (error) {
    console.error("Failed to fetch and store WordPress data");
    console.error(error);

    if (process.env.NODE_ENV === "production") process.exit(1);
  }
}

main();
