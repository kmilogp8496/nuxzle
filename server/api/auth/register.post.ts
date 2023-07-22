import { Type, validateBody } from 'h3-typebox'
import type { InsertUser, User } from '../../utils/schemas/users.schema'

export default defineEventHandler(async (event) => {
  const body: InsertUser = await validateBody(event, Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 8 }),
  }), { includeAjvFormats: true })

  const user: User = db.insert(users).values(body).returning().get()

  return user
})
