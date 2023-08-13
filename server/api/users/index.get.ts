import { db } from '../../db/db.drizzle'
import { users } from '../../db/schemas/users.schema'

export default defineEventHandler(async () => {
  return db.select().from(users).all()
})
