
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import {verify} from 'hono/jwt'
import { createBlogInput, updatedBlogInput } from '@nicdpacx/blog-common';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId: string
  }
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        msg: "not logged  in"
      });
    }
  } catch(err) {
    c.status(403);
    return c.json({
      msg: "user not logged in"
    })
  }
});

blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Invalid inputs"
    });
  }
  const userId = c.get("userId");
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      }
    })
    return c.json({
      id: blog.id
    })
  } catch(e) {
    return c.text("Invalid inputs");
  }
})

blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const {success} = updatedBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "Invalid inputs"
    });
  }
  const userId = c.get("userId");
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId
      },
      data: {
        title: body.title,
        content:body.content
      }
    });
    return c.json({
      msg: "updated post"
    })
  } catch(e) {
    return c.text("Invalid inputs");
  }
})

blogRouter.get('/bulk', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true
          }
        }
      }
    });
    return c.json({
      blogs
    });
  } catch(err) {
    c.status(403);
    return c.json({
      msg: "user not logged in"
    })
  }
})

blogRouter.get('/:id',async (c) => {
  const id = parseInt(c.req.param("id"));
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id
      },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true
          }
        },
      }
    });
    return c.json({
      blog
    });
  } catch(e) {
    console.error(e);
    c.status(411);
    return c.json({
      message: "Error while fetching blogs"
    });
  }
})

