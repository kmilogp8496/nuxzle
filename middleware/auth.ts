export default defineNuxtRouteMiddleware((to) => {
  const nuxtApp = useNuxtApp()
  const authStore = useAuthStore(nuxtApp.$pinia)

  if (!authStore.isLogged)
    return navigateTo({ name: 'auth-login', query: { redirect: to.fullPath } })
})
