import { Hono } from 'hono'
import { PrismaClient } from '../generated/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import {createPostSchema, updatePostSchema} from '../../../common/index'

export const blogRouter = new Hono<{
  Bindings: { DATABASE_URL: string, JWT_SECRET: string },
  Variables: { authorId: string }
}>()

blogRouter.use('/*', async (c, next) => {
  const header = c.req.header("authorization") || ""
  const token = header.split(" ")[1]
  try {
    const verification = await verify(token, c.env.JWT_SECRET, 'HS256')
    if (verification.id) {
      c.set("authorId", verification.id as string)
      await next()
    } else {
      c.status(403)
      return c.json({ error: "authorization failed." })
    }
  } catch (e) {
    c.status(403)
    return c.json({ error: "invalid or expired token." })
  }
})

blogRouter.post('/', async (c) => {
  //@ts-ignore
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
  const body = await c.req.json()
  try {
    const result = createPostSchema.safeParse(body)
    if (!result.success){
      c.status(400)
      return c.json({error: result.error})
    }
    const blog = await prisma.blog.create({
      data: { title: result.data.title, content: result.data.content, published: true, authorId: c.get("authorId") }
    })
    return c.json({ blog })
  } catch (e) {
    c.status(411)
    return c.json({ error: e instanceof Error ? e.message : String(e) })
  }
})

blogRouter.put('/', async (c) => {
  //@ts-ignore
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
  const body = await c.req.json()
  try {
    const result = updatePostSchema.safeParse(body)
    if (!result.success){
      c.status(400)
      return c.json({error: result.error})
    }
    const blog = await prisma.blog.update({ where: { id: result.data.id }, data: { title: result.data.title, content: result.data.content } })
    return c.json({ blog })
  } catch (e) {
    c.status(411)
    return c.json({ error: e instanceof Error ? e.message : String(e) })
  }
})

blogRouter.get('/bulk', async (c) => {
  //@ts-ignore
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
  try {
    const blogs = await prisma.blog.findMany()
    return c.json({ blogs })
  } catch (e) {
    c.status(411)
    return c.json({ error: e instanceof Error ? e.message : String(e) })
  }
})

blogRouter.get('/:id', async (c) => {
  //@ts-ignore
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
  try {
    const blog = await prisma.blog.findFirst({ where: { id: c.req.param('id') } })
    return c.json({ blog })
  } catch (e) {
    c.status(411)
    return c.json({ error: e instanceof Error ? e.message : String(e) })
  }
})
