"use client";
import { useContext, useState } from "react";
import { FileSystemContext } from "../../FileSystem/FileSystemContext";
import { ExplorerContext } from "../ExplorerContext";
import { ExplorerItemControls } from "../ExplorerItemControls";
import { FolderMenu } from "../FolderMenu";
import { Action } from "../Folder/action";
import styles from "./styles.module.scss";

export function RootFolder() {
  const { rootDirectory } = useContext(FileSystemContext)!;

  const { activeNodeId, setActiveNodeId, clearActiveNode } =
    useContext(ExplorerContext)!;

  const [action, setAction] = useState<Action>(Action.None);

  function beginAction(action: Action) {
    setActiveNodeId(rootDirectory.id);
    setAction(action);
  }

  function endAction() {
    setAction(Action.None);
    clearActiveNode();
  }

  const isDisabled = !!activeNodeId && activeNodeId !== rootDirectory.id;

  return (
    <nav className={styles.rootFolder}>
      <header className={styles.header}>
        <h3>{rootDirectory.name}</h3>
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
        directory={rootDirectory}
        action={action}
        endAction={endAction}
      />
    </nav>
  );
}
