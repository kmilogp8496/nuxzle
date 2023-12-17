import type { MaybeRef } from 'vue'
import type { ZodObject, ZodRawShape } from 'zod'
import type { User } from '../db/schemas/users.schema'

export type MaybePromise<T> = T | Promise<T>

export type MaybeRefObject<T> = {
  [K in keyof T]: MaybeRef<T[K]>
}

export type QueryType<T extends ZodObject<ZodRawShape>> = Partial<MaybeRefObject<ReturnType<T['parse']>>>

export type SessionUser = Omit<User, 'password'>
