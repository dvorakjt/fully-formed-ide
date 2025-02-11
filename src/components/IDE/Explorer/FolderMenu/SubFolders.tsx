import { Folder } from "../Folder";
import type { Directory } from "@/model/directory";

interface SubFoldersProps {
  subDirectories: Directory[];
}

export function SubFolders(props: SubFoldersProps) {
  return (
    <>
      {props.subDirectories.map((subDirectory) => {
        return <Folder directory={subDirectory} key={subDirectory.id} />;
      })}
    </>
  );
}
