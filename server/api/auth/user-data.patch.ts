import { eq } from 'drizzle-orm'
import { updateUserSchema, users } from '~/server/db/schemas/users.schema'
import { useDb } from '~/server/db/db.drizzle'

export default defineEventHandler(async (event) => {
  const userToken = protectRoute(event)

  const body = await readValidatedBody(event, updateUserSchema.parse)
  const db = useDb()

  const user = db.select().from(users).where(eq(users.id, userToken.id)).get()

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  const { password, ...userWithoutPassword } = db.update(users).set(body).where(eq(users.id, userToken.id)).returning().get()

  return userWithoutPassword satisfies TokenUser
})
