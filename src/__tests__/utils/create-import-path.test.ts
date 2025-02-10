import { createImportPath } from "@/util/create-import-path";
import type { Directory } from "@/model/directory";
import type { Document } from "@/model/document";

describe("createImportPath", () => {
  it("creates an import path from one node to another.", () => {
    const root: Directory = {
      id: "0",
      name: "root",
      parent: null,
      depth: 0,
      subdirectories: [],
      documents: [],
    };

    const src: Directory = {
      id: "1",
      name: "src",
      parent: root,
      depth: root.depth + 1,
      subdirectories: [],
      documents: [],
    };
    root.subdirectories.push(src);

    const styles: Directory = {
      id: "2",
      name: "styles",
      parent: src,
      depth: src.depth + 1,
      subdirectories: [],
      documents: [],
    };
    src.subdirectories.push(styles);

    const variables: Document = {
      id: "3",
      name: "_variables.scss",
      parent: styles,
      depth: styles.depth + 1,
      contents: "",
    };
    styles.documents.push(variables);

    const components: Directory = {
      id: "4",
      name: "components",
      parent: src,
      depth: src.depth + 1,
      subdirectories: [],
      documents: [],
    };
    src.subdirectories.push(components);

    const myComponentDir: Directory = {
      id: "5",
      name: "MyComponent",
      parent: components,
      depth: components.depth + 1,
      subdirectories: [],
      documents: [],
    };
    components.subdirectories.push(myComponentDir);

    const myComponent: Document = {
      id: "6",
      name: "MyComponent.tsx",
      parent: myComponentDir,
      depth: myComponentDir.depth + 1,
      contents: "",
    };
    myComponentDir.documents.push(myComponent);

    console.log(createImportPath(myComponent, variables));
  });
});
