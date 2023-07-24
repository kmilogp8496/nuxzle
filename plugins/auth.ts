import type { TokenUser } from 'server/utils/jwt'

export default defineNuxtPlugin(async () => {
  const loggedUser = ref<TokenUser | null>(null)

  async function getUserData() {
    try {
      loggedUser.value = await $fetch<TokenUser>('/api/auth/userData')
    }
    catch (error) {
      loggedUser.value = null
    }
  }

  const isLogged = computed(() => {
    return loggedUser.value !== null
  })

  async function logout() {
    try {
      await $fetch('/api/auth/logout')
      loggedUser.value = null
    }
    catch {}
  }

  await getUserData()

  return {
    provide: {
      auth: {
        user: readonly(loggedUser),
        isLogged,
        getUserData,
        logout,
      },
    },
  }
})
