import { v4 as uuid } from "uuid";
import type { FileSystemContents } from "@/model/file-system-contents";
import type { Directory } from "@/model/directory";

export function initRootDirectory(rootContents: FileSystemContents) {
  const rootDirectory: Directory = {
    type: "directory",
    id: rootContents.id ?? uuid(),
    name: rootContents.name,
    parent: null,
    subdirectories: [],
    documents: [],
    depth: -1,
  };

  if (rootContents.subdirectories) {
    rootDirectory.subdirectories = rootContents.subdirectories.map(
      (contents) => {
        return initSubDirectory(contents, rootDirectory);
      }
    );
  }

  if (rootContents.documents) {
    rootDirectory.documents = rootContents.documents.map((document) => {
      return {
        type: "document",
        id: document.id ?? uuid(),
        name: document.name,
        parent: rootDirectory,
        contents: document.contents ?? "",
        depth: rootDirectory.depth + 1,
      } as const;
    });
  }

  return rootDirectory;
}

function initSubDirectory(
  contents: FileSystemContents,
  parent: Directory
): Directory {
  const directory: Directory = {
    type: "directory",
    id: contents.id ?? uuid(),
    name: contents.name,
    parent,
    depth: parent.depth + 1,
    subdirectories: [],
    documents: [],
  };

  if (contents.subdirectories) {
    directory.subdirectories = contents.subdirectories.map((contents) => {
      return initSubDirectory(contents, directory);
    });
  }

  if (contents.documents) {
    directory.documents = contents.documents.map((document) => {
      return {
        type: "document",
        id: document.id ?? uuid(),
        name: document.name,
        parent: directory,
        contents: document.contents ?? "",
        depth: directory.depth + 1,
      } as const;
    });
  }

  return directory;
}
