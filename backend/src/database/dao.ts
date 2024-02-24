// Import the db schemas
import { UserSchema } from "./schema/users";
import { WeekPlanSchema } from "./schema/weekPlan";
import { AvailabilitySchema } from "./schema/availabilities";

// Import the domain classes
import { UserClass } from "../domain/user";
import { WeekPlanClass } from "../domain/weekPlan";
import { AvailabilityClass } from "../domain/availability";

// Setup the DB connection
import { db } from "./setup";
import { eq, lt, gte, ne, desc } from "drizzle-orm";
import { AdminSchema } from "./schema/admin";
import { AdminClass } from "../domain/admin";
import { ErrorClass } from "../domain/error";

//! Users
// Create One user in DB
export async function createOneUser(
  obj: UserClass
): Promise<UserClass | ErrorClass> {
  const theUser = obj.db();

  try {
    const newUser = await db
      .insert(UserSchema)
      .values({
        firstName: theUser.firstName.toLowerCase(),
        lastName: theUser.lastName.toLowerCase(),
        employeeId: theUser.employeeId,
        vast: theUser.vast,
        admin: theUser.admin,
        active: theUser.active,
        minDays: theUser.minDays,
        maxDays: theUser.maxDays,
        primaryRole: theUser.primaryRole,
        secondaryRole: theUser.secondaryRole,
      })
      .returning();

    if (!Array.isArray(newUser)) {
      return ErrorClass.new("Error creating a new user in DB");
    }

    if (newUser.length === 0) {
      return ErrorClass.new("Something went wrong creating a new user in DB");
    }

    return new UserClass(
      newUser[0].id,
      newUser[0].firstName,
      newUser[0].lastName,
      newUser[0].employeeId,
      newUser[0].vast,
      newUser[0].admin,
      newUser[0].active,
      newUser[0].minDays,
      newUser[0].maxDays,
      newUser[0].primaryRole,
      newUser[0].secondaryRole
    ).create();
  } catch (error) {
    console.error("Error creating one user in DB", error);
    return ErrorClass.new("Technical Error in creating user in DB");
  }
}
// Get all users from DB
export async function getAllUsers() {
  try {
    const result = await db
      .select()
      .from(UserSchema)
      .orderBy(desc(UserSchema.createdAt));

    if (result.length === 0) {
      return [];
    }

    return result.map(
      (user) =>
        new UserClass(
          user.id,
          user.firstName,
          user.lastName,
          user.employeeId,
          user.vast,
          user.admin,
          user.active,
          user.minDays,
          user.maxDays,
          user.primaryRole,
          user.secondaryRole
        )
    );
  } catch (error) {
    console.error("Error getting All users from DB", error);
    return [];
  }
}
// Get one user from DB
export async function getOneUser(id: string) {
  try {
    const result = await db
      .select()
      .from(UserSchema)
      .where(eq(UserSchema.id, id));

    return new UserClass(
      result[0].id,
      result[0].firstName,
      result[0].lastName,
      result[0].employeeId,
      result[0].vast,
      result[0].admin,
      result[0].active,
      result[0].minDays,
      result[0].maxDays,
      result[0].primaryRole,
      result[0].secondaryRole
    ).create();
  } catch (error) {
    console.error("Error getting One users from DB", error);
  }
}
// Update One user from DB
export async function updateOneUser(
  obj: UserClass
): Promise<UserClass | ErrorClass> {
  const theUser = obj.db();

  try {
    const result = await db
      .update(UserSchema)
      .set({
        firstName: theUser.firstName,
        lastName: theUser.lastName,
        employeeId: theUser.employeeId,
        vast: theUser.vast,
        admin: theUser.admin,
        active: theUser.active,
        minDays: theUser.minDays,
        maxDays: theUser.maxDays,
        primaryRole: theUser.primaryRole,
        secondaryRole: theUser.secondaryRole,
      })
      .where(eq(UserSchema.id, theUser.id))
      .returning();

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error updating user in DB");
    }

    if (result.length === 0) {
      return ErrorClass.new("User not found");
    }

    return new UserClass(
      result[0].id,
      result[0].firstName,
      result[0].lastName,
      result[0].employeeId,
      result[0].vast,
      result[0].admin,
      result[0].active,
      result[0].minDays,
      result[0].maxDays,
      result[0].primaryRole,
      result[0].secondaryRole
    ).create();
  } catch (error) {
    console.error("Error updating user in DB", error);
    return ErrorClass.new("Something went wrong updating user in DB");
  }
}
// Deactivate One user from DB
export async function deactivateOneUserToggle(id: string) {
  let toggle;

  try {
    const user = await getOneUser(id);

    if (user instanceof ErrorClass) {
      return user.toClient();
    }

    if (user instanceof UserClass) {
      toggle = !user.active;
    }
  } catch (error) {
    console.error("Error Deactivate user from DB", error);
    return ErrorClass.new("Error Deactivate user in DB").toClient();
  }
  try {
    return await db
      .update(UserSchema)
      .set({ active: toggle })
      .where(eq(UserSchema.id, id))
      .returning();
  } catch (error) {
    console.error("Error Deactivate user from DB", error);
  }
}

