import type { Directory } from "./directory";

export interface FileSystemNode {
  id: string;
  name: string;
  parent: Directory | null;
  depth: number;
  type: "directory" | "document";
}
