import { useValidatedBody, z } from 'h3-zod'
import { insertUser } from '~/server/db/schemas/users.schema'

export default defineEventHandler(async (event) => {
  const body = await useValidatedBody(event, z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }))

  return insertUser(body)
})
