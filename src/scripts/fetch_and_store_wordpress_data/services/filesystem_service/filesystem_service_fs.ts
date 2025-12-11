import * as fs from "fs";
import { FilesystemService } from "./filesystem_service";
import path from "path";

export class FilesystemServiceFs implements FilesystemService {
  private async ensure_output_dir(params: { file_path: string }) {
    const output_dir = path.dirname(params.file_path);
    return fs.promises.mkdir(output_dir, { recursive: true });
  }

  async write_file(params: {
    file_path: string;
    content: string;
  }): Promise<void> {
    await this.ensure_output_dir(params);
    await fs.promises.writeFile(params.file_path, params.content);
  }

  async read_file(params: { file_path: string }): Promise<string> {
    return fs.promises.readFile(params.file_path, "utf8");
  }
}
