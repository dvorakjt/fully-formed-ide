import type { Directory } from "@/model/directory";

export function hasChild(directory: Directory, nodeId: string) {
  if (
    directory.documents.some((document) => document.id === nodeId) ||
    directory.subdirectories.some(
      (subdirectory) => subdirectory.id === nodeId
    ) ||
    directory.subdirectories.some((subdirectory) =>
      hasChild(subdirectory, nodeId)
    )
  ) {
    return true;
  }

  return false;
}
