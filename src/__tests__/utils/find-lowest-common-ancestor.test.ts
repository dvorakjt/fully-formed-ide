import { findLowestCommonAncestor } from "@/util/find-lowest-common-ancestor";
import type { Directory } from "@/model/directory";
import type { Document } from "@/model/document";

describe("findLowestCommonAncestor", () => {
  it("returns the lowest common ancestral node.", () => {
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

    const packageJSON: Document = {
      id: "2",
      name: "package.json",
      parent: root,
      depth: root.depth + 1,
      contents: "",
    };
    root.documents.push(packageJSON);

    expect(findLowestCommonAncestor(src, packageJSON)).toBe(root);
  });
});
