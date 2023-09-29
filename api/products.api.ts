import type { ProductQuery } from '~/server/api/products/index.get'
import type { InsertProduct } from '~/server/db/schemas/products/products.schema'

export function getProducts(params?: ProductQuery) {
  return apiClient('/api/products', {
    method: 'GET',
    params,
  })
}

export function createProduct(body: Ref<Omit<InsertProduct, 'created_by'>>) {
  return apiClient('/api/products', {
    method: 'POST',
    body,
    watch: false,
    immediate: false,
  })
}
