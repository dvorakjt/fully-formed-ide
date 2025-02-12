export interface FileSystemContents {
  id?: string;
  name: string;
  subdirectories?: FileSystemContents[];
  documents?: Array<{
    id?: string;
    name: string;
    contents?: string;
  }>;
}
