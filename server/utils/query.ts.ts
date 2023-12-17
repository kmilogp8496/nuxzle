import { z } from 'zod'

export const paginationQuerySchema = z.object({
  limit: z.preprocess(Number, z.number()).default(20),
  offset: z.preprocess(Number, z.number()).default(0),
})
