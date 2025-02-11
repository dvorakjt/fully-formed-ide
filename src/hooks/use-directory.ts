import { useContext } from "react";
import { FileSystemContext } from "@/components/IDE/FileSystem/FileSystemContext";
import { FileSystemError } from "@/components/IDE/FileSystem/FileSystemError";
import type { Directory } from "@/model/directory";

export function useDirectory(directoryId: string): Directory {
  const { nodes } = useContext(FileSystemContext)!;
  const maybeDirectory = nodes[directoryId];

  if (!maybeDirectory || maybeDirectory.type !== "directory") {
    throw new FileSystemError(
      `Directory with id "${directoryId}" does not exist.`
    );
  }

  return maybeDirectory as Directory;
}
