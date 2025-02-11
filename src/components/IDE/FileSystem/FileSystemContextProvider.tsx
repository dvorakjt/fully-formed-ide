"use client";
import { useState, useCallback, type ReactNode, useEffect } from "react";
import { produce } from "immer";
import { v4 as uuid } from "uuid";
import { FileSystemContext } from "./FileSystemContext";
import { alphabetizeNodes } from "@/util/file-system/alphabetize-nodes";
import { FileSystemError } from "./FileSystemError";
import type { FileSystemNode } from "@/model/file-system-node";
import type { Directory } from "@/model/directory";
import type { Document } from "@/model/document";

interface FileSystemContextProviderProps {
  rootDirectory: Directory;
  nodes: Record<string, FileSystemNode>;
  children?: ReactNode;
}

export function FileSystemContextProvider({
  rootDirectory,
  nodes,
  children,
}: FileSystemContextProviderProps) {
  const [state, setState] = useState({
    rootDirectory,
    nodes,
  });

  const addDirectory = useCallback((parentId: string, name: string) => {
    setState(
      produce((draft) => {
        const maybeParent = draft.nodes[parentId];
        if (!maybeParent || maybeParent.type !== "directory") {
          throw new FileSystemError(
            `Cannot add subdirectory. Directory with id "${parentId}" does not exist.`
          );
        }

        const parent = maybeParent as Directory;
        const newDirectory: Directory = {
          type: "directory",
          id: uuid(),
          name,
          parent,
          depth: parent.depth + 1,
          subdirectories: [],
          documents: [],
        };
        parent.subdirectories.push(newDirectory);
        alphabetizeNodes(parent.subdirectories);
        draft.nodes[newDirectory.id] = newDirectory;
      })
    );
  }, []);

  const addDocument = useCallback((parentId: string, name: string) => {
    setState(
      produce((draft) => {
        const maybeParent = draft.nodes[parentId];
        if (!maybeParent || maybeParent.type !== "directory") {
          throw new FileSystemError(
            `Cannot add document. Directory with id "${parentId}" does not exist.`
          );
        }

        const parent = maybeParent as Directory;
        const newDocument: Document = {
          type: "document",
          id: uuid(),
          name,
          parent,
          depth: parent.depth + 1,
          contents: "",
        };
        parent.documents.push(newDocument);
        alphabetizeNodes(parent.documents);
        draft.nodes[newDocument.id] = newDocument;
      })
    );
  }, []);

  const updateContents = useCallback(
    (documentId: string, newContents: string) => {
      setState(
        produce((draft) => {
          const maybeDocument = draft.nodes[documentId];
          if (!maybeDocument || maybeDocument.type !== "document") {
            throw new FileSystemError(
              `Could not update contents of document with id "${documentId}." No such document exists.`
            );
          }

          const document = maybeDocument as Document;
          document.contents = newContents;
        })
      );
    },
    []
  );

  const renameNode = useCallback((nodeId: string, newName: string) => {
    setState(
      produce((draft) => {
        const maybeNode = draft.nodes[nodeId];
        if (!maybeNode) {
          throw new FileSystemError(
            `Could not rename node with id "${nodeId}." No such node exists.`
          );
        }

        const node = maybeNode as FileSystemNode;
        node.name = newName;
      })
    );
  }, []);

  const moveNode = useCallback(
    (nodeId: string, newParentOrSiblingId: string) => {
      setState(
        produce((draft) => {
          const node = draft.nodes[nodeId];
          if (!node) {
            throw new FileSystemError(
              `Could not move node with id "${nodeId}." No such node exists.`
            );
          }

          const originalParent = node.parent;
          if (!originalParent) {
            throw new FileSystemError("Cannot move the root node.");
          }

          originalParent.subdirectories = originalParent.subdirectories.filter(
            (d) => d.id !== node.id
          );

          const newParentOrSibling = draft.nodes[newParentOrSiblingId];
          const maybeNewParent =
            newParentOrSibling?.type === "directory"
              ? newParentOrSibling
              : newParentOrSibling?.parent;

          if (!maybeNewParent) {
            throw new FileSystemError(
              "Could not move node. Destination does not exist."
            );
          }

          const newParent = maybeNewParent as Directory;
          node.parent = newParent;
          node.depth = node.parent.depth + 1;

          if (node.type === "directory") {
            node.parent.subdirectories.push(node as Directory);
            alphabetizeNodes(node.parent.subdirectories);
          } else {
            node.parent.documents.push(node as Document);
            alphabetizeNodes(node.parent.documents);
          }
        })
      );
    },
    []
  );

  const removeNode = useCallback((nodeId: string) => {
    setState(
      produce((draft) => {
        const node = draft.nodes[nodeId];
        if (!node) {
          throw new FileSystemError(
            `Cannot remove node with id ${nodeId}. No such node exists.`
          );
        }

        const maybeParent = node.parent;
        if (!maybeParent) {
          throw new FileSystemError("Could not remove the root node.");
        }

        const parent = maybeParent as Directory;
        if (node.type === "directory") {
          parent.subdirectories = parent.subdirectories.filter(
            (d) => d.id !== nodeId
          );
        } else {
          parent.documents = parent.documents.filter((d) => d.id !== nodeId);
        }

        delete draft.nodes[nodeId];
      })
    );
  }, []);

  return (
    <FileSystemContext.Provider
      value={{
        ...state,
        addDirectory,
        addDocument,
        updateContents,
        renameNode,
        moveNode,
        removeNode,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
}
