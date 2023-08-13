import { like } from 'drizzle-orm'
import { useValidatedQuery, z, zh } from 'h3-zod'
import type { QueryType } from '~/server/utils/utils.interface'
import { products } from '~/server/db/schemas/products.schema'
import { db } from '~/server/db/db.drizzle'

const querySchema = z.object({
  created_by_me: zh.boolAsString.optional(),
  limit: zh.numAsString.optional(),
  offset: zh.numAsString.optional(),
  search: z.string().optional(),
})

export type ProductQuery = QueryType<typeof querySchema>

export default defineEventHandler(async (event) => {
  const query = await useValidatedQuery(event, querySchema)

  const qb = db.select({
    id: products.id,
    name: products.name,
    created_at: products.created_at,
  }).from(products)
    .limit(query.limit ?? 20)
    .offset(query.offset ?? 0)

  if (query.search)
    qb.where(like(products.name, query.search))

  return qb.all()
})
