import {BlockOperation, Block} from "@/lib/types";

export function deleteBlock(blockId: string, workspaceId: string): BlockOperation {
    return {
        args: {},
        path: [],
        command: "delete",
        pointer: {
          id: blockId,
          table: "blocks",
          workspaceId: workspaceId,
        },
      };
}
