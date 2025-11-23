import { Hono } from 'hono'
import { getDb } from '../config/db'
import { favoritesTable } from '../db/schema'
import { and, eq } from 'drizzle-orm'

const favoritesRouter = new Hono()

favoritesRouter.post('/', async (c) => {
  try {
    const db = getDb(c.env)

    // 获取请求体
    const { userId, recipeId, title, image, cookTime, servings } = await c.req.json()

    // 检查必填字段
    if (!userId || !recipeId || !title) {
      return c.json({ error: 'Missing required fields' }, 400)
    }

    const newFavorites = await db
      .insert(favoritesTable)
      .values({
        userId,
        recipeId,
        title,
        image,
        cookTime,
        servings,
      })
      .returning()

    return c.json(newFavorites[0], 201)
  } catch (error) {
    console.log('Error adding favorite:', error)

    return c.json({ error: 'Internal server error' }, 500)
  }
})

favoritesRouter.delete('/:userId/:recipeId', async (c) => {
  try {
    const db = getDb(c.env)
    const userId = c.req.param('userId')
    const recipeId = c.req.param('recipeId')

    await db
      .delete(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, userId),
          eq(favoritesTable.recipeId, parseInt(recipeId))
        )
      )

    return c.json({ message: 'Favorite deleted successfully' }, 200)
  } catch (error) {
    console.log('Error deleting favorite:', error)

    return c.json({ error: 'Internal server error' }, 500)
  }
})

favoritesRouter.get('/:userId', async (c) => {
  try {
    const db = getDb(c.env)
    const userId = c.req.param('userId')

    const favorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId))

    return c.json(favorites, 200)
  } catch (error) {
    console.log('Error getting favorites:', error)

    return c.json({ error: 'Internal server error' }, 500)
  }
})

export { favoritesRouter }