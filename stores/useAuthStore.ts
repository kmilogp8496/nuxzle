import type { SessionUser } from '~/server/utils/utils.interface'

// Since hydration has some issues yet, the return object must not contain a computed or readonly object.
// The return data must be the same as declared
export const useAuthStore = defineStore('authStore', () => {
  const loggedUser = ref<SessionUser | null>(null)

  async function getUserData() {
    const session = useUserSession()
    await session.fetch()

    if (!session.user)
      loggedUser.value = null

    else
      loggedUser.value = session.user.value
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
