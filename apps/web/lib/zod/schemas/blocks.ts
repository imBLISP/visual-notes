import z from "@/lib/zod"

export const BlocksSchema = z.object({
    id: z.string().describe("The unique ID of the block."),
    type: z.string().describe("The type of the block."),
    properties: z.object({
        text: z.string().optional().describe("The text content of the block."),
        title: z.string().optional().describe("The title of the block."),
    }).describe("The properties of the block."),
    parentId: z.string().optional().describe("The ID of the parent block.")
})