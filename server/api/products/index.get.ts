import { like, sql } from 'drizzle-orm'
import { z } from 'zod'
import { products } from '~/server/db/schemas/products/products.schema'
import { useDb } from '~/server/db/db.drizzle'
import { createPaginatedResponse } from '~/server/utils/response'
import type { QueryType } from '~/server/utils/utils.interface'
import { paginationQuerySchema } from '~/server/utils/query.ts'

const querySchema = z.object({
  created_by_me: z.string().optional().transform(value => value === 'true' ? true : undefined),
  search: z.string().optional(),
}).merge(paginationQuerySchema)

export type ProductQuery = QueryType<typeof querySchema>

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, querySchema.parse)
  const db = useDb()

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
    .limit(query.limit)
    .offset(query.offset)

  const totalQb = db.select({ total: sql<number>`count(*)` }).from(products)

  if (query.search) {
    resultsQb.where(like(products.name, query.search))
    totalQb.where(like(products.name, query.search))
  }

  const results = await resultsQb
  const [{ total }] = await totalQb

  return createPaginatedResponse(total, results)
})
