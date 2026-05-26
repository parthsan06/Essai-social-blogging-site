import { z } from 'zod'

export const signupSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase character" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase character" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
})

export const signinSchema = z.object({
  username: z.string(),
  password: z.string()
})

export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(10)
})

export const updatePostSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string().min(10)
})

export type SignupInput = z.infer<typeof signupSchema>
export type SigninInput = z.infer<typeof signinSchema>
export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>