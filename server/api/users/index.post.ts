import { users } from '~/server/utils/schemas/users.schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return db.insert(users).values(body).run()
})
