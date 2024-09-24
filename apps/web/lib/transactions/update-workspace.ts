import { update } from "@/lib/transactions/operations";
import { Workspace } from "@/lib/types";

export default function updateWorkspace(
  workspace: Partial<Workspace>,
  workspaceId: string
) {
  return {
    operations: [
      update(
        workspace,
        workspaceId,
        "workspaces",
        workspaceId
      ),
    ],
  };
}