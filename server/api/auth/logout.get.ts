export default defineEventHandler(async (event) => {
  if (!isLogged(event))
    return createError({ statusCode: 400, message: 'You are not logged in' })

  const config = useRuntimeConfig()
  setCookie(event, config.authCookieName, '')
  event.node.res.end()
})
