import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const usersTable = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
})

export const favoritesTable = sqliteTable('favorites', {
  id: int('id').primaryKey(),
  userId: text('user_id').notNull(),
  recipeId: int('recipe_id').notNull(),
  title: text('title').notNull(),
  image: text('image'),
  cookTime: text('cook_time'),
  servings: text('servings'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})
