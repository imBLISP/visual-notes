import {BlockOperation, Block} from "@/lib/types";

export function set(block: any, workspaceId: string): BlockOperation {
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
