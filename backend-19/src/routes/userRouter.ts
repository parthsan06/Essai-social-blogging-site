import { Hono } from 'hono'
import { PrismaClient } from '../generated/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import {signupSchema, signinSchema} from '../../../frontend/src/types/index'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', async (c) => {
  //@ts-ignore
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())

  const body = await c.req.json()
  try {
    const result = signupSchema.safeParse(body)
    if (!result.success){
      c.status(400)
      return c.json({error: result.error})
    }
    const user = await prisma.user.create({
      data: { username: result.data.username, password: result.data.password },
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ token })
  } catch (e) {
    console.error('SIGNUP ERROR:', e)
    c.status(403)
    return c.json({ error: e instanceof Error ? e.message : String(e) })
  }
})

userRouter.post('/signin', async (c) => {
  //@ts-ignore
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())

  const body = await c.req.json()
  try {
    const result = signupSchema.safeParse(body)
    if (!result.success){
      c.status(400)
      return c.json({error: result.error})
    }
    const user = await prisma.user.findUnique({ where: { username: result.data.username } })
    if (!user || user.password !== result.data.password) {
      c.status(403)
      return c.json({ error: 'invalid credentials.' })
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ token })
  } catch (e) {
    console.error('SIGNIN ERROR:', e)
    c.status(403)
    return c.json({ error: e instanceof Error ? e.message : String(e) })
  }
})
