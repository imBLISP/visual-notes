import z from "@/lib/zod"

export const BlocksSchema = z.object({
    id: z.string().describe("The unique ID of the block."),
    type: z.string().describe("The type of the block."),
    properties: z.object({
        text: z.string().optional().describe("The text content of the block."),
        title: z.string().optional().describe("The title of the block."),
        x: z.number().optional().describe("The x coordinate of the block."),
        y: z.number().optional().describe("The y coordinate of the block."),
        meta: z.object({}).optional().describe("The meta data of the block."),
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
    }).describe("The properties of the block."),
    parentId: z.string().optional().describe("The ID of the parent block.")
})