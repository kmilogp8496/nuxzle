const defaults = {
  limit: 20,
  page: 1,
}

export function usePagination(options?: Partial<typeof defaults>) {
  const { limit, page } = toRefs(reactive(
    Object.assign({}, defaults, options),
  ))

  const offset = computed(() => (page.value - 1) * limit.value)

  return {
    limit,
    offset,
    page,
  }
}
