import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, config.authCookieName)

  if (token) {
    try {
      const user = jwt.verify(token, config.jwtSecret)

      event.context.user = user
    }
    catch {}
  }
})
