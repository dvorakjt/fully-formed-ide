import { initRootDirectory } from "@/util/file-system/init-root-directory";

export const BASIC_EXAMPLE = initRootDirectory({
  name: "My Awesome Project",
  subdirectories: [
    {
      name: "src",
      id: "0",
      subdirectories: [
        {
          name: "MyComponent",
          id: "1",
          documents: [
            {
              name: "MyComponent.tsx",
            },
            {
              name: "index.tsx",
            },
            {
              name: "styles.module.css",
            },
          ],
        },
      ],
      documents: [
        {
          name: "main.css",
        },
      ],
    },
  ],
  documents: [
    {
      name: "package.json",
    },
  ],
});
