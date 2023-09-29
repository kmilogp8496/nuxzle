import { and, eq } from 'drizzle-orm'
import jwt from 'jsonwebtoken'
import { useValidatedBody, z } from 'h3-zod'
import { users } from '~/server/db/schemas/users.schema'
import { useDb } from '~/server/db/db.drizzle'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }))

  const user = useDb().select().from(users).where(
    and(
      eq(users.email, body.email),
      eq(users.password, body.password),
    ),
  ).get()

  if (!user) {
    throw createError({
      statusCode: 400,
      message: 'Invalid credentials',
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
