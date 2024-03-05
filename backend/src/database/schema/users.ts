import { sql, InferSelectModel, InferInsertModel } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

//Todo: Add the correct types
export const UserSchema: any = sqliteTable("users", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .unique()
    .notNull()
    .primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  employeeId: integer("employee_id").unique().notNull(),
  vast: integer("vast", { mode: "boolean" }).default(false).notNull(),
  admin: integer("admin", { mode: "boolean" }).default(false).notNull(),
  active: integer("active", { mode: "boolean" }).default(true).notNull(),
  minDays: integer("min_days").notNull(),
  maxDays: integer("max_days").notNull(),
  primaryRole: text("primary_role", {
    enum: [
      "Griller",
      "Kitchen",
      "Bar",
      "Service",
      "Management",
      "Dishwasher",
      "None",
      "All",
    ],
  }).notNull(),
  secondaryRole: text("secondary_role", {
    enum: [
      "Griller",
      "Kitchen",
      "Bar",
      "Service",
      "Management",
      "Dishwasher",
      "None",
      "All",
    ],
  }).notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type UserSchemaT = InferSelectModel<typeof UserSchema>;
export type InsertUserSchemaT = InferInsertModel<typeof UserSchema>;
