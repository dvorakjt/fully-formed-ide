"use client";
import { useState, type ReactNode } from "react";
import { OpenDocumentsContext } from "./OpenDocumentsContext";

interface OpenDocumentsContextProviderProps {
  openDocumentId?: string;
  children?: ReactNode;
}

export function OpenDocumentsContextProvider(
  props: OpenDocumentsContextProviderProps
) {
  const [openDocumentId, setOpenDocumentId] = useState(
    props.openDocumentId ?? ""
  );

  // remember, preview should only be closed if this file to be
  // previewed is not already opened
  const previewDocument = (documentId: string) => {
    setOpenDocumentId(documentId);
  };

  const openDocument = (documentId: string) => {
    setOpenDocumentId(documentId);
  };

  return (
    <OpenDocumentsContext.Provider
      value={{
        openDocumentId,
        previewDocument,
        openDocument,
      }}
    >
      {props.children}
    </OpenDocumentsContext.Provider>
  );
}
