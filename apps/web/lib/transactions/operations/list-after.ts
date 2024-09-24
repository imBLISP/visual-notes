import { Operation } from "@/lib/zod";

export function listAfter(
  contentId: string,
  parentId: string,
  listAfterContentId: string | null = null,
  table: "blocks" | "workspaces"
): Operation {
  return {
    args: {
      ...(listAfterContentId && { after: listAfterContentId }),
      id: contentId,
    },
    path: ["content"],
    command: "listAfter",
    pointer: {
      id: parentId,
      table: table,
    },
  };
}
