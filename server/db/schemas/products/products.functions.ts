import { SqliteError } from 'better-sqlite3'
import { db } from '../../db.drizzle'
import type { InsertProduct } from './products.schema'
import { insertProductSchema, products } from './products.schema'

export function insertProduct(product: InsertProduct) {
  if (!insertProductSchema.parse(product)) {
    throw createError({
      statusCode: 400,
      message: 'La información del producto es inválida',
      data: product,
    })
  }

  try {
    return db.insert(products).values(product).returning().run()
  }
  catch (error) {
    if (error instanceof SqliteError) {
      switch (error.code) {
        case 'SQLITE_CONSTRAINT_UNIQUE':
          throw createError({
            statusCode: 400,
            message: 'Ya existe un producto con ese nombre',
          })
        default:
          throw createError({
            statusCode: 500,
            message: 'Ha ocurrido un error al registrar el producto',
          })
      }
    }
  }
}
