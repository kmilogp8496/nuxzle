import type { InsertUser } from '~/server/utils/schemas/users.schema'

interface LoginData {
  email: string
  password: string
}

export function registerUser(body: Ref<InsertUser>) {
  return useFetch('/api/auth/register', {
    method: 'POST',
    body,
    watch: false,
    immediate: false,
  })
}

export function loginUser(body: Ref<LoginData>) {
  return useFetch('/api/auth/login', {
    method: 'POST',
    body,
    watch: false,
    immediate: false,
  })
}
