// Import the db schemas
import { WeekStatusSchema } from "../schema/weekStatus";

// Import the domain classes
import { WeekStatusClass } from "../../domain/weekStatus";
import { ErrorClass } from "../../domain/error";
import { WeekStatusCollection } from "../../domain/types";

// Setup the DB connection
import { db } from "../setup";
import { eq, lt, gte, ne, desc } from "drizzle-orm";

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

    return result.map((week) =>
      new WeekStatusClass(week.id, week.weeklyId, week.status).dbOut()
    );
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

    return result.map((week) =>
      new WeekStatusClass(week.id, week.weeklyId, week.status).dbOut()
    );
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

    if (!Array.isArray(result))
      return ErrorClass.new("Error getting week status");

    return result.map((week) =>
      new WeekStatusClass(week.id, week.weeklyId, week.status).dbOut()
    );
  } catch (error) {
    console.error("Error getting one week status from DB", error);
    return ErrorClass.new("Error getting one week status from DB");
  }
}

// Get last 5 week status
export async function getLastWeekStatus(
  collection: WeekStatusCollection
): Promise<WeekStatusClass[] | ErrorClass> {
  try {
    const result = await db
      .select()
      .from(WeekStatusSchema)
      .orderBy(desc(WeekStatusSchema.weeklyId))
      .limit(5);

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error getting week status");
    }

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

    return returnWeek.map((week) => week.dbOut());
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

    return result.map((week) =>
      new WeekStatusClass(week.id, week.weeklyId, week.status).dbOut()
    );
  } catch (error) {
    console.error("Error updating week status in DB", error);
    return ErrorClass.new("Error updating week status");
  }
}
