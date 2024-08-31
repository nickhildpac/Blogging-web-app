
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import {sign} from 'hono/jwt'
import { signedinInput,signedupInput } from '@nicdpacx/blog-common';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();


userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signedupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "inputs not correct"
    });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      }
    });
    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({
      jwt: token
    });
  } catch(e) {
    console.error(e);
    return c.text("Invalid");
  }
})

userRouter.post('/signin', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signedinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "invalid inputs"
    })
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  });
  
  if (!user) {
    c.status(403);
    return c.json({error: "user not found"});
  }
  const jwt = await sign({id: user.id}, c.env.JWT_SECRET)

  return c.json({jwt});
})


