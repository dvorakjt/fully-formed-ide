import { createContext } from "react";
import type { Directory } from "@/model/directory";
import type { Document } from "@/model/document";

interface FileSystemContextType {
  rootDirectory: Directory;
  useDocument(documentId: string): Document | null;
  addSubdirectory(directoryId: string, name: string): void;
  addDocument(directoryId: string, name: string): void;
  updateContents(documentId: string, contents: string): void;
  renameNode(nodeId: string, name: string): void;
  moveNode(nodeId: string, destinationId: string): void;
  removeNode(nodeId: string): void;
}

export const FileSystemContext = createContext<FileSystemContextType | null>(
  null
);
