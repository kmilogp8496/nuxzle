export function createPaginatedResponse(total: number, results: unknown[]) {
  return {
    total,
    results,
  }
}
