import jwt from 'jsonwebtoken'
import type { TokenUser } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const req = event.node.req
  const config = useRuntimeConfig()
  const authCookieName = config.authCookieName

  const token = getCookie(event, authCookieName)
  if (token) {
    const user = jwt.verify(token, config.jwtSecret) as TokenUser

    console.info(`${req.method} ${req.url} ${user.email}`)
  }
  else {
    console.info(`${req.method} ${req.url} anonymous`)
  }
})
