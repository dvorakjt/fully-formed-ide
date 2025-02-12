import type { FileSystemNode } from "@/model/file-system-node";

export function isChildOf(maybeChild: FileSystemNode, maybeParentId: string) {
  let current = maybeChild.parent;

  while (current) {
    if (current.id === maybeParentId) {
      return true;
    }
    current = current.parent;
  }

  return false;
}
