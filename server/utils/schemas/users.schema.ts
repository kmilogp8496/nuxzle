import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import type { InferModel } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

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
      emailIndex: uniqueIndex('email_idx').on(users.email),
    }
  },
)

export type User = InferModel<typeof users> // return type when queried
export type InsertUser = InferModel<typeof users, 'insert'> // insert type
