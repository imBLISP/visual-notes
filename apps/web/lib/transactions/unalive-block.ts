import { deleteBlock } from "@/lib/transactions/operations";

export default function UpdateBlock(
  blockId: string,
  workspaceId: string
) {
    return {
        operations: [
            deleteBlock(blockId, workspaceId),
        ],
    }
}
