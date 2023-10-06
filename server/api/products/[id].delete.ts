import { eq } from 'drizzle-orm'
import { productNotFoundError, validateProductId } from './utils'
import { useDb } from '~/server/db/db.drizzle'
import { products } from '~/server/db/schemas/products/products.schema'

export default defineEventHandler(async (event) => {
  const user = protectRoute(event)
  const db = useDb()
  const productId = Number(getRouterParams(event).id)

  validateProductId(event, productId)

  const [product] = await db.select().from(products).where(eq(products.id, productId)).where(eq(products.created_by, user.id))
  if (!product)
    return productNotFoundError(product)

  return db.delete(products).where(eq(products.id, product.id))
})
