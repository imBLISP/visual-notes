import { update } from "@/lib/transactions/operations";

export default function unaliveWorkspace(
  workspaceId: string
) {
    return {
        operations: [
            update(
                {
                    active: false
                },
                workspaceId,
                "workspaces",
                workspaceId
            )
        ],
    }
}
