import { findLowestCommonAncestor } from "./find-lowest-common-ancestor";
import type { FileSystemNode } from "@/model/file-system-node";

export function createImportPath(
  importInto: FileSystemNode,
  importFrom: FileSystemNode
) {
  const commonAncestor = findLowestCommonAncestor(importInto, importFrom);
  const pathToAncestor = createPathToCommonAncestor(importInto, commonAncestor);
  const pathFromAncestor = createPathFromCommonAncestor(
    importFrom,
    commonAncestor
  );
  return pathToAncestor + pathFromAncestor;
}

function createPathToCommonAncestor(
  importInto: FileSystemNode,
  commonAncestor: FileSystemNode
): string {
  const depthDifference = importInto.depth - commonAncestor.depth;
  if (depthDifference === 1) return "./";
  return "../".repeat(depthDifference - 1);
}

function createPathFromCommonAncestor(
  importFrom: FileSystemNode,
  commonAncestor: FileSystemNode
): string {
  const path: string[] = [];
  let current = importFrom;
  while (current && current !== commonAncestor) {
    path.push(current.name);
    current = current.parent!;
  }
  return path.reverse().join("/");
}
