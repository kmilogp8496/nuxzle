import { Type, validateBody } from 'h3-typebox'
import { insertProduct } from '~/server/utils/db/schemas/products.schema'

export default defineEventHandler(async (event) => {
  const user = protectRoute(event)
  const body = await validateBody(event, Type.Object({
    name: Type.String(),
  }))

  return insertProduct({
    ...body,
    created_by: user.id,
  })
})
