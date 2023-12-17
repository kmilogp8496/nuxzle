import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { useDb } from '~/server/db/db.drizzle'
import { products } from '~/server/db/schemas/products/products.schema'

export default defineEventHandler(async (event) => {
  const userSession = (await requireUserSession(event)).user as SessionUser

  const db = useDb()
  const productId = z.preprocess(Number, z.number().min(1)).parse(getRouterParams(event).id)

  const [product] = await db.select().from(products).where(and(eq(products.id, productId), eq(products.created_by, userSession.id)))
  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Product not found',
    })
  }

  return db.delete(products).where(eq(products.id, product.id))
})
