import type { validateQuery } from 'h3-typebox'

export type QueryType<T extends Parameters<typeof validateQuery>[1]> = ReturnType<typeof validateQuery<T>>
