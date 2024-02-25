// Import the db schemas
import { WeekPlanSchema } from "./schema/weekPlan";
import { AdminSchema } from "./schema/admin";
import { WeekStatusSchema } from "./schema/weekStatus";

// Import the domain classes
import { WeekPlanClass } from "../domain/weekPlan";
import { WeekStatusClass } from "../domain/weekStatus";
import { AdminClass } from "../domain/admin";
import { ErrorClass } from "../domain/error";
import { WeekStatusCollection } from "../domain/types";

// Setup the DB connection
import { db } from "./setup";
import { eq, lt, gte, ne, desc } from "drizzle-orm";

//! WeekPlan
// Create WeekPlan in DB
export async function createOneWeek(obj: WeekPlanClass) {
  const theWeek = obj.db();

  try {
    return await db
      .insert(WeekPlanSchema)
      .values({
        weeklyId: theWeek.weeklyId,
        userId: theWeek.userId,
        day: theWeek.day,
        time: theWeek.time,
      })
      .returning();
  } catch (error) {
    console.error("Error getting One availability from DB", error);
  }
}

// Save calculated week plan to DB
export async function createListWeekPlans(weekPlans: WeekPlanClass[]) {
  const promises = weekPlans.map((week) => createOneWeek(week));
  return (await Promise.all(promises)).flat();
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
      ).create()
    );
  } catch (error) {
    console.error("Error getting All week plans from DB", error);
    return ErrorClass.new("Error getting weekPlans");
  }
}

// Get all week plans from DB
export async function getOneWeekPlan(
  id: string
): Promise<WeekPlanClass | ErrorClass> {
  try {
    const result = await db
      .select()
      .from(WeekPlanSchema)
      .where(eq(WeekPlanSchema.id, id));

    if (result.length === 0) {
      return ErrorClass.new("Something went wrong retrieving week plan");
    }

    return new WeekPlanClass(
      result[0].id,
      result[0].weeklyId,
      result[0].userId,
      result[0].day,
      result[0].time
    ).create();
  } catch (error) {
    console.error("Error getting one week plans from DB", error);
    return ErrorClass.new("Error getting one week plans from DB");
  }
}

// Update One week plan from DB
export async function updateWeekPlan(id: string, time: string) {
  return await db
    .update(WeekPlanSchema)
    .set({
      time: time,
    })
    .where(eq(WeekPlanSchema.id, id))
    .returning();
}

// Delete One week plan from DB
export async function deleteOneWeekPlan(id: string) {
  try {
    const result = await db
      .delete(WeekPlanSchema)
      .where(eq(WeekPlanSchema.id, id))
      .returning();

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error deleting week plan from DB");
    }
    if (result.length === 0) {
      return ErrorClass.new("Week plan not found");
    }

    return result;
  } catch (error) {
    console.error("Error deleting week plan from DB", error);
    return ErrorClass.new("Error deleting week plan from DB").toStr();
  }
}

// Delete All week plan from DB
export async function deleteAllWeekPlan() {
  return await db.delete(WeekPlanSchema);
}

//! Login
export async function login(body: AdminClass) {
  try {
    const user = await db
      .select()
      .from(AdminSchema)
      .where(eq(AdminSchema.email, body.email));

    if (user.length === 0) {
      return ErrorClass.new("Email or password is incorrect");
    }

    if (!user[0].active) {
      return ErrorClass.new("User is not active");
    }

    if (user[0].password !== body.password) {
      return ErrorClass.new("Email or password is incorrect");
    }

    return new AdminClass(
      user[0].id,
      user[0].firstName,
      user[0].lastName,
      user[0].email,
      user[0].password,
      user[0].active
    ).create();
  } catch (error) {
    console.error("Error logging in user from DB", error);
    return ErrorClass.new("Error logging in user from DB");
  }
}

