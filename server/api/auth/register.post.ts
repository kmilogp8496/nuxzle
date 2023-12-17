import { z } from 'zod'
import { insertUser } from '~/server/db/schemas/users.schema'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }).parse)

  return insertUser(body)
})
