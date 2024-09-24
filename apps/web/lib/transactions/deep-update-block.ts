import {set} from "@/lib/transactions/operations"
import { Transaction } from "@/lib/zod"

export default function (
  block: any,
  blockId: string,
  path: string[]
): Transaction {
  return {
    operations: [
      set(block, blockId, path, "blocks"),
    ],
  };
}