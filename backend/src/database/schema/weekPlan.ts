import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { UserSchema } from "./users";

//Todo: Add the correct types
export const WeekPlanSchema: any = sqliteTable("week_plan", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .unique()
    .notNull()
    .primaryKey(),
  weeklyId: text("weekly_id").notNull(),
  userId: text("user_id")
    .references(() => UserSchema.id)
    .notNull(),
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
});
