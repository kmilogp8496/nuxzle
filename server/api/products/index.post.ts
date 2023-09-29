import { useValidatedBody, z } from 'h3-zod'
import { insertProduct } from '~/server/db/schemas/products/products.schema'

export default defineEventHandler(async (event) => {
  const user = protectRoute(event)
  const body = await useValidatedBody(event, z.object({
    name: z.string(),
  }))

  return insertProduct({
    ...body,
    created_by: user.id,
  })
})
