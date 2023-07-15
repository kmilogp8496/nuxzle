export default defineEventHandler(async () => {
  return db.select().from(products).all()
})
