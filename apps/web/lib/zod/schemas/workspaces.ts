import z from "@/lib/zod"

export const WorkspaceSchema = z.object({
    id: z.string().describe("The unique ID of the workspace."),
    name: z.string().describe("The name of the workspace."),
    logo: z.string().optional().describe("The logo of the workspace."),
    active: z.boolean().optional().describe("The active status of the workspace."),
    content: z.array(z.string().uuid()).optional().describe("The content of the workspace as an array of UUIDs."),
})

export type Workspace = z.infer<typeof WorkspaceSchema>;