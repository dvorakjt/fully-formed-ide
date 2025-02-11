import { createContext } from "react";

export interface OpenDocumentsContextType {
  openDocumentId: string;
  previewDocument(documentId: string): void;
  openDocument(documentId: string): void;
}

export const OpenDocumentsContext =
  createContext<OpenDocumentsContextType | null>(null);
