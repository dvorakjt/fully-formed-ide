"use client";
import { useContext, useState, useEffect, DragEventHandler } from "react";
import { FileSystemContext } from "../../FileSystem/FileSystemContext";
import { OpenDocumentsContext } from "../../OpenDocumentsContext/OpenDocumentsContext";
import { ExplorerContext } from "../ExplorerContext";
import { ExplorerItemSelector } from "../ExplorerItemSelector";
import { ExplorerItemNameEditor } from "../ExplorerItemNameEditor";
import { ExplorerItemControls } from "../ExplorerItemControls";
import { FolderMenu } from "../FolderMenu";
import { Action } from "./action";
import { hasChild } from "@/util/explorer/has-child";
import { getSiblingNames } from "@/util/explorer/get-sibling-names";
import type { Directory } from "@/model/directory";
import styles from "./styles.module.scss";

interface FolderProps {
  directory: Directory;
}

export function Folder({ directory }: FolderProps) {
  const fileSystem = useContext(FileSystemContext)!;
  const { openDocumentId } = useContext(OpenDocumentsContext)!;
  const { activeNodeId, setActiveNodeId, clearActiveNode } =
    useContext(ExplorerContext)!;
  const [action, setAction] = useState<Action>(Action.None);

  const containsOpenedDocument =
    !!openDocumentId && hasChild(directory, openDocumentId);

  const [isExpanded, setIsExpanded] = useState(containsOpenedDocument);

  const className = (() => {
    if (activeNodeId) {
      if (
        activeNodeId === directory.id &&
        action !== Action.AddFile &&
        action !== Action.AddFolder
      ) {
        return styles.activeFolder;
      }

      return styles.disabledFolder;
    }

    if (!isExpanded && containsOpenedDocument) {
      return styles.collapsedWithOpenChild;
    }

    return styles.folder;
  })();

  const iconSrc = `/IDE-icons/folder-${
    isExpanded ? "expanded" : "collapsed"
  }.svg`;
  const iconAlt = `${isExpanded ? "Expanded" : "Collapsed"} folder`;
  const selectorLabel = `${isExpanded ? "Collapse" : "Expand"} directory "${
    directory.name
  }"`;

  function beginAddFile() {
    beginAction(Action.AddFile);
    setIsExpanded(true);
  }

  function beginAddFolder() {
    beginAction(Action.AddFolder);
    setIsExpanded(true);
  }

  function beginAction(action: Action) {
    setActiveNodeId(directory.id);
    setAction(action);
  }

  function endAction() {
    setAction(Action.None);
    clearActiveNode();
  }

  function confirmNewName(name: string) {
    fileSystem.renameNode(directory.id, name);
    setAction(Action.None);
    clearActiveNode();
  }

  function removeSelf() {
    const shouldRemoveSelf = confirm(
      `Are you sure you would like to remove "${directory.name}?"`
    );
    if (shouldRemoveSelf) {
      fileSystem.removeNode(directory.id);
    }
  }

  const onDragStart: DragEventHandler = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData("text/plain", directory.id);
  };

  const onDragOver: DragEventHandler = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsExpanded(true);
  };

  const onDrop: DragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nodeId = e.dataTransfer.getData("text/plain");
    if (!nodeId) return;

    fileSystem.moveNode(nodeId, directory.id);
  };

  useEffect(() => {
    if (openDocumentId && hasChild(directory, openDocumentId)) {
      setIsExpanded(true);
    }
  }, [directory, openDocumentId]);

  return (
    <li
      className={styles.container}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className={className}>
        <ExplorerItemSelector
          itemName={directory.name}
          iconSrc={iconSrc}
          iconAlt={iconAlt}
          indentation={directory.depth}
          showName={action !== Action.Rename}
          aria-label={selectorLabel}
          onClick={() => setIsExpanded(!isExpanded)}
        />
        {action === Action.Rename && (
          <ExplorerItemNameEditor
            itemName={directory.name}
            siblingNames={getSiblingNames(directory)}
            inputLabel={`Rename directory "${directory.name}"`}
            confirmChanges={confirmNewName}
            cancelChanges={endAction}
          />
        )}
        {action !== Action.Rename && (
          <div className={styles.controls}>
            <ExplorerItemControls
              controls={[
                {
                  label: `Add a new file to directory "${directory.name}"`,
                  iconSrc: "/IDE-icons/new-file.svg",
                  onClick: (e) => {
                    e.stopPropagation();
                    beginAddFile();
                  },
                },
                {
                  label: `Add a new folder to directory "${directory.name}"`,
                  iconSrc: "/IDE-icons/new-folder.svg",
                  onClick: (e) => {
                    e.stopPropagation();
                    beginAddFolder();
                  },
                },
                {
                  label: `Rename directory "${directory.name}"`,
                  iconSrc: "/IDE-icons/rename.svg",
                  onClick: (e) => {
                    e.stopPropagation();
                    beginAction(Action.Rename);
                  },
                },
                {
                  label: `Remove directory "${directory.name}"`,
                  iconSrc: "/IDE-icons/remove.svg",
                  onClick: removeSelf,
                },
              ]}
            />
          </div>
        )}
        <div className={styles.overlay}></div>
      </div>
      {isExpanded && (
        <FolderMenu
          directory={directory}
          action={action}
          endAction={endAction}
        />
      )}
    </li>
  );
}
