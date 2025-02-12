import { IDE } from "@/components/IDE";
import { v4 as uuid } from "uuid";
import type { Meta, StoryObj } from "@storybook/react";
import type { FileSystemContents } from "@/model/file-system-contents";

const meta: Meta<typeof IDE> = {
  component: IDE,
};

export default meta;

type Story = StoryObj<typeof IDE>;

export const BasicExample: Story = {
  render: function BasicExample() {
    const fileSystemContents: FileSystemContents = {
      name: "My Awesome Project",
      subdirectories: [
        {
          name: "src",
          subdirectories: [
            {
              name: "MyComponent",
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
    };

    return <IDE fileSystemContents={fileSystemContents} />;
  },
};
