import z from "@/lib/zod";

export const userSchema = z.object({
  id: z.string().uuid().optional().describe("The unique ID of the block.").default(""),
  username: z.string().optional().describe('user name').default(""),
  email: z.string().email().optional().describe('user login mail').default(""),
  password: z.string().optional().describe('user password').default(""),
  avatar: z.string().url().optional().describe('Link to the user avatar').default(""),
})

export type User = z.infer<typeof userSchema>;