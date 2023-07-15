import { users } from '~/server/utils/schemas/users.schema'

export default defineEventHandler(async () => {
  return db.select().from(users).all()
})
