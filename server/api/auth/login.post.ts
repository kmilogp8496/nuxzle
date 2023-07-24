import { Type, validateBody } from 'h3-typebox'
import { and, eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { users } from '../../utils/db/schemas/users.schema'

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

  const { password, ...userWithoutPassword } = user

  const config = useRuntimeConfig()
  const token = jwt.sign(userWithoutPassword, config.jwtSecret)

  setCookie(event, config.authCookieName, token, {
    httpOnly: true,
    sameSite: true,
    maxAge: 60 * 60 * 24 * 30,
  })

  return userWithoutPassword
})
