import { set } from "@/lib/transactions/operations";
import { Transaction } from "@/lib/zod"
import { v4 as uuidv4 } from "uuid"


export default function (
    workspace: any,
): Transaction {
    let workspaceId = workspace.id
    if (!workspaceId) {
        workspaceId = uuidv4()
    }

    return {
        operations: [
            set(workspace, workspaceId, [], "workspaces"),
        ],
    };
}
