import { useContext } from "react";
import { FileSystemContext } from "@/components/IDE/FileSystem/FileSystemContext";
import { FileSystemError } from "@/components/IDE/FileSystem/FileSystemError";
import type { Document } from "@/model/document";

export function useDocument(documentId: string): Document {
  const { nodes } = useContext(FileSystemContext)!;
  const maybeDocument = nodes[documentId];

  if (!maybeDocument || maybeDocument.type !== "document") {
    throw new FileSystemError(
      `Document with id "${documentId}" does not exist.`
    );
  }

  return maybeDocument as Document;
}
