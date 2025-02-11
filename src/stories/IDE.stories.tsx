import { IDE } from "@/components/IDE";
import { v4 as uuid } from "uuid";
import type { Meta, StoryObj } from "@storybook/react";
import type { Directory } from "@/model/directory";

const meta: Meta<typeof IDE> = {
  component: IDE,
};

export default meta;

type Story = StoryObj<typeof IDE>;

export const BasicExample: Story = {
  render: function BasicExample() {
    const rootDirectory: Directory = {
      type: "directory",
      id: uuid(),
      name: "My Project",
      parent: null,
      depth: -1,
      subdirectories: [],
      documents: [],
    };

    return <IDE rootDirectory={rootDirectory} />;
  },
};
