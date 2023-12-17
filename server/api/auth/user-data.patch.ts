import { eq } from 'drizzle-orm'
import { updateUserSchema, users } from '~/server/db/schemas/users.schema'
import { useDb } from '~/server/db/db.drizzle'
import type { SessionUser } from '~/server/utils/utils.interface'

export default defineEventHandler(async (event) => {
  const userSession = (await requireUserSession(event)).user as SessionUser

  const body = await readValidatedBody(event, updateUserSchema.parse)
  const db = useDb()

  const user = db.select().from(users).where(eq(users.id, userSession.id)).get()

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  const { password, ...userWithoutPassword } = db.update(users).set(body).where(eq(users.id, userSession.id)).returning().get()

  return userWithoutPassword satisfies TokenUser
})
