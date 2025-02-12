"use client";
import { useState, type ReactNode } from "react";
import { v4 as uuid } from "uuid";
import { FileSystemContext } from "./FileSystemContext";
import { alphabetizeNodes } from "@/util/file-system/alphabetize-nodes";
import { updateDepth } from "@/util/file-system/update-depth";
import type { FileSystemNode } from "@/model/file-system-node";
import type { Directory } from "@/model/directory";
import type { Document } from "@/model/document";
import { isChildOf } from "@/util/explorer/is-child-of";

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
    errorMessage: "",
  });

  const addDirectory = (parentId: string, name: string) => {
    setState((prevState) => {
      const maybeParent = prevState.nodes[parentId];
      if (!maybeParent || maybeParent.type !== "directory") {
        return {
          ...prevState,
          errorMessage: `Cannot add subdirectory. Directory with id "${parentId}" does not exist.`,
        };
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
      prevState.nodes[newDirectory.id] = newDirectory;
      return { ...prevState, errorMessage: "" };
    });
  };

  const addDocument = (parentId: string, name: string) => {
    setState((prevState) => {
      const maybeParent = prevState.nodes[parentId];
      if (!maybeParent || maybeParent.type !== "directory") {
        return {
          ...prevState,
          errorMessage: `Cannot add document. Directory with id "${parentId}" does not exist.`,
        };
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
      prevState.nodes[newDocument.id] = newDocument;
      return { ...prevState, errorMessage: "" };
    });
  };

  const updateContents = (documentId: string, newContents: string) => {
    setState((prevState) => {
      const maybeDocument = prevState.nodes[documentId];
      if (!maybeDocument || maybeDocument.type !== "document") {
        return {
          ...prevState,
          errorMessage: `Could not update contents of document with id "${documentId}." No such document exists.`,
        };
      }

      const document = maybeDocument as Document;
      document.contents = newContents;
      return { ...prevState, errorMessage: "" };
    });
  };

  const renameNode = (nodeId: string, newName: string) => {
    setState((prevState) => {
      const maybeNode = prevState.nodes[nodeId];
      if (!maybeNode) {
        return {
          ...prevState,
          errorMessage: `Could not rename node with id "${nodeId}." No such node exists.`,
        };
      }

      const node = maybeNode as FileSystemNode;
      node.name = newName;
      return {
        ...prevState,
        errorMessage: "",
      };
    });
  };

  const moveNode = (nodeId: string, newParentOrSiblingId: string) => {
    setState((prevState) => {
      const node = prevState.nodes[nodeId];
      if (!node) {
        return {
          ...prevState,
          errorMessage: `Could not move node with id "${nodeId}." No such node exists.`,
        };
      }

      const originalParent = node.parent;
      if (!originalParent) {
        return {
          ...prevState,
          errorMessage: "Cannot move the root node.",
        };
      }

      const newParentOrSibling = prevState.nodes[newParentOrSiblingId];
      const maybeNewParent =
        newParentOrSibling?.type === "directory"
          ? newParentOrSibling
          : newParentOrSibling?.parent;

      if (!maybeNewParent) {
        return {
          ...prevState,
          errorMessage: "Could not move node. Destination does not exist.",
        };
      }

      const newParent = maybeNewParent as Directory;

      if (newParent.id === nodeId) {
        return {
          ...prevState,
          errorMessage: "Cannot move directory inside itself.",
        };
      }

      if (isChildOf(newParent, nodeId)) {
        return {
          ...prevState,
          errorMessage: "Cannot move directory inside own child.",
        };
      }

      if (
        newParent.subdirectories.some(
          (subdirectory) => subdirectory.name === node.name
        ) ||
        newParent.documents.some((document) => document.name === node.name)
      ) {
        return {
          ...prevState,
          errorMessage: `Cannot move directory. Directory with name "${node.name}" already exists in the destination.`,
        };
      }

      if (node.type === "directory") {
        originalParent.subdirectories = originalParent.subdirectories.filter(
          (d) => d.id !== node.id
        );
      } else {
        originalParent.documents = originalParent.documents.filter(
          (d) => d.id !== node.id
        );
      }

      node.parent = newParent;
      updateDepth(node, node.parent.depth + 1);

      if (node.type === "directory") {
        node.parent.subdirectories.push(node as Directory);
        alphabetizeNodes(node.parent.subdirectories);
      } else {
        node.parent.documents.push(node as Document);
        alphabetizeNodes(node.parent.documents);
      }

      return { ...prevState, errorMessage: "" };
    });
  };

  const removeNode = (nodeId: string) => {
    setState((prevState) => {
      const node = prevState.nodes[nodeId];
      if (!node) {
        return {
          ...prevState,
          errorMessage: `Cannot remove node with id ${nodeId}. No such node exists.`,
        };
      }

      const maybeParent = node.parent;
      if (!maybeParent) {
        return {
          ...prevState,
          errorMessage: "Could not remove the root node.",
        };
      }

      const parent = maybeParent as Directory;
      if (node.type === "directory") {
        parent.subdirectories = parent.subdirectories.filter(
          (d) => d.id !== nodeId
        );
      } else {
        parent.documents = parent.documents.filter((d) => d.id !== nodeId);
      }

      delete prevState.nodes[nodeId];
      return { ...prevState, errorMessage: "" };
    });
  };

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
