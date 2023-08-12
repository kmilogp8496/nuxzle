import { Type, validateBody } from 'h3-typebox'
import { insertUser } from '~/server/utils/db/schemas/users.schema'

export default defineEventHandler(async (event) => {
  const body = await validateBody(event, Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 8 }),
  }), { includeAjvFormats: true })

  return insertUser(body)
})
