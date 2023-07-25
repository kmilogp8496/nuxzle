export default defineNuxtRouteMiddleware(async () => {
  // eslint-disable-next-line n/prefer-global/process
  if (process.server) {
    const nuxtApp = useNuxtApp()
    const authStore = useAuthStore(nuxtApp.$pinia)
    await authStore.getUserData()
  }
})
