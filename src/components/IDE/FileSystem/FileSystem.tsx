import { FileSystemContextProvider } from "./FileSystemContextProvider";
import { initNodes } from "../../../util/file-system/init-nodes";
import type { ReactNode } from "react";
import type { Directory } from "@/model/directory";

interface FileSystemProps {
  rootDirectory: Directory;
  children?: ReactNode;
}

export function FileSystem({ rootDirectory, children }: FileSystemProps) {
  // Nodes are precomputed once at build time.
  const nodes = initNodes(rootDirectory);

  return (
    <FileSystemContextProvider rootDirectory={rootDirectory} nodes={nodes}>
      {children}
    </FileSystemContextProvider>
  );
}
