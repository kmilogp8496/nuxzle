import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { useDb } from '~/server/db/db.drizzle'
import { products, updateProductSchema } from '~/server/db/schemas/products/products.schema'
import type { SessionUser } from '~/server/utils/utils.interface'

export default defineEventHandler(async (event) => {
  const userSession = (await requireUserSession(event)).user as SessionUser
  let id: number

  try {
    id = z.number().min(1).parse(Number(getRouterParam(event, 'id')))
  }
  catch {
    throw createError({
      statusCode: 400,
      message: 'Invalid ID',
    })
  }

  const body = await readValidatedBody(event, updateProductSchema.parse)

  const db = useDb()

  const [product] = await db.select().from(products)
    .where(
      and(
        eq(products.id, id),
        eq(products.created_by, userSession.id),
      ),
    )

  if (!product) {
    throw createError({
      statusCode: 404,
      message: 'Product not found',
    })
  }

  if (updateProductSchema.parse(body))
    return db.update(products).set(body).where(eq(products.id, id)).returning()
})
