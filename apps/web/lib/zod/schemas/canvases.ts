import z from "@/lib/zod"

export const CanvasSchema = z.object({
    id: z.string().describe("The unique ID of the workspace."),
    properties: z.object({
        title: z.string().describe("The title of the canvas."),
    }),
    content: z.any().describe("The content of the canvas."),
    parentId: z.string().describe("The parent ID of the canvas."),
})

export interface Canvas extends z.infer<typeof CanvasSchema> {}