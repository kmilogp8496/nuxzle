import type { H3Event } from 'h3'
import type { User } from './db/schemas/users.schema'

type LoggedUser = User | null

export function getContextUser(event: H3Event): LoggedUser {
  return event.context.user ?? null
}

export function isLogged(event: H3Event) {
  return !!getContextUser(event)
}

export function protectRoute(event: H3Event) {
  const loggedUser = getContextUser(event)
  if (!loggedUser) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  return loggedUser
}
