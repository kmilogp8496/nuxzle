import { eq } from 'drizzle-orm'
import { generateToken } from '../../utils/jwt'
import { setAuthCookie } from '../../utils/cookie'
import { users } from '../../utils/db/schemas/users.schema'

export default defineEventHandler(async (event) => {
  const userToken = protectRoute(event)

  const user = db.select().from(users).where(eq(users.id, userToken.id)).get()

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  const { password, ...userWithoutPassword } = user

  const token = generateToken(userWithoutPassword)
  setAuthCookie(event, token)

  return userWithoutPassword
})
