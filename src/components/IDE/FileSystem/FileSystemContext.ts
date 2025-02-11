import { createContext } from "react";
import type { Directory } from "@/model/directory";
import type { FileSystemNode } from "@/model/file-system-node";

interface FileSystemContextType {
  rootDirectory: Directory;
  nodes: Record<string, FileSystemNode>;
  addDirectory(parentId: string, name: string): void;
  addDocument(parentId: string, name: string): void;
  updateContents(documentId: string, newContents: string): void;
  renameNode(nodeId: string, newName: string): void;
  moveNode(nodeId: string, newParentOrSiblingId: string): void;
  removeNode(nodeId: string): void;
}

export const FileSystemContext = createContext<FileSystemContextType | null>(
  null
);
