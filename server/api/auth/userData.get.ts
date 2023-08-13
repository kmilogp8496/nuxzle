import { eq } from 'drizzle-orm'
import { generateToken } from '~/server/utils/jwt'
import { setAuthCookie } from '~/server/utils/cookie'
import { users } from '~/server/db/schemas/users.schema'
import { db } from '~/server/db/db.drizzle'

export default defineEventHandler(async (event) => {
  const userToken = protectRoute(event)

  const user = db.select().from(users).where(eq(users.id, userToken.id)).get()

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  const { password, ...userWithoutPassword } = user

  const token = generateToken(userWithoutPassword)
  setAuthCookie(event, token)

  return userWithoutPassword
})
