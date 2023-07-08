import { users } from "~/server/utils/schemas/users.schema";

export default defineEventHandler(async (event) => {
  return db.select().from(users).all();
});
