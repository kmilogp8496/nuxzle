export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp()
  if (!(process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered))
    await nuxtApp.$auth.getUserData()

  console.log('running')
})
