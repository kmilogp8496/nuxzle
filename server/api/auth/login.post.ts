import { Type, validateBody } from 'h3-typebox'
import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await validateBody(event, Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 8 }),
  }), { includeAjvFormats: true })

  const user = db.select().from(users).where(
    and(
      eq(users.email, body.email),
      eq(users.password, body.password),
    ),
  ).get()

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid credentials',
    })
  }

  return user
})
