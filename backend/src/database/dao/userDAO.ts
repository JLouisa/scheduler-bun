// Import the db schemas
import { UserSchema } from "../schema/users";
import { ErrorClass } from "../../domain/error";

// Import the domain classes
import { UserClass } from "../../domain/user";

// Setup the DB connection
import { db } from "../setup";
import { eq, lt, gte, ne, desc } from "drizzle-orm";

// Create One user in DB
export async function createOneUser(
  obj: UserClass
): Promise<UserClass | ErrorClass> {
  const theUser = obj.dbIn();

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
    ).dbOut();
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

    if (!Array.isArray(result)) ErrorClass.new("Error getting users");

    return result.map((user) =>
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
      ).dbOut()
    );
  } catch (error) {
    console.error("Error getting All users from DB", error);
    return ErrorClass.new("Error getting users from DB");
  }
}

// Get one user from DB
export async function getOneUser(id: string) {
  try {
    const result = await db
      .select()
      .from(UserSchema)
      .where(eq(UserSchema.id, id));

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error getting user");
    }

    return result.map((user) =>
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
      ).dbOut()
    );
  } catch (error) {
    console.error("Error getting One users from DB", error);
    return ErrorClass.new("Error getting user from DB");
  }
}

// Update One user from DB
export async function updateOneUser(
  obj: UserClass
): Promise<UserClass | ErrorClass> {
  const theUser = obj.dbIn();

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
    ).dbOut();
  } catch (error) {
    console.error("Error updating user in DB", error);
    return ErrorClass.new("Something went wrong updating user in DB");
  }
}

// Deactivate One user from DB
export async function deactivateOneUserToggle(
  id: string
): Promise<UserClass[] | ErrorClass> {
  let toggle;

  try {
    const user = await getOneUser(id);

    if (!Array.isArray(user)) {
      return ErrorClass.new("Error Deactivate user");
    }

    if (user instanceof UserClass) {
      toggle = !user.active;
    }
  } catch (error) {
    console.error("Error Deactivate user from DB", error);
    return ErrorClass.new("Error Deactivate user in DB");
  }

  try {
    const result = await db
      .update(UserSchema)
      .set({ active: toggle })
      .where(eq(UserSchema.id, id))
      .returning();

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error Deactivate user from DB");
    }

    return result.map((user) =>
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
      ).dbOut()
    );
  } catch (error) {
    console.error("Error Deactivate user from DB", error);
    return ErrorClass.new("Error Deactivate user");
  }
}

// Delete One user from DB
export async function deleteOneUser(
  id: string
): Promise<UserClass[] | ErrorClass> {
  try {
    const result = await db
      .delete(UserSchema)
      .where(eq(UserSchema.id, id))
      .returning();

    if (!Array.isArray(result)) {
      return ErrorClass.new("Error deleting user from DB");
    }

    return result.map((user) =>
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
      ).dbOut()
    );
  } catch (error) {
    console.error("Error getting All users from DB", error);
    return ErrorClass.new("Error getting All users");
  }
}
