import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { users } from './users.schema'
import { products } from './products/products.schema'

export const userProduct = sqliteTable(
  'userProduct',
  {
    id: integer('id').primaryKey(),
    user_id: integer('user_id').notNull().references(() => users.id),
    product_id: integer('product_id').notNull().references(() => products.id, {
      onDelete: 'cascade',
    }),
    in_stock: integer('in_stock').notNull(),
    desired_amount: integer('desired_amount').notNull(),
    created_at: text('created_at', { length: 256 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (userProduct) => {
    return {
      userIdIndex: uniqueIndex('user_id_idx').on(userProduct.user_id),
      productIdIndex: uniqueIndex('product_id_idx').on(userProduct.product_id),
    }
  },
)

export const insertProductSchema = createInsertSchema(products)

export const selectProductSchema = createSelectSchema(products)

export type UserProduct = z.infer<typeof selectProductSchema>
export type InsertUserProduct = z.infer<typeof insertProductSchema>
