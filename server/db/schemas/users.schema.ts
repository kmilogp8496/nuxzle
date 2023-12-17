import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { SqliteError } from 'better-sqlite3'
import { z } from 'zod'
import { useDb } from '../db.drizzle'
import { ProductMarkets } from './products/products.schema'

export const users = sqliteTable(
  'users',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name', { length: 256 }),
    email: text('email', { length: 256 }).notNull(),
    phone: text('phone', { length: 256 }),
    address: text('address', { length: 256 }),
    default_market: text('default_market', { enum: ProductMarkets }),
    password: text('password', { length: 256 }).notNull(),
    created_at: text('created_at', { length: 256 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (users) => {
    return {
      emailIndex: uniqueIndex('user_email_idx').on(users.email),
    }
  },
)

// Schema for inserting a user - can be used to validate API requests
const insertUserSchema = createInsertSchema(users, {
  password: z.string().min(8),
})
export const updateUserSchema = insertUserSchema.omit({ created_at: true, email: true, id: true, password: true }).partial()

const selectUserSchema = createSelectSchema(users)

export type InsertUser = z.infer<typeof insertUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>
export type User = z.infer<typeof selectUserSchema>

export function insertUser(user: InsertUser) {
  if (!insertUserSchema.parse(user)) {
    throw createError({
      statusCode: 400,
      message: 'La información del usuario es inválida',
      data: user,
    })
  }

  try {
    const createdUser = useDb().insert(users).values(user).returning().get()
    return createdUser
  }
  catch (error) {
    if (error instanceof SqliteError) {
      switch (error.code) {
        case 'SQLITE_CONSTRAINT_UNIQUE':
          throw createError({
            statusCode: 400,
            message: 'El correo electrónico ya está registrado',
          })
        default:
          throw createError({
            statusCode: 500,
            message: 'Ha ocurrido un error al registrar el usuario',
          })
      }
    }
    throw createError({
      statusCode: 500,
    })
  }
}
