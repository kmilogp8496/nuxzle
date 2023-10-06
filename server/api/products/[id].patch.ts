import { eq } from 'drizzle-orm'
import { useValidatedBody, z } from 'h3-zod'
import { productNotFoundError } from './utils'
import { useDb } from '~/server/db/db.drizzle'
import { insertProductSchema, products, updateProductSchema } from '~/server/db/schemas/products/products.schema'

export default defineEventHandler(async (event) => {
  const user = protectRoute(event)
  const body = await readValidatedBody(event, updateProductSchema.parse)

  const id = z.number().min(1).parse(Number(getRouterParam(event, 'id')))

  const db = useDb()

  const [product] = await db.select().from(products)
    .where(eq(products.id, id))
    .where(eq(products.created_by, user.id))

  if (!product)
    return productNotFoundError()

  if (updateProductSchema.parse(body))
    return db.update(products).set(body).where(eq(products.id, id)).returning()
})
