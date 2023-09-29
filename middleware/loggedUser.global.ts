export default defineNuxtRouteMiddleware(async () => {
  if (process.server) {
    const nuxtApp = useNuxtApp()
    const authStore = useAuthStore(nuxtApp.$pinia)
    await authStore.getUserData()
  }
})
