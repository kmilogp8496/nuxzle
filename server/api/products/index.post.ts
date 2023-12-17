import { z } from 'zod'
import { insertProduct } from '~/server/db/schemas/products/products.functions'
import { ProductMarkets } from '~/server/db/schemas/products/products.schema'
import type { SessionUser } from '~/server/utils/utils.interface'

export default defineEventHandler(async (event) => {
  const user = (await requireUserSession(event)).user as SessionUser
  const body = await readValidatedBody(event, z.object({
    name: z.string(),
    market: z.enum(ProductMarkets),
    price: z.number(),
  }).parse)

  return insertProduct({
    ...body,
    created_by: user.id,
    id: undefined,
  })
})
