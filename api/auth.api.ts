import type { InsertUser, UpdateUser } from '~/server/db/schemas/users.schema'

interface LoginData {
  email: string
  password: string
}

export function registerUser(body: Ref<InsertUser>) {
  return apiClient('/api/auth/register', {
    method: 'POST',
    body,
    watch: false,
    immediate: false,
  })
}

export function loginUser(body: Ref<LoginData>) {
  return apiClient('/api/auth/login', {
    method: 'POST',
    body,
    watch: false,
    immediate: false,
  })
}

export function updateUser(body: MaybeRef<UpdateUser>) {
  return apiClient('/api/auth/user-data', {
    method: 'PATCH',
    body,
    watch: false,
    immediate: false,
  })
}