// Delete One user from DB
export async function deleteOneUser(id: string) {
  try {
    const result = await db
      .delete(UserSchema)
      .where(eq(UserSchema.id, id))
      .returning();

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error deleting user from DB");
    }

    if (result.length === 0) {
      return ErrorClass.new("User not found");
    }

    return new UserClass(
      result[0].id,
      result[0].firstName,
      result[0].lastName,
      result[0].employeeId,
      result[0].vast,
      result[0].admin,
      result[0].active,
      result[0].minDays,
      result[0].maxDays,
      result[0].primaryRole,
      result[0].secondaryRole
    ).create();
  } catch (error) {
    console.error("Error getting All users from DB", error);
    return ErrorClass.new("Error getting All users from DB");
  }
}

//! Availability
// Create availability in DB
export async function createAvailability(obj: AvailabilityClass) {
  const theAvailability = obj.db();
  try {
    const result = await db
      .insert(AvailabilitySchema)
      .values({
        weeklyId: theAvailability.weeklyId,
        userId: theAvailability.userId,
        day: theAvailability.day,
        time: theAvailability.time,
      })
      .returning();

    return result;
  } catch (error) {
    console.error("Error creating availability in DB", error);
    return [];
  }
}
// Get all availabilities from DB
export async function getAllAvailabilities(ID: string) {
  try {
    const result = await db.select().from(AvailabilitySchema);

    if (result.length === 0) {
      return [];
    }

    return result.map(
      (availability) =>
        new AvailabilityClass(
          availability.id,
          availability.weeklyId,
          availability.userId,
          availability.day,
          availability.time,
          availability.createdAt
        )
    );
  } catch (error) {
    console.error("Error getting All availabilities from DB", error);
    return [];
  }
}
// Get all week availabilities from DB
export async function getAllWeekAvailabilities(ID: string) {
  try {
    const result = await db
      .select()
      .from(AvailabilitySchema)
      .where(eq(AvailabilitySchema.weeklyId, ID));

    if (result.length === 0) return [];

    return result.map(
      (availability) =>
        new AvailabilityClass(
          availability.id,
          availability.weeklyId,
          availability.userId,
          availability.day,
          availability.time,
          availability.createdAt
        )
    );
  } catch (error) {
    console.error("Error getting All availabilities from DB", error);
    return [];
  }
}
// Get all availabilities from DB
export async function getAllAvailabilitiesS(
  ID: string
): Promise<AvailabilityClass[]> {
  try {
    const result = await db
      .select()
      .from(AvailabilitySchema)
      .where(eq(AvailabilitySchema.weeklyId, ID));

    if (result.length === 0) {
      return [];
    }

    return result.map((availability) =>
      new AvailabilityClass(
        availability.id,
        availability.weeklyId,
        availability.userId,
        availability.day,
        availability.time,
        availability.createdAt
      ).create()
    );
  } catch (error) {
    console.error("Error getting All availabilities from DB", error);
    return [];
  }
}
// Get one availability from DB
export async function getOneAvailability(
  id: string
): Promise<AvailabilityClass[]> {
  try {
    const result = await db
      .select()
      .from(AvailabilitySchema)
      .where(eq(AvailabilitySchema.id, id));

    if (result.length === 0) return [];

    return [
      new AvailabilityClass(
        result[0].id,
        result[0].weeklyId,
        result[0].userId,
        result[0].day,
        result[0].time,
        result[0].createdAt
      ),
    ];
  } catch (error) {
    console.error("Error getting One availability from DB", error);
    return [];
  }
}
// Update One availability from DB
export async function updateOneAvailability(id: string, time: string) {
  try {
    return await db
      .update(AvailabilitySchema)
      .set({
        time: time,
      })
      .where(eq(AvailabilitySchema.id, id))
      .returning();
  } catch (error) {
    console.error("Error updating availability in DB", error);
  }
}
// Delete One availability from DB
export async function deleteOneAvailability(id: string) {
  try {
    return await db
      .delete(AvailabilitySchema)
      .where(eq(AvailabilitySchema.id, id))
      .returning();
  } catch (error) {
    console.error("Error deleting availability in DB", error);
  }
}
// Delete One availability from DB
export async function deleteAllAvailability() {
  try {
    const result = await db.delete(AvailabilitySchema);
    if (result.rows.length === 0 && result.columns.length === 0) {
      return "All availabilities successfully deleted";
    }
  } catch (error) {
    console.error("Error deleting availability in DB", error);
  }
}

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

    if (result.length === 0) {
      return [];
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
    return [];
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
