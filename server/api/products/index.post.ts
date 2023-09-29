import { useValidatedBody, z } from 'h3-zod'
import { insertProduct } from '~/server/db/schemas/products/products.functions'

export default defineEventHandler(async (event) => {
  const user = protectRoute(event)
  const body = await useValidatedBody(event, z.object({
    name: z.string(),
    market: z.enum(['Carrefour', 'Mercadona', 'Lidl', 'Casa Elías', 'Alcampo', 'Dia']),
    price: z.number(),
  }))

  return insertProduct({
    ...body,
    created_by: user.id,
    id: undefined,
  })
})
