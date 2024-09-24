import { update } from "@/lib/transactions/operations";

export default function unaliveBlock(
  blockId: string,
  workspaceId: string
) {
    return {
        operations: [
            update(
                {
                    active: false
                },
                blockId,
                "blocks",
                workspaceId
            )
        ],
    }
}
