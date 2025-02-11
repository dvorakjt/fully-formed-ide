import { alphabetizeNodes } from "@/components/IDE/FileSystem/utils/alphabetize-nodes";
import type { Document } from "@/model/document";

describe("alphabetize", () => {
  it("sorts a list of nodes alphabetically.", () => {
    const unsortedDocuments: Document[] = [
      {
        id: "0",
        name: "styles.css",
        parent: null,
        depth: 0,
        contents: "",
      },
      {
        id: "1",
        name: "test.tsx",
        parent: null,
        depth: 0,
        contents: "",
      },
      {
        id: "2",
        name: "MyComponent.tsx",
        parent: null,
        depth: 0,
        contents: "",
      },
      {
        id: "3",
        name: "index.tsx",
        parent: null,
        depth: 0,
        contents: "",
      },
    ];

    expect(alphabetizeNodes(unsortedDocuments)).toEqual([
      unsortedDocuments[3],
      unsortedDocuments[2],
      unsortedDocuments[0],
      unsortedDocuments[1],
    ]);
  });
});
