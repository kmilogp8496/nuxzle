import { like } from 'drizzle-orm'
import { Type, validateQuery } from 'h3-typebox'
import type { QueryType } from '../../utils/utils.interface'
import { products } from '~/server/utils/db/schemas/products.schema'

const querySchema = Type.Object({
  created_by_me: Type.ReadonlyOptional(Type.Boolean()),
  limit: Type.ReadonlyOptional(Type.Integer({ minimum: 1, maximum: 100 })),
  offset: Type.ReadonlyOptional(Type.Integer({ minimum: 1 })),
  search: Type.ReadonlyOptional(Type.String()),
})

export type ProductQuery = QueryType<typeof querySchema>

export default defineEventHandler(async (event) => {
  const query = validateQuery(event, querySchema)

  const qb = db.select({
    id: products.id,
    name: products.name,
    created_at: products.created_at,
  }).from(products)
    .limit(Number(query.limit) ?? 20)
    .offset(Number(query.offset) ?? 0)

  if (query.search)
    qb.where(like(products.name, query.search))

  return qb.all()
})
