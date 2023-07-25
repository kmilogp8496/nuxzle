import type { TokenUser } from '~/server/utils/jwt'

export default defineNuxtPlugin(() => {
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
    provide: {
      auth: {
        user: loggedUser,
        isLogged,
        getUserData,
        logout,
      },
    },
  }
})
