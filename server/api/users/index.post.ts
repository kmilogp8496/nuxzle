import { useDb } from '../../db/db.drizzle'
import { users } from '~/server/db/schemas/users.schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return useDb().insert(users).values(body).run()
})
