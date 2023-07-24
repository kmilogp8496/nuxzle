export default defineEventHandler(async (event) => {
  protectRoute(event)

  const config = useRuntimeConfig()
  setCookie(event, config.authCookieName, '')
  event.node.res.end()
})
