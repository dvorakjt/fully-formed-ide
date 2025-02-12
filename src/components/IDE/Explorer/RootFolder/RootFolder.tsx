"use client";
import { DragEventHandler, useContext, useState } from "react";
import { FileSystemContext } from "../../FileSystem/FileSystemContext";
import { ExplorerContext } from "../ExplorerContext";
import { ExplorerItemControls } from "../ExplorerItemControls";
import { FolderMenu } from "../FolderMenu";
import { Action } from "../Folder/action";
import styles from "./styles.module.scss";

export function RootFolder() {
  const fileSystem = useContext(FileSystemContext)!;

  const { activeNodeId, setActiveNodeId, clearActiveNode } =
    useContext(ExplorerContext)!;

  const [action, setAction] = useState<Action>(Action.None);

  function beginAction(action: Action) {
    setActiveNodeId(fileSystem.rootDirectory.id);
    setAction(action);
  }

  function endAction() {
    setAction(Action.None);
    clearActiveNode();
  }

  const onDragOver: DragEventHandler = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop: DragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nodeId = e.dataTransfer.getData("text/plain");
    if (!nodeId) return;

    fileSystem.moveNode(nodeId, fileSystem.rootDirectory.id);
  };

  const isDisabled =
    (!!activeNodeId && activeNodeId !== fileSystem.rootDirectory.id) ||
    action !== Action.None;

  return (
    <nav className={styles.rootFolder} onDragOver={onDragOver} onDrop={onDrop}>
      <header className={styles.header}>
        <h3>{fileSystem.rootDirectory.name}</h3>
        <ExplorerItemControls
          controls={[
            {
              label: "Add a new file to the root directory",
              iconSrc: "/IDE-icons/new-file.svg",
              onClick: (e) => {
                e.stopPropagation();
                beginAction(Action.AddFile);
              },
              disabled: isDisabled,
            },
            {
              label: "Add a new folder to the root directory",
              iconSrc: "/IDE-icons/new-folder.svg",
              onClick: (e) => {
                e.stopPropagation();
                beginAction(Action.AddFolder);
              },
              disabled: isDisabled,
            },
          ]}
        />
        {isDisabled && <div className={styles.overlay}></div>}
      </header>
      <FolderMenu
        directory={fileSystem.rootDirectory}
        action={action}
        endAction={endAction}
      />
    </nav>
  );
}
