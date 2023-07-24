import { users } from '../../utils/db/schemas/users.schema'

export default defineEventHandler(async () => {
  return db.select().from(users).all()
})
