import type { FileSystemNode } from "./file-system-node";
import type { Document } from "./document";

export interface Directory extends FileSystemNode {
  subdirectories: Directory[];
  documents: Document[];
  type: "directory";
}
