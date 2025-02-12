import { FileSystem } from "./FileSystem";
import { OpenDocumentsContextProvider } from "./OpenDocumentsContext";
import { Explorer } from "./Explorer";
import type { FileSystemContents } from "@/model/file-system-contents";

interface IDEProps {
  fileSystemContents: FileSystemContents;
  activeDocumentId?: string;
}

export function IDE({ fileSystemContents, activeDocumentId }: IDEProps) {
  return (
    <FileSystem contents={fileSystemContents}>
      <OpenDocumentsContextProvider openDocumentId={activeDocumentId}>
        <Explorer />
      </OpenDocumentsContextProvider>
    </FileSystem>
  );
}
