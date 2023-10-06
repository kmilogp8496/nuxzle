import type { ProductQuery } from '~/server/api/products/index.get'
import type { InsertProduct } from '~/server/db/schemas/products/products.schema'

export function getProducts(params?: ProductQuery) {
  return apiClient('/api/products', {
    method: 'GET',
    params,
  })
}

export type CreateProduct = Ref<Omit<InsertProduct, 'created_by' | 'id'>>
export type EditProduct = Ref<InsertProduct>

export function createProduct(body: CreateProduct) {
  return apiClient('/api/products', {
    method: 'POST',
    body,
    watch: false,
    immediate: false,
  })
}

export function editProduct(body: EditProduct) {
  return apiClient(`/api/products/${body.value.id}`, {
    method: 'PATCH',
    body,
    watch: false,
    immediate: false,
  })
}

export function deleteProduct(productId: number) {
  return apiClient(`/api/products/${productId}`, {
    method: 'DELETE',
    watch: false,
    immediate: false,
  })
}
