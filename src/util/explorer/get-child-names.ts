import type { Directory } from "@/model/directory";

export function getChildNames(directory: Directory): string[] {
  return [...directory.subdirectories, ...directory.documents].map(
    (node) => node.name
  );
}
