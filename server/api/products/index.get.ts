import { like, sql } from 'drizzle-orm'
import { useValidatedQuery, z, zh } from 'h3-zod'
import type { QueryType } from '~/server/utils/utils.interface'
import { products } from '~/server/db/schemas/products/products.schema'
import { useDb } from '~/server/db/db.drizzle'
import { createPaginatedResponse } from '~/server/utils/response'

const querySchema = z.object({
  created_by_me: zh.boolAsString.optional(),
  limit: zh.intAsString.optional(),
  offset: zh.intAsString.optional(),
  search: z.string().optional(),
})

export type ProductQuery = QueryType<typeof querySchema>

export default defineEventHandler(async (event) => {
  const query = await useValidatedQuery(event, querySchema)
  const db = useDb()

  db.select({

  }).from(products)

  const resultsQb = db.select({
    id: products.id,
    name: products.name,
    created_at: products.created_at,
    market: products.market,
    price: products.price,
    weight: products.weight,
    unit: products.unit,
  })
    .from(products)
    .limit(query.limit ?? 20)
    .offset(query.offset ?? 0)

  const totalQb = db.select({ total: sql<number>`count(*)` }).from(products)

  if (query.search) {
    resultsQb.where(like(products.name, query.search))
    totalQb.where(like(products.name, query.search))
  }

  const results = await resultsQb
  const [{ total }] = await totalQb

  return createPaginatedResponse(total, results)
})
