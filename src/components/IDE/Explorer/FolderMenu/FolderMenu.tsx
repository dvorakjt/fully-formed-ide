"use client";
import { useContext } from "react";
import { FileSystemContext } from "../../FileSystem/FileSystemContext";
import { SubFolders } from "./SubFolders";
import { Files } from "./Files";
import { NewItem } from "../NewItem";
import { Action } from "../Folder/action";
import { getChildNames } from "@/util/explorer/get-child-names";
import type { Directory } from "@/model/directory";
import styles from "./styles.module.scss";

interface FolderMenuProps {
  directory: Directory;
  action: Action;
  endAction(): void;
}

export function FolderMenu(props: FolderMenuProps) {
  const fileSystem = useContext(FileSystemContext)!;

  function addDirectory(name: string) {
    fileSystem.addDirectory(props.directory.id, name);
    props.endAction();
  }

  function addDocument(name: string) {
    fileSystem.addDocument(props.directory.id, name);
    props.endAction();
  }

  return (
    <menu className={styles.menu}>
      {props.action === Action.AddFolder && (
        <NewItem
          inputLabel={`Add directory to "${props.directory.name}"`}
          siblingNames={getChildNames(props.directory)}
          iconSrc={"/IDE-icons/new-folder.svg"}
          iconAlt={"New folder"}
          indentation={props.directory.depth + 1}
          createItem={addDirectory}
          cancelCreate={props.endAction}
        />
      )}
      <SubFolders subDirectories={props.directory.subdirectories} />
      {props.action === Action.AddFile && (
        <NewItem
          inputLabel={`Add document to "${props.directory.name}"`}
          siblingNames={getChildNames(props.directory)}
          iconSrc={"/IDE-icons/new-file.svg"}
          iconAlt={"New file"}
          indentation={props.directory.depth + 1}
          createItem={addDocument}
          cancelCreate={props.endAction}
        />
      )}
      <Files documents={props.directory.documents} />
    </menu>
  );
}
