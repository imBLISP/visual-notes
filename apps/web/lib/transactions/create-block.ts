import { BlockTransaction, Block } from "@/lib/types";
import {listAfter, set} from "@/lib/transactions/operations";

export default function (
  block: Block,
  workspaceId: string,
  listAfterBlockId: string | null = null
): BlockTransaction {
  return {
    operations: [
      set(block, block.id, workspaceId),
      listAfter(block, workspaceId, listAfterBlockId)
    ],
  };
}
