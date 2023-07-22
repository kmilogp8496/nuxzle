import { useFetch } from 'nuxt/app'
import type { InsertUser } from '~/server/utils/schemas/users.schema'

export function registerUser(body: InsertUser) {
  return useFetch('/api/auth/register', {
    method: 'POST',
    body,
    watch: false,
  })
}
