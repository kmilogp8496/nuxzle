import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,

} from 'drizzle-orm/sqlite-core'
import type { InferModel } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { users } from './users.schema'

export const products = sqliteTable(
  'products',
  {
    id: integer('id').primaryKey(),
    name: text('name', { length: 256 }),
    created_by: integer('created_by').notNull().references(() => users.id),
    created_at: text('created_at', { length: 30 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (products) => {
    return {
      nameIndex: uniqueIndex('name_idx').on(products.name),
    }
  },
)

export type Product = InferModel<typeof products>
export type InsertProduct = InferModel<typeof products, 'insert'>
