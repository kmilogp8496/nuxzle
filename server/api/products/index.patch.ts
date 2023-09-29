import { eq } from 'drizzle-orm'
import { useValidatedBody, z } from 'h3-zod'
import { useDb } from '~/server/db/db.drizzle'
import { insertProduct } from '~/server/db/schemas/products/products.functions'
import { products } from '~/server/db/schemas/products/products.schema'

export default defineEventHandler(async (event) => {
  const user = protectRoute(event)
  const body = await useValidatedBody(event, z.object({
    id: z.number(),
    name: z.string(),
    market: z.enum(['Carrefour', 'Mercadona', 'Lidl', 'Casa Elías', 'Alcampo', 'Dia']),
    price: z.number(),
  }))

  const db = useDb()

  const [product] = await db.select().from(products)
    .where(eq(products.id, body.id))
    .where(eq(products.created_by, user.id))

  if (!product) {
    return sendError(event, createError({
      statusCode: 404,
      message: 'Product not found',
    }))
  }

  return insertProduct({
    ...body,
    created_by: user.id,
  })
})
