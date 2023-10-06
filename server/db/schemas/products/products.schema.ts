import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { users } from '../users.schema'

export const products = sqliteTable(
  'products',
  {
    id: integer('id').primaryKey(),
    name: text('name', { length: 256 }).notNull(),
    created_by: integer('created_by').notNull().references(() => users.id),
    market: text('market', { enum: ['Carrefour', 'Mercadona', 'Lidl', 'Casa Elías', 'Alcampo', 'Dia'] }).notNull().default('Mercadona'),
    price: integer('price').notNull().default(0),
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

export const insertProductSchema = createInsertSchema(products)
export const selectProductSchema = createSelectSchema(products)
export const updateProductSchema = insertProductSchema.pick({ market: true, price: true, name: true }).partial()

export type InsertProduct = z.infer<typeof insertProductSchema>
export type Product = z.infer<typeof selectProductSchema>
