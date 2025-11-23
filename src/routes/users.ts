import { Hono } from 'hono'
import { getDb } from '../config/db'
import { usersTable } from '../db/schema'
import { eq } from 'drizzle-orm'

const usersRouter = new Hono()

usersRouter.post('/', async (c) => {
  try {
    const db = getDb(c.env)

    // 获取请求体
    const { name, age, email } = await c.req.json()

    const result = await db
      .insert(usersTable)
      .values({
        name,
        age,
        email,
      })
      .returning()

    // 返回状态 201 和用户数据
    return c.json(
      { message: 'User created successfully', user: result[0] },
      201
    )
  } catch (error) {
    console.log('Failed to create user', error)

    return c.json('Internal Server Error', 500)
  }
})

usersRouter.delete('/:id', async (c) => {
  const db = getDb(c.env)
  const result = await db
    .delete(usersTable)
    .where(eq(usersTable.id, parseInt(c.req.param('id'))))
    .returning()

  return c.json({ message: 'User deleted successfully', user: result[0] }, 200)
})

usersRouter.get('/:id', async (c) => {
  const db = getDb(c.env)

  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, parseInt(c.req.param('id'))))

  return c.json({ message: 'User fetched successfully', user: result[0] }, 200)
})

usersRouter.get('/', async (c) => {
  const db = getDb(c.env)
  const result = await db.select().from(usersTable)
  return c.json({ message: 'Users fetched successfully', users: result }, 200)
})

export { usersRouter }
