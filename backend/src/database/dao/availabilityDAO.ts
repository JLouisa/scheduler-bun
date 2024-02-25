// Import the db schemas
import { AvailabilitySchema } from "../schema/availabilities";

// Import the domain classes
import { AvailabilityClass } from "../../domain/availability";
import { ErrorClass } from "../../domain/error";

// Setup the DB connection
import { db } from "../setup";
import { eq } from "drizzle-orm";

// Other imports
import { NIL as NIL_UUID } from "uuid";

// Create availability in DB
export async function createAvailability(obj: AvailabilityClass) {
  const theAvailability = obj.dbIn();
  try {
    const result = await db
      .insert(AvailabilitySchema)
      .values({
        id: theAvailability.id === NIL_UUID ? undefined : theAvailability.id,
        weeklyId: theAvailability.weeklyId,
        userId: theAvailability.userId,
        day: theAvailability.day,
        time: theAvailability.time,
      })
      .onConflictDoUpdate({
        target: AvailabilitySchema.id,
        set: { time: theAvailability.time },
      })
      .returning();

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error creating availability");
    }

    return result.map((availability) =>
      new AvailabilityClass(
        availability.id,
        availability.weeklyId,
        availability.userId,
        availability.day,
        availability.time,
        availability.createdAt
      ).dbOut()
    );
  } catch (error) {
    console.error("Error creating availability", error);
    return ErrorClass.new("Error creating availability");
  }
}

// Get all availabilities from DB
export async function getAllAvailabilities(ID: string) {
  try {
    const result = await db.select().from(AvailabilitySchema);

    if (!Array.isArray(result))
      return ErrorClass.new("Error getting availabilities");

    return result.map((availability) =>
      new AvailabilityClass(
        availability.id,
        availability.weeklyId,
        availability.userId,
        availability.day,
        availability.time,
        availability.createdAt
      ).dbOut()
    );
  } catch (error) {
    console.error("Error getting All availabilities from DB", error);
    return ErrorClass.new("Error getting All availabilities from DB");
  }
}
// Get all week availabilities from DB
export async function getAllWeekAvailabilities(ID: string) {
  try {
    const result = await db
      .select()
      .from(AvailabilitySchema)
      .where(eq(AvailabilitySchema.weeklyId, ID));

    if (!Array.isArray(result)) ErrorClass.new("Error getting availabilities");

    return result.map((availability) =>
      new AvailabilityClass(
        availability.id,
        availability.weeklyId,
        availability.userId,
        availability.day,
        availability.time,
        availability.createdAt
      ).dbOut()
    );
  } catch (error) {
    console.error("Error getting All availabilities from DB", error);
    return ErrorClass.new("Error getting All availabilities");
  }
}
// Get all availabilities from DB
export async function getAllAvailabilitiesS(
  ID: string
): Promise<AvailabilityClass[] | ErrorClass> {
  try {
    const result = await db
      .select()
      .from(AvailabilitySchema)
      .where(eq(AvailabilitySchema.weeklyId, ID));

    if (!Array.isArray(result)) ErrorClass.new("Error getting availabilities");

    return result.map((availability) =>
      new AvailabilityClass(
        availability.id,
        availability.weeklyId,
        availability.userId,
        availability.day,
        availability.time,
        availability.createdAt
      ).dbOut()
    );
  } catch (error) {
    console.error("Error getting All availabilities from DB", error);
    return ErrorClass.new("Error getting All availabilities");
  }
}

// Get one availability from DB
export async function getOneAvailability(
  id: string
): Promise<AvailabilityClass[] | ErrorClass> {
  try {
    const result = await db
      .select()
      .from(AvailabilitySchema)
      .where(eq(AvailabilitySchema.id, id));

    if (!Array.isArray(result)) ErrorClass.new("Error getting availabilities");

    return result.map((availability) =>
      new AvailabilityClass(
        availability.id,
        availability.weeklyId,
        availability.userId,
        availability.day,
        availability.time,
        availability.createdAt
      ).dbOut()
    );
  } catch (error) {
    console.error("Error getting All availabilities from DB", error);
    return ErrorClass.new("Error getting All availabilities");
  }
}

// Update One availability from DB
export async function updateOneAvailability(id: string, time: string) {
  try {
    const result = await db
      .update(AvailabilitySchema)
      .set({
        time: time,
      })
      .where(eq(AvailabilitySchema.id, id))
      .returning();

    if (!Array.isArray(result))
      return ErrorClass.new("Error updating availability");

    //? This is a bug, the result is an array of objects, not a single object
    if (result.length === 0) return [];

    return [
      new AvailabilityClass(
        result[0].id,
        result[0].weeklyId,
        result[0].userId,
        result[0].day,
        result[0].time,
        result[0].createdAt
      ).dbOut(),
    ];
  } catch (error) {
    console.error("Error updating availability in DB", error);
    return ErrorClass.new("Error updating availability");
  }
}

// Delete One availability from DB
//TODO There is a bug in the return type
export async function deleteOneAvailability(id: string) {
  try {
    const result = await db
      .delete(AvailabilitySchema)
      .where(eq(AvailabilitySchema.id, id))
      .returning();

    if (!Array.isArray(result))
      return ErrorClass.new("Error updating availability");

    return result;
  } catch (error) {
    console.error("Error deleting availability in DB", error);
    return ErrorClass.new("Error deleting availability");
  }
}

// Delete One availability from DB
export async function deleteAllAvailability() {
  try {
    const result = await db.delete(AvailabilitySchema);

    if (!Array.isArray(result))
      return ErrorClass.new("Error updating availability");

    return "All availabilities successfully deleted";
  } catch (error) {
    console.error("Error deleting availability in DB", error);
    return ErrorClass.new("Error deleting availabilities");
  }
}
