import {BlockOperation, Block} from "@/lib/types";

export function set(block: Block, workspaceId: string): BlockOperation {
    return {
        args: { ...block },
        path: [],
        command: "set",
        pointer: {
          id: block.id,
          table: "blocks",
          workspaceId: workspaceId,
        },
      };
}