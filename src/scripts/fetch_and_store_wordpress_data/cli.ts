import { WordpressServiceApi } from "./services/wordpress_service/wordpress_service_api";
import { FilesystemServiceFs } from "./services/filesystem_service/filesystem_service_fs";
import { fetch_and_store_wordpress_data } from "./fetch_and_store_wordpress_data";
import * as path from "path";
import * as fs from "fs";

function remove_all_files_from_output_dir(output_dir: string) {
  if (fs.existsSync(output_dir)) {
    fs.readdirSync(output_dir).forEach((file: string) => {
      const curPath = path.join(output_dir, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        fs.rmSync(curPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(curPath);
      }
    });
  }
}

async function main() {
  const wordpress_service = new WordpressServiceApi();
  const filesystem_service = new FilesystemServiceFs();
  const output_dir = path.resolve(__dirname, "../../../cms/wordpress");

  /**
   *
   * Dans le cadre du test technique, on supprime tous les fichiers du dossier output_dir avant de récupérer les nouvelles données.
   * Cela permet de ne pas avoir de fichiers obsolètes dans le dossier output_dir.
   * Mais dans une version future, on pourrait simplement faire une synchronisation incrémentale.
   *
   */
  remove_all_files_from_output_dir(output_dir);

  try {
    await fetch_and_store_wordpress_data({
      wordpress_service,
      filesystem_service,
      output_dir,
    });

    console.log("WordPress data fetched and stored successfully");
  } catch (error) {
    console.error("Failed to fetch and store WordPress data");
    console.error(error);

    if (process.env.NODE_ENV === "production") process.exit(1);
  }
}

main();
