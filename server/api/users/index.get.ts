import { useDb } from '../../db/db.drizzle'
import { users } from '../../db/schemas/users.schema'

export default defineEventHandler(async () => {
  return useDb().select().from(users).all()
})
