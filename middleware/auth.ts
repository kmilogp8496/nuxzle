export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp()
  if (!nuxtApp.$auth.isLogged.value)
    return abortNavigation()
})
