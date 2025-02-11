"use client";
import { useContext, useState } from "react";
import { FileSystemContext } from "../../FileSystem/FileSystemContext";
import { OpenDocumentsContext } from "../../OpenDocumentsContext/OpenDocumentsContext";
import { ExplorerContext } from "../ExplorerContext";
import { ExplorerItemSelector } from "../ExplorerItemSelector";
import { ExplorerItemNameEditor } from "../ExplorerItemNameEditor";
import { ExplorerItemControls } from "../ExplorerItemControls";
import { getSiblingNames } from "@/util/explorer/get-sibling-names";
import type { Document } from "@/model/document";
import styles from "./styles.module.scss";

interface FileProps {
  document: Document;
}

/* There is some problem with styles when the file is opened */
export function File({ document }: FileProps) {
  const fileSystem = useContext(FileSystemContext)!;
  const { openDocumentId, previewDocument, openDocument } =
    useContext(OpenDocumentsContext)!;
  const { activeNodeId, setActiveNodeId, clearActiveNode } =
    useContext(ExplorerContext)!;
  const [isRenaming, setIsRenaming] = useState(false);

  function beginRenaming() {
    setActiveNodeId(document.id);
    setIsRenaming(true);
  }

  function confirmNewName(name: string) {
    fileSystem.renameNode(document.id, name);
    setIsRenaming(false);
    clearActiveNode();
  }

  function cancelRenaming() {
    setIsRenaming(false);
    clearActiveNode();
  }

  function removeSelf() {
    const shouldRemoveSelf = confirm(
      `Are you sure you want to remove ${document.name}?"`
    );
    if (shouldRemoveSelf) {
      fileSystem.removeNode(document.id);
    }
  }

  const className = (() => {
    if (activeNodeId) {
      if (activeNodeId === document.id) {
        return styles.activeFile;
      }

      return styles.disabledFile;
    }

    if (openDocumentId === document.id) {
      return styles.openedFile;
    }

    return styles.file;
  })();

  return (
    <li
      className={className}
      style={{ justifyContent: isRenaming ? "flex-start" : "space-between" }}
    >
      <ExplorerItemSelector
        itemName={document.name}
        showName={!isRenaming}
        iconSrc="/IDE-icons/file.svg"
        iconAlt="document icon"
        aria-label={`Open ${document.name}`}
        indentation={document.depth}
        onClick={() => previewDocument(document.id)}
        onDoubleClick={() => openDocument(document.id)}
      />
      {isRenaming ? (
        <ExplorerItemNameEditor
          itemName={document.name}
          inputLabel="Rename file"
          siblingNames={getSiblingNames(document)}
          confirmChanges={confirmNewName}
          cancelChanges={cancelRenaming}
        />
      ) : (
        <div className={styles.controls}>
          <ExplorerItemControls
            controls={[
              {
                label: `Rename ${name}`,
                iconSrc: "/IDE-icons/rename.svg",
                onClick: (e) => {
                  e.stopPropagation();
                  beginRenaming();
                },
              },
              {
                label: `Delete ${name}`,
                iconSrc: "/IDE-icons/remove.svg",
                onClick: removeSelf,
              },
            ]}
          />
        </div>
      )}
      <div className={styles.overlay}></div>
    </li>
  );
}
