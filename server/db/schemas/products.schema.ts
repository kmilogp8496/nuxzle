import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { db } from '../db.drizzle'
import { users } from './users.schema'

export const products = sqliteTable(
  'products',
  {
    id: integer('id').primaryKey(),
    name: text('name', { length: 256 }).notNull(),
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

const insertProductSchema = createInsertSchema(products)

const selectProductSchema = createSelectSchema(products)

export type InsertProduct = z.infer<typeof insertProductSchema>
export type Product = z.infer<typeof selectProductSchema>

export function insertProduct(product: InsertProduct) {
  if (!insertProductSchema.parse(product)) {
    throw createError({
      statusCode: 400,
      message: 'La información del producto es inválida',
      data: product,
    })
  }

  return db.insert(products).values(product).returning().run()
}
