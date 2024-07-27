import { update } from "@/lib/transactions/operations";
import { Block } from "@/lib/types";

export default function UpdateBlock(
  block: Partial<Block>,
  blockId: string,
  workspaceId: string
) {
  return {
    operations: [
      update(
        block,
        blockId,
        workspaceId
      ),
    ],
  };
}
