import type { FileSystemNode } from "@/model/file-system-node";

export function getAbsolutePathToNode(node: FileSystemNode): string {
  const pathSegments = [];
  let current: FileSystemNode | null = node;

  while (current) {
    pathSegments.push(current.name);
    current = current.parent;
  }

  return pathSegments.reverse().join("/");
}
