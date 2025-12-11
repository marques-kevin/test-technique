export interface FilesystemService {
  write_file: (params: { file_path: string; content: string }) => Promise<void>;
  read_file: (params: { file_path: string }) => Promise<string>;
}
