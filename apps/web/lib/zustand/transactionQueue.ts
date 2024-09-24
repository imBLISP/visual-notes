"use client";

import { create } from "zustand";
import { Block, BlockTransaction } from "@/lib/types";
import { Queue } from "@repo/utils";
import { useDebouncedCallback } from "use-debounce";
import { debounce, isEqual } from "lodash"

interface TransactionQueue {
  transactionQueue: Queue<BlockTransaction>;
  isSyncing: boolean;
  // updateBlock: (block: BlockProps) => void;
  // deleteBlock: (blockId: string) => void;
  enqueueTransaction: (update: BlockTransaction) => void;
  processTransaction: () => Promise<void>;
}

const useTransactionQueue = create<TransactionQueue>()((set, get) => ({
  transactionQueue: new Queue<BlockTransaction>(),
  isSyncing: false,

  enqueueTransaction: (transaction: BlockTransaction) => {
    const { transactionQueue, processTransaction, isSyncing } = get();
    transactionQueue.enqueue(transaction, (existing, newItem) => {
      if (transactionQueue.length() <= 1) {
        return newItem;
      }

      if (existing?.operations.length != newItem.operations.length) {
        return newItem;
      }

      for (let i = 0; i < existing.operations.length; i++) {
        if (
          !isEqual(existing?.operations[i]?.path, newItem.operations[i]?.path) ||
          existing?.operations[i]?.command !== newItem.operations[i]?.command ||
          existing?.operations[i]?.pointer.id !==
          newItem.operations[i]?.pointer.id
        ) {
          return newItem;
        }
      }

      return existing;
    });

    debouncedProcessTransaction();
    // processTransaction();
  },

  processTransaction: async () => {
    const { transactionQueue, isSyncing, processTransaction } = get();
    if (isSyncing || transactionQueue.isEmpty()) {
      return;
    }

    set({ isSyncing: true });

    try {
      const transaction = transactionQueue.dequeue();

      if (transaction) {
        fetch("/api/saveTransactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify(transaction),
        }).then(function () {
          set({ isSyncing: false });
          if (!transactionQueue.isEmpty()) {
            debouncedProcessTransaction();
          }
        }).catch((err) => {
        });
      }
    } catch (error) {
      console.error("Error syncing shape:", error);
    } 
  },
}));

const debouncedProcessTransaction = debounce(
  useTransactionQueue.getState().processTransaction,
  500
);

export default useTransactionQueue;
