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

export const ProductMarkets = ['Carrefour', 'Mercadona', 'Lidl', 'Casa Elías', 'Alcampo', 'Dia'] as const
export const ProductUnits = ['g', 'kg', 'L', 'mL'] as const
export type ProductMarket = typeof ProductMarkets[number]
export type ProductUnit = typeof ProductUnits[number]

export const products = sqliteTable(
  'products',
  {
    id: integer('id').primaryKey(),
    name: text('name', { length: 256 }).notNull(),
    created_by: integer('created_by').notNull().references(() => users.id),
    market: text('market', { enum: ProductMarkets }).notNull().default('Mercadona'),
    price: integer('price').notNull().default(0),
    weight: integer('weight').notNull().default(0),
    unit: text('unit', { enum: ProductUnits }).notNull().default('g'),
    created_at: text('created_at', { length: 30 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (products) => {
    return {
      products_name_market: uniqueIndex('idx_products_name_market').on(products.name, products.market),
    }
  },
)

export const insertProductSchema = createInsertSchema(products)
export const selectProductSchema = createSelectSchema(products)
export const updateProductSchema = insertProductSchema.pick({ market: true, price: true, name: true, unit: true, weight: true }).partial()

export type InsertProduct = z.infer<typeof insertProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
export type Product = z.infer<typeof selectProductSchema>
