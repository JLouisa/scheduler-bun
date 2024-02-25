// Import the db schemas
import { WeekPlanSchema } from "../schema/weekPlan";

// Import the domain classes
import { WeekPlanClass } from "../../domain/weekPlan";
import { ErrorClass } from "../../domain/error";

// Setup the DB connection
import { db } from "../setup";
import { eq } from "drizzle-orm";

// Other imports
import { NIL as NIL_UUID } from "uuid";

//! WeekPlan

// Get all week plans from DB
export async function getOneWeekPlan(
  id: string
): Promise<WeekPlanClass[] | ErrorClass> {
  try {
    const result = await db
      .select()
      .from(WeekPlanSchema)
      .where(eq(WeekPlanSchema.id, id));

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error getting one week plans from DB");
    }

    return result.map((week) =>
      new WeekPlanClass(
        week.id,
        week.weeklyId,
        week.userId,
        week.day,
        week.time
      ).dbOut()
    );
  } catch (error) {
    console.error("Error getting one week plans from DB", error);
    return ErrorClass.new("Error getting one week plans from DB");
  }
}

// Get all week plans from DB
export async function getAllWeekPlan(id: string) {
  try {
    const result = await db
      .select()
      .from(WeekPlanSchema)
      .where(eq(WeekPlanSchema.weeklyId, id));

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error getting weekPlans");
    }

    return result.map((week) =>
      new WeekPlanClass(
        week.id,
        week.weeklyId,
        week.userId,
        week.day,
        week.time
      ).dbOut()
    );
  } catch (error) {
    console.error("Error getting All week plans from DB", error);
    return ErrorClass.new("Error getting weekPlans");
  }
}

// Create WeekPlan in DB
export async function createOneWeek(obj: WeekPlanClass) {
  const theWeek = obj.dbIn();

  try {
    const result = await db
      .insert(WeekPlanSchema)
      .values({
        id: theWeek.id === NIL_UUID ? undefined : theWeek.id,
        weeklyId: theWeek.weeklyId,
        userId: theWeek.userId,
        day: theWeek.day,
        time: theWeek.time,
      })
      .onConflictDoUpdate({
        target: WeekPlanSchema.id,
        set: { time: theWeek.time },
      })
      .returning();

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error creating week plan in DB");
    }

    return result.map((week) =>
      new WeekPlanClass(
        week.id,
        week.weeklyId,
        week.userId,
        week.day,
        week.time
      ).dbOut()
    );
  } catch (error) {
    console.error("Error getting One availability from DB", error);
    return ErrorClass.new("Error getting One availability from DB");
  }
}

// Save calculated week plan to DB
export async function createListWeekPlans(weekPlans: WeekPlanClass[]) {
  const promises = weekPlans.map((week) => createOneWeek(week));
  return (await Promise.all(promises)).flat();
}

// Update One week plan from DB
export async function updateWeekPlan(id: string, time: string) {
  try {
    const result = await db
      .update(WeekPlanSchema)
      .set({
        time: time,
      })
      .where(eq(WeekPlanSchema.id, id))
      .returning();

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error updating week plan in DB");
    }

    return result.map((week) =>
      new WeekPlanClass(
        week.id,
        week.weeklyId,
        week.userId,
        week.day,
        week.time
      ).dbOut()
    );
  } catch (error) {
    console.error("Error updating week plan in DB", error);
    return ErrorClass.new("Error updating week plan in DB");
  }
}

// Delete One week plan from DB
export async function deleteOneWeekPlan(
  id: string
): Promise<WeekPlanClass[] | ErrorClass> {
  try {
    const result = await db
      .delete(WeekPlanSchema)
      .where(eq(WeekPlanSchema.id, id))
      .returning();

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error deleting week plan from DB");
    }

    return result.map((week) =>
      new WeekPlanClass(
        week.id,
        week.weeklyId,
        week.userId,
        week.day,
        week.time
      ).dbOut()
    );
  } catch (error) {
    console.error("Error deleting week plan from DB", error);
    return ErrorClass.new("Error deleting week plan from DB");
  }
}

// Delete All week plan from DB
export async function deleteAllWeekPlan() {
  return await db.delete(WeekPlanSchema);
}
