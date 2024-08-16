import Editor from "./editor";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "Editor/Page",
    component: Editor,
} satisfies Meta<typeof Editor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
      blockId: "1",    
      allBlocks:[
        {
          id: "1",
          type: "page",
          properties: {
            title: "Page",
          },
          parentId: "0",
          content: ["2", "3", "4"],
        },
        {
          id: "2",
          type: "text",
          properties: {
            title: "text one",
          },
          parentId: "1",
          content: [],
        },
        {
          id: "3",
          type: "text",
          properties: {
            title: "text two",
          },
          parentId: "1",
          content: [],
        },
        {
          id: "4",
          type: "text",
          properties: {
            title: "text three",
          },
          parentId: "1",
          content: [],
        },
      ]
    }
}
