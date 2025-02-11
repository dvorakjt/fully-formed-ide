import { getChildNames } from "./get-child-names";
import type { FileSystemNode } from "@/model/file-system-node";

export function getSiblingNames(node: FileSystemNode): string[] {
  if (node.parent) {
    return getChildNames(node.parent).filter((name) => name !== node.name);
  }

  return [];
}
