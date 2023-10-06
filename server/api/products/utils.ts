export function productNotFoundError() {
  return createError({
    statusCode: 404,
    message: 'Producto no encontrado',
  })
}

export function validateProductId(id: number) {
  const productId = id
  if (!productId) {
    throw createError({
      statusCode: 400,
      message: `Invalid product id: ${id}`,
    })
  }

  return productId
}
