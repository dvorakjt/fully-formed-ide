import { File } from "../File";
import type { Document } from "@/model/document";

interface FilesProps {
  documents: Document[];
}

export function Files(props: FilesProps) {
  return (
    <>
      {props.documents.map((document) => {
        return <File document={document} key={document.id} />;
      })}
    </>
  );
}
