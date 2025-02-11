import { FileSystem } from "./FileSystem";
import { OpenDocumentsContextProvider } from "./OpenDocumentsContext";
import { Explorer } from "./Explorer";
import type { Directory } from "@/model/directory";

interface IDEProps {
  rootDirectory: Directory;
  activeDocumentId?: string;
}

export function IDE({ rootDirectory, activeDocumentId }: IDEProps) {
  return (
    <FileSystem rootDirectory={rootDirectory}>
      <OpenDocumentsContextProvider openDocumentId={activeDocumentId}>
        <Explorer />
      </OpenDocumentsContextProvider>
    </FileSystem>
  );
}
