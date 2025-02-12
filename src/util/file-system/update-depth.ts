import { FileSystemNode } from "@/model/file-system-node";
import type { Directory } from "@/model/directory";

export function updateDepth(node: FileSystemNode, newDepth: number) {
  node.depth = newDepth;
  if (node.type === "directory") {
    const directory = node as Directory;
    for (const subdirectory of directory.subdirectories) {
      updateDepth(subdirectory, newDepth + 1);
    }
    for (const document of directory.documents) {
      updateDepth(document, newDepth + 1);
    }
  }
}
