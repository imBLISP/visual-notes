import z from "@/lib/zod";

export const userSchema = z.object({
  email: z.string().email().optional().describe('user login mail').default(""),
  password: z.string().min(6).optional().describe('user password').default("")
})

export type User = z.infer<typeof userSchema>;