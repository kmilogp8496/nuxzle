import { users } from '../../utils/db/schemas/users.schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return db.insert(users).values(body).run()
})
