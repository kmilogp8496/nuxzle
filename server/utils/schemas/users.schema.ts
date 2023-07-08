import {
  sqliteTable,
  integer,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { sql, InferModel } from "drizzle-orm";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    name: text("name", { length: 256 }),
    email: text("email", { length: 256 }).notNull(),
    created_at: text("created_at", { length: 256 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (users) => {
    return {
      emailIndex: uniqueIndex("name_idx").on(users.email),
    };
  }
);

export type User = InferModel<typeof users>; // return type when queried
export type InsertUser = InferModel<typeof users, "insert">; // insert type
