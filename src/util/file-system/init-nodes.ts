import type { Directory } from "@/model/directory";
import type { FileSystemNode } from "@/model/file-system-node";

export function initNodes(
  rootDirectory: Directory
): Record<string, FileSystemNode> {
  let nodes: Record<string, FileSystemNode> = {
    [rootDirectory.id]: rootDirectory,
  };

  for (const directory of rootDirectory.subdirectories) {
    nodes = {
      ...nodes,
      ...initNodes(directory),
    };
  }

  for (const document of rootDirectory.documents) {
    nodes[document.id] = document;
  }

  return nodes;
}
