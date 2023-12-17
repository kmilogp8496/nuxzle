export default defineEventHandler(async (event) => {
  if (!(await getUserSession(event)).user)
    throw createError({ statusCode: 400, message: 'You are not logged in' })

  clearUserSession(event)
  event.node.res.end()
})
