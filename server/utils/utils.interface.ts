import type { useValidatedQuery } from 'h3-zod'
import type { MaybeRef } from 'vue'

type ValidatedQueryParameters = Parameters<typeof useValidatedQuery>[1]

export type Query<T extends ValidatedQueryParameters> = Awaited<ReturnType<typeof useValidatedQuery<T>>>

export type QueryType<T extends ValidatedQueryParameters, Q = Query<T>> = {
  [K in keyof Q]: MaybeRef<Q[K]>
}
