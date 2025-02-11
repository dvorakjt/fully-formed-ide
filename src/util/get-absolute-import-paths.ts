import { findRelativeImportPaths } from "./find-relative-import-paths";
import { convertRelativeImportPathToAbsolutePath } from "./convert-relative-import-path-to-absolute-path";
import type { Document } from "@/model/document";

export function getAbsoluteImportPaths(document: Document): string[] {
  return findRelativeImportPaths(document.contents).map((relativePath) =>
    convertRelativeImportPathToAbsolutePath(relativePath, document)
  );
}
