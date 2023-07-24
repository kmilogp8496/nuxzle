import type { H3Event } from 'h3'

export function setAuthCookie(event: H3Event, token: string) {
  const config = useRuntimeConfig()
  setCookie(event, config.authCookieName, token, {
    httpOnly: true,
    sameSite: true,
    maxAge: 60 * 60 * 24 * 30,
  })
}
