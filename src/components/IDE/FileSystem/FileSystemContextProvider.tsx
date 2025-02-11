"use client";
import { useState, type ReactNode } from "react";
import { v4 as uuid } from "uuid";
import { FileSystemContext } from "./FileSystemContext";
import { NodeNotFoundError } from "@/errors/node-not-found-error";
import type { FileSystemNode } from "@/model/file-system-node";
import type { Directory } from "@/model/directory";
import type { Document } from "@/model/document";
import { alphabetizeNodes } from "@/util/alphabetize-nodes";

// parent will be a server component that accepts a root directory
// all other props will be calculated at build time on the server
interface FileSystemProps {
  rootDirectory: Directory;
  nodes: Record<string, FileSystemNode>;
  /**
   * A dictionary whose keys are absolute paths and
   * whose values are the ids of files in which they
   * are imported.
   */
  exports: Record<string, string>;
  /**
   * A dictionary whose keys are the ids of files
   * and whose values are the absolute paths imported
   * in those files.
   */
  imports: Record<string, string>;
  children?: ReactNode;
}

export function FileSystemContextProvider({
  rootDirectory,
  nodes,
  exports,
  imports,
  children,
}: FileSystemProps) {
  const [state, setState] = useState({
    rootDirectory,
    nodes,
    exports,
    imports,
  });

  function useDocument(documentId: string): Document | null {
    const maybeDocument = state.nodes[documentId];
    return maybeDocument ? (maybeDocument as Document) : null;
  }

  function addSubdirectory(directoryId: string, name: string): void {
    const maybeParent = state.nodes[directoryId];
    if (!maybeParent)
      throw new NodeNotFoundError(
        "Failed to add subdirectory. Parent directory does not exist."
      );

    const parent = maybeParent as Directory;
    const newDirectory: Directory = {
      id: uuid(),
      name,
      parent,
      depth: parent.depth + 1,
      subdirectories: [],
      documents: [],
    };

    const updatedSiblings = alphabetizeNodes([
      ...parent.subdirectories,
      newDirectory,
    ]);

    let rootDirectory: Directory = {
      ...parent,
      subdirectories: updatedSiblings,
    };

    while (rootDirectory.parent) {
      rootDirectory = rootDirectory.parent;
    }

    setState({
      rootDirectory,
      nodes: {
        ...state.nodes,
        [newDirectory.id]: newDirectory,
      },
      exports,
      imports,
    });
  }

  function addDocument(directoryId: string, name: string): void {
    const maybeParent = state.nodes[directoryId];
    if (!maybeParent)
      throw new NodeNotFoundError(
        "Failed to add subdirectory. Parent directory does not exist."
      );

    const parent = maybeParent as Directory;
    const newDocument: Document = {
      id: uuid(),
      name,
      parent,
      depth: parent.depth + 1,
      contents: "",
    };

    const updatedSiblings = alphabetizeNodes([
      ...parent.documents,
      newDocument,
    ]);

    let rootDirectory: Directory = {
      ...parent,
      documents: updatedSiblings,
    };

    while (rootDirectory.parent) {
      rootDirectory = rootDirectory.parent;
    }

    setState({
      rootDirectory,
      nodes: {
        ...state.nodes,
        [newDocument.id]: newDocument,
      },
      exports,
      imports,
    });
  }

  // updateContents(documentId: string, contents: string): void;

  // renameNode(nodeId: string, name: string): void;

  // moveNode(nodeId: string, destinationId: string): void;

  // removeNode(nodeId: string): void;

  return (
    <FileSystemContext.Provider
      value={{
        rootDirectory: state.rootDirectory,
        useDocument,
        addSubdirectory,
        addDocument,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
}
