import { FilesystemService } from "./filesystem_service";

export class FilesystemServiceInMemory implements FilesystemService {
  private files: Record<string, string> = {};

  async write_file(params: {
    file_path: string;
    content: string;
  }): Promise<void> {
    this.files[params.file_path] = params.content;
  }

  async read_file(params: { file_path: string }): Promise<string> {
    return this.files[params.file_path];
  }

  get_files() {
    return this.files;
  }
}
