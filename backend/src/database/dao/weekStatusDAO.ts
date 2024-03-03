// Import the db schemas
import { WeekStatusSchema } from "../schema/weekStatus";

// Import the domain classes
import { WeekStatusClass } from "../../domain/weekStatus";
import { WeekStatusCollection, WeekStatus } from "../../domain/types";
import { ErrorClass } from "../../domain/error";
import { SuccessClass } from "../../domain/success";

// Setup the DB connection
import { db } from "../setup";
import { eq, desc } from "drizzle-orm";

// Other imports
import { createWeekID } from "../../domain/types";

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

// Create current week Open Status in DB
export async function createOpenWeekStatus() {
  try {
    const result = await db
      .insert(WeekStatusSchema)
      .values({
        weeklyId: createWeekID(),
        status: WeekStatus.Open,
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

// Create Many(2) week status in DB
export async function createManyWeekStatus(obj: WeekStatusClass[]) {
  const theWeekStatus = obj.map((status) => status.dbIn());

  try {
    const result = await db
      .insert(WeekStatusSchema)
      .values([
        {
          weeklyId: theWeekStatus[0].weeklyId,
          status: theWeekStatus[0].status,
        },
        {
          weeklyId: theWeekStatus[1].weeklyId,
          status: theWeekStatus[1].status,
        },
      ])
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

// Get All Open week status from DB
async function getOpenWeekStatuses() {
  const result = await db
    .select()
    .from(WeekStatusSchema)
    .where(eq(WeekStatusSchema.status, WeekStatus.Open));

  return Array.isArray(result)
    ? result.map((week) =>
        new WeekStatusClass(week.id, week.weeklyId, week.status).dbOut()
      )
    : ErrorClass.new("Error getting week status");
}

// Get one week status by id from DB
export async function getOneWeekStatusByWeeklyId(weeklyId: string) {
  try {
    const result = await db
      .select()
      .from(WeekStatusSchema)
      .where(eq(WeekStatusSchema.weeklyId, weeklyId));

    return Array.isArray(result)
      ? result.map((week) =>
          new WeekStatusClass(week.id, week.weeklyId, week.status).dbOut()
        )
      : ErrorClass.new("Error getting week status");
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

// Get last 5 week status from DB
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

    // Check for the presence of the two most recent weeks in the result
    const hasWeeklyId1 =
      result[0].weeklyId === collection.weeklyIdNext ? true : false;
    const hasWeeklyId2 =
      result[1].weeklyId === collection.weeklyIdCurrent ? true : false;

    const theWeeks: WeekStatusClass[] = [];

    if (hasWeeklyId1 && hasWeeklyId2) {
      return result.map((week) =>
        new WeekStatusClass(week.id, week.weeklyId, week.status).dbOut()
      );
    }

    // Add missing entries to theWeeks
    if (!hasWeeklyId1) {
      const week1 = WeekStatusClass.new(
        collection.weeklyIdNext,
        WeekStatus.Open
      );
      theWeeks.push(week1);
      console.log(`week1`);
      console.log(week1);
    }
    if (!hasWeeklyId2) {
      const week2 = WeekStatusClass.new(
        collection.weeklyIdCurrent,
        WeekStatus.InProgress
      );
      theWeeks.push(week2);
      console.log(`week2`);
      console.log(week2);
    }

    // Save missing entries to the database
    const returnWeek =
      theWeeks.length > 1
        ? await createManyWeekStatus(theWeeks)
        : await createOneWeekStatus(theWeeks[0]);

    if (returnWeek instanceof ErrorClass) {
      return returnWeek;
    }

    // Return the updated week statuses
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

// Update One week status from DB
export async function updateCompleteWeekStatus(weeklyId: string) {
  try {
    const result = await db
      .update(WeekStatusSchema)
      .set({
        status: WeekStatus.Completed,
      })
      .where(eq(WeekStatusSchema.weeklyId, weeklyId))
      .returning();

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error updating week status");
    }

    return SuccessClass.new("Week status updated to completed successfully");
  } catch (error) {
    console.error("Error updating week status in DB", error);
    return ErrorClass.new("Error updating week status");
  }
}

// Maintain Week Status in DB
export async function maintainWeekStatus() {
  try {
    const currentWeeklyId = createWeekID();

    // Get all open week statuses
    const openWeekStatuses = await getOpenWeekStatuses();
    if (openWeekStatuses instanceof ErrorClass) {
      return openWeekStatuses;
    }

    // If no open statuses, create one for the current week
    if (openWeekStatuses.length === 0) {
      return await createOpenWeekStatus();
    }

    // Update statuses for pending weeks
    const pendingWeekStatuses = filterPendingWeekStatuses(
      openWeekStatuses,
      currentWeeklyId
    );
    await updatePendingWeekStatuses(pendingWeekStatuses);

    // Get last week statuses
    const lastWeekStatuses = await getLastWeekStatuses();
    if (lastWeekStatuses instanceof ErrorClass) {
      return lastWeekStatuses;
    }

    return lastWeekStatuses;
  } catch (error) {
    console.error("Error maintaining week status in DB", error);
    return ErrorClass.new("Error maintaining week status in DB");
  }
}

//! Helper functions --------------------------------------------
function filterPendingWeekStatuses(
  weekStatuses: WeekStatusClass[],
  currentWeeklyId: string
): WeekStatusClass[] {
  return weekStatuses
    .filter((week) => week.weeklyId !== currentWeeklyId)
    .map(
      (week) => new WeekStatusClass(week.id, week.weeklyId, WeekStatus.Pending)
    );
}

async function updatePendingWeekStatuses(weekStatuses: WeekStatusClass[]) {
  const updatePromises = weekStatuses.map(async (week) =>
    updateOneWeekStatus(week)
  );

  const updatedWeeks = await Promise.all(updatePromises);
  return updatedWeeks.some((week) => week instanceof ErrorClass)
    ? ErrorClass.new("Error maintaining week status in DB")
    : null;
}

async function getLastWeekStatuses() {
  const collection = WeekStatusClass.collection();
  return await getLastWeekStatus(collection);
}
