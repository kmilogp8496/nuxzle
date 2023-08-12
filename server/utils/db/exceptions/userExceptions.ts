export class CreateUserException extends Error {
  constructor(message: string) {
    super(`User could not be created. ${message}`)
    this.name = 'CreateUserError'
  }
}
