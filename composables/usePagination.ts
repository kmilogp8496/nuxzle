interface PaginationOptions {
  limit?: number
  page?: number
}

export function usePagination(options: PaginationOptions = {}) {
  const defaults: Required<PaginationOptions> = {
    limit: 10,
    page: 1,
  }

  const { limit, page } = toRefs(reactive({ ...defaults, ...options }))

  const offset = computed(() => (page.value - 1) * limit.value)

  return {
    limit,
    offset,
    page,
  }
}
