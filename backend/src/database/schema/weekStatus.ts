import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";
import { UserSchema } from "./users";

//Todo: Add the correct types
export const WeekPlanSchema: any = sqliteTable("weekStatus", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .unique()
    .notNull()
    .primaryKey(),
  weeklyId: text("weekly_id").unique().notNull(),
  status: text("status", {
    enum: ["In Progress", "Pending", "Completed"],
  }).notNull(),
});
