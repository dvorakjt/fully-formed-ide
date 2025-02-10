import { findRelativeImportPaths } from "./find-relative-import-paths";
import { toAbsolutePath } from "./to-absolute-path";
import type { Document } from "@/model/document";

export function getImportedPaths(document: Document): string[] {
  return findRelativeImportPaths(document.contents).map((relativePath) =>
    toAbsolutePath(relativePath, document)
  );
}
