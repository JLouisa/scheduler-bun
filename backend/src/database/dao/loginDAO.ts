// Import the db schemas
import { AdminSchema } from "../schema/admin";

// Import the domain classes
import { AdminClass } from "../../domain/admin";
import { ErrorClass } from "../../domain/error";

// Setup the DB connection
import { db } from "../setup";
import { eq } from "drizzle-orm";

//! Login
export async function login(
  body: AdminClass
): Promise<AdminClass[] | ErrorClass> {
  try {
    const user = await db
      .select()
      .from(AdminSchema)
      .where(eq(AdminSchema.email, body.email));

    if (Array.isArray(user) && user.length === 0) {
      return ErrorClass.new("Email or password is incorrect");
    }

    if (user.length === 0) {
      return ErrorClass.new("Email or password is incorrect");
    }

    if (!user[0].active) {
      return ErrorClass.new("User is not active");
    }

    if (user[0].password !== body.password) {
      return ErrorClass.new("Email or password is incorrect");
    }

    return user.map((user) =>
      new AdminClass(
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.active
      ).dbOut()
    );
  } catch (error) {
    console.error("Error logging in user from DB", error);
    return ErrorClass.new("Error logging in user from DB");
  }
}
