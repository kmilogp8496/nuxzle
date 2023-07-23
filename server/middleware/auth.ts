import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getCookie(event, config.authCookieName)

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  try {
    const user = jwt.verify(token, config.jwtSecret)

    event.context.user = user
  }
  catch {}
})
