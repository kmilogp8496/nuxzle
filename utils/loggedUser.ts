import type { TokenUser } from '~/server/utils/jwt'

export function getLoggedUser() {
  return useState<TokenUser | null>('user', () => null)
}
