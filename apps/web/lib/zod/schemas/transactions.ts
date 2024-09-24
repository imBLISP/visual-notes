import { z } from "zod";

export const OperationSchema = z.object({
    args: z.any().describe("The args of the block."),
    path: z.array(z.string()).describe("The path of the block."),
    command: z.union([z.literal("update"), z.literal("set"), z.literal("listAfter"), z.literal("listRemove"), z.literal("listBefore"), z.literal("delete")]).describe("The command of the block."),
    pointer: z.object({
        id: z.string().uuid().describe("The ID of the block."),
        table: z.enum(["blocks", "workspaces"]).describe("The table of the block."),
    })
})

export const TransactionSchema = z.object({
    operations: z.array(OperationSchema)
})

export type Transaction = z.infer<typeof TransactionSchema>;
export type Operation = z.infer<typeof OperationSchema>;