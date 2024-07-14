import z from "@/lib/zod"

export const WorkspaceSchema = z.object({
    id: z.string().describe("The unique ID of the workspace."),
    name: z.string().describe("The name of the workspace."),
    logo: z.string().describe("The logo of the workspace."),
})