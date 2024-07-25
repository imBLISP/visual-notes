import {BlockOperation, Block} from "@/lib/types"

export function listAfter(block: Block, workspaceId: string, listAfterBlockId: string | null = null): BlockOperation {
    return ({
        args: {
          ...(listAfterBlockId && { after: listAfterBlockId }),
          id: block.id,
        },
        path: ["content"],
        command: "listAfter",
        pointer: {
          id: block.parentId,
          table: "blocks",
          workspaceId: workspaceId,
        },
    });
}