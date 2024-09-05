import z from "@/lib/zod"

export const BlocksSchema = z.object({
    id: z.string().uuid().optional().describe("The unique ID of the block."),
    type: z.string().optional().describe("The type of the block."),
    properties: z.object({
        text: z.string().optional().describe("The text content of the block."),
        title: z.string().optional().describe("The title of the block."),
        x: z.number().optional().describe("The x coordinate of the block."),
        y: z.number().optional().describe("The y coordinate of the block."),
        meta: z.object({
            id: z.string().uuid()
        }).optional().describe("The meta data of the block."),
        type: z.string().optional().describe("The type of the block."),
        index: z.string().optional().describe("The index of the block."),
        props: z.object({
            h: z.number().optional().describe("The height of the block."),
            w: z.number().optional().describe("The width of the block."),
            text: z.string().optional().describe("The text content of the block."),
        }).optional().describe("The props of the block."),
        opacity: z.number().optional().describe("The opacity of the block."),
        isLocked: z.boolean().optional().describe("Whether the block is locked."),
        parentId: z.string().optional().describe("The ID of the parent block."),
        rotation: z.number().optional().describe("The rotation of the block."),
        typeName: z.string().optional().describe("The type name of the block."),
        editorContent: z.any().optional().describe("The editor content of the block."),
    }).optional().describe("The properties of the block."),
    parentId: z.string().uuid().optional().describe("The ID of the parent block."),
    after: z.string().uuid().optional().describe("The ID of the block after."),
})

export const BlockOperationSchema = z.object({
    args: z.any().describe("The args of the block."),
    path: z.array(z.string()).describe("The path of the block."),
    command: z.union([z.literal("update"), z.literal("set"), z.literal("listAfter"), z.literal("listRemove"), z.literal("listBefore"), z.literal("delete")]).describe("The command of the block."),
    pointer: z.object({
        id: z.string().uuid().describe("The ID of the block."),
        table: z.string().describe("The table of the block."),
        workspaceId: z.string().uuid().optional().describe("The ID of the workspace.")
    })
})

export const BlockTransactionSchema = z.object({
    operations: z.array(BlockOperationSchema)
})