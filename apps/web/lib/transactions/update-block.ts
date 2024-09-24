import { update } from "@/lib/transactions/operations";
import { Block } from "@/lib/zod";

export default function updateBlock(
  block: Partial<Block>,
  blockId: string,
) {
  return {
    operations: [
      update(
        block,
        blockId,
        "blocks"
      ),
    ],
  };
}
