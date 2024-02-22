import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { UserSchema } from "./users";

//Todo: Add the correct types
export const AvailabilitySchema: any = sqliteTable("availability", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .unique()
    .notNull()
    .primaryKey(),
  weeklyId: text("weekly_id"),
  userId: text("user_id")
    .notNull()
    .references(() => UserSchema.id),
  day: text("day", {
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  }).notNull(),
  time: text("time", {
    enum: [
      "Available",
      "13",
      "13-17",
      "15",
      "15-17",
      "17",
      "18",
      "(17)18",
      "(17)",
      "(18)",
      "Free",
    ],
  }).notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
