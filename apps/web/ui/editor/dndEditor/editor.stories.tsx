import { Page } from "./editor";
import { Layout } from "./block";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
    title: "Editor/Page",
    component: Page,
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
      layout:Layout.Vertical,
      pageBlock:{
        id: "1",
        type: "page",
        properties: {
          title: "Page",
        },
        parentId: "0",
        content: ["2", "3", "4"],
      },
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
          type: "page",
          properties: {
            title: "text one",
          },
          parentId: "1",
          content: [],
        },
        {
          id: "3",
          type: "page",
          properties: {
            title: "text two",
          },
          parentId: "1",
          content: [],
        },
        {
          id: "4",
          type: "page",
          properties: {
            title: "text three",
          },
          parentId: "1",
          content: [],
        },
      ]
    }
}

// export default function Editor() {
//   return (
//     <Page
//       layout={Layout.Vertical}
//       pageBlock={{
//         id: "1",
//         type: "page",
//         properties: {
//           title: "Page",
//         },
//         parentId: "0",
//         content: ["2", "3", "4"],
//       }}
//       allBlocks={[
//         {
//           id: "1",
//           type: "page",
//           properties: {
//             title: "Page",
//           },
//           parentId: "0",
//           content: ["2", "3", "4"],
//         },
//         {
//           id: "2",
//           type: "page",
//           properties: {
//             title: "text one",
//           },
//           parentId: "1",
//           content: [],
//         },
//         {
//           id: "3",
//           type: "page",
//           properties: {
//             title: "text two",
//           },
//           parentId: "1",
//           content: [],
//         },
//         {
//           id: "4",
//           type: "page",
//           properties: {
//             title: "text three",
//           },
//           parentId: "1",
//           content: [],
//         },
//       ]}
//     ></Page>
//   );
// }
