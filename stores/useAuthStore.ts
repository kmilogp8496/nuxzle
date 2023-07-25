import type { TokenUser } from '~/server/utils/jwt'

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

  function logout() {
    loggedUser.value = null
  }

  return {
    user: loggedUser,
    isLogged,
    getUserData,
    logout,
  }
})
