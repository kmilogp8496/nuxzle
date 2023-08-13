import type { useValidatedQuery } from 'h3-zod'

export type QueryType<T extends Parameters<typeof useValidatedQuery>[1]> = Awaited<ReturnType<typeof useValidatedQuery<T>>>
