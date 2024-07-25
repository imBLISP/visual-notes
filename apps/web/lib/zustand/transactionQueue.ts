"use client"

import { create } from "zustand";
import { Block, BlockTransaction } from "@/lib/types";
import { Queue } from "@repo/utils";
import { useDebouncedCallback } from "use-debounce";

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
    const { transactionQueue, processTransaction } = get();
    transactionQueue.enqueue(transaction, (existing, newItem) =>
      newItem
      // !existing || existing.block.id === newItem.block.id ? newItem : existing
    );

    processTransaction();
  },

  processTransaction: async () => {
    const { transactionQueue, isSyncing, processTransaction} = get();
    if (isSyncing || transactionQueue.isEmpty()) return;

    set({ isSyncing: true });

    try {
      const transaction = transactionQueue.dequeue();
      console.log("processSyncQueue", transaction);

      if (transaction) {
        fetch("/api/saveTransactions", {
          method: "POST",
          body: JSON.stringify(transaction)
        }).catch((err) => {
          console.log(err);
        });
      }
    } catch (error) {
      console.error("Error syncing shape:", error);
      // Optionally, re-enqueue failed sync task
    } finally {
      set({ isSyncing: false });
      if (!transactionQueue.isEmpty()) {
        processTransaction();
      }
    }
  },
}));

export default useTransactionQueue;
