
import { z } from 'zod'

export const signedupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
})
// type inference in zod
export type SignedupInput = z.infer<typeof signedupInput>

export const signedinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
// type inference in zod
export type SignedinInput = z.infer<typeof signedinInput>

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string()
})
export type CreateBlogInput = z.infer<typeof createBlogInput>

export const updatedBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.number()
})
export type UpdatedBlogInput = z.infer<typeof updatedBlogInput>
