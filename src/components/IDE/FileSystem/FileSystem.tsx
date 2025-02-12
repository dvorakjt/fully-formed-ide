import { FileSystemContextProvider } from "./FileSystemContextProvider";
import { initNodes } from "../../../util/file-system/init-nodes";
import { initRootDirectory } from "@/util/file-system/init-root-directory";
import type { ReactNode } from "react";
import type { FileSystemContents } from "@/model/file-system-contents";

interface FileSystemProps {
  contents: FileSystemContents;
  children?: ReactNode;
}

export function FileSystem({ contents, children }: FileSystemProps) {
  const rootDirectory = initRootDirectory(contents);
  const nodes = initNodes(rootDirectory);

  return (
    <FileSystemContextProvider rootDirectory={rootDirectory} nodes={nodes}>
      {children}
    </FileSystemContextProvider>
  );
}
