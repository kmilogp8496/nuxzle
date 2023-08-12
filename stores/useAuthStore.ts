import type { TokenUser } from '~/server/utils/jwt'

// Since hydration has some issues yet, the return object must not contain a computed or readonly object.
// The return data must be the same as declared
export const useAuthStore = defineStore('authStore', () => {
  const loggedUser = ref<TokenUser | null>(null)

  async function getUserData() {
    const { data, error } = await apiClient('/api/auth/userData')
    if (error.value)
      loggedUser.value = null

    else if (data.value)
      loggedUser.value = data.value
  }

  const isLogged = computed(() => {
    return !!loggedUser.value
  })

  async function logout() {
    await apiClient('/api/auth/logout')
    loggedUser.value = null
  }

  return {
    user: loggedUser,
    isLogged,
    getUserData,
    logout,
  }
})
