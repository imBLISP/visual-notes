import {listAfter, set} from "@/lib/transactions/operations";
import { Transaction, Block } from "@/lib/zod";

export default function (
  block: Block,
  workspaceId: string,
  listAfterBlockId: string | null = null
): Transaction {
  return {
    operations: [
      set(block, block.id, [], "blocks"),
      listAfter(block.id, workspaceId, listAfterBlockId, "workspaces")
    ],
  };
}