//! WeekStatus
// Create One week status in DB
export async function createOneWeekStatus(obj: WeekStatusClass) {
  const theWeekStatus = obj.dbIn();

  try {
    const result = await getOneWeekStatusByWeeklyId(theWeekStatus.weeklyId);

    if (result instanceof ErrorClass) {
      return result;
    }

    if (result instanceof WeekStatusClass) {
      return result;
    }

    if (result.length === 0) {
      // Do nothing, continue to create
    }
  } catch (error) {
    console.error("Error creating week status in DB", error);
    return ErrorClass.new("Error creating week status in DB");
  }

  try {
    const result = await db
      .insert(WeekStatusSchema)
      .values({
        weeklyId: theWeekStatus.weeklyId,
        status: theWeekStatus.status,
      })
      .returning();

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error creating week status in DB");
    }

    if (result.length === 0) {
      return ErrorClass.new("Something went wrong creating week status in DB");
    }

    return new WeekStatusClass(
      result[0].id,
      result[0].weeklyId,
      result[0].status
    ).dbOut();
  } catch (error) {
    console.error("Error creating week status in DB", error);
    return ErrorClass.new("Error creating week status in DB");
  }
}

// Get one week status by id from DB
export async function getOneWeekStatusByWeeklyId(weeklyId: string) {
  try {
    const result = await db
      .select()
      .from(WeekStatusSchema)
      .where(eq(WeekStatusSchema.weeklyId, weeklyId));

    if (result.length === 0) {
      return [];
    }

    return new WeekStatusClass(
      result[0].id,
      result[0].weeklyId,
      result[0].status
    ).dbOut();
  } catch (error) {
    console.error("Error getting one week status from DB", error);
    return ErrorClass.new("Error getting one week status from DB");
  }
}

// Get one week status by id from DB
export async function getOneWeekStatus(id: string) {
  try {
    const result = await db
      .select()
      .from(WeekStatusSchema)
      .where(eq(WeekStatusSchema.id, id));

    if (result.length === 0) {
      return [];
    }

    return new WeekStatusClass(
      result[0].id,
      result[0].weeklyId,
      result[0].status
    ).dbOut();
  } catch (error) {
    console.error("Error getting one week status from DB", error);
    return ErrorClass.new("Error getting one week status from DB");
  }
}

// Get last 5 week status
export async function getLastWeekStatus(collection: WeekStatusCollection) {
  try {
    const result = await db
      .select()
      .from(WeekStatusSchema)
      .orderBy(desc(WeekStatusSchema.weeklyId))
      .limit(5);

    if (result.length === 0) {
      return [];
    }
    console.log(result[0].weeklyId, collection.weeklyId1);
    if (result[0].weeklyId === collection.weeklyId1) {
      return result.map((week) =>
        new WeekStatusClass(week.id, week.weeklyId, week.status).dbOut()
      );
    }

    const newWeek = WeekStatusClass.new(collection.weeklyId1, "In Progress");
    const returnWeek = await createOneWeekStatus(newWeek);

    if (returnWeek instanceof ErrorClass) {
      return returnWeek;
    }

    return [returnWeek];
  } catch (error) {
    console.error("Error getting last week status from DB", error);
    return ErrorClass.new("Error getting last week status from DB");
  }
}

// Update One week status from DB
export async function updateOneWeekStatus(obj: WeekStatusClass) {
  const theWeekStatus = obj.dbIn();

  try {
    const result = await db
      .update(WeekStatusSchema)
      .set({
        status: theWeekStatus.status,
      })
      .where(
        eq(WeekStatusSchema.id, theWeekStatus.id) &&
          eq(WeekStatusSchema.weeklyId, theWeekStatus.weeklyId)
      )
      .returning();

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error updating week status");
    }

    if (result.length === 0) {
      return [];
    }

    return new WeekStatusClass(
      result[0].id,
      result[0].weeklyId,
      result[0].status
    ).dbOut();
  } catch (error) {
    console.error("Error updating week status in DB", error);
    return ErrorClass.new("Error updating week status");
  }
}
