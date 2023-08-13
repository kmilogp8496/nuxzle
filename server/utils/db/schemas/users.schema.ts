import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'
import { SqliteError } from 'better-sqlite3'

export const users = sqliteTable(
  'users',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name', { length: 256 }),
    email: text('email', { length: 256 }).notNull(),
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
  password: Type.String({ minLength: 8 }),
})

const selectUserSchema = createSelectSchema(users)

export type InsertUser = Static<typeof insertUserSchema>
export type User = Static<typeof selectUserSchema>

export function insertUser(user: InsertUser) {
  if (!Value.Check(insertUserSchema, user)) {
    throw createError({
      statusCode: 400,
      message: 'La información del usuario es inválida',
      data: user,
    })
  }

  try {
    const createdUser = db.insert(users).values(user).returning().get()
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
