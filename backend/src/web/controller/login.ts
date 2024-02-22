import * as dao from "../../database/dao";
import { AdminClass } from "../../domain/admin";
import { ErrorClass } from "../../domain/error";

type LoginBody = {
  email: string;
  password: string;
  remember: boolean;
};

export async function postLogin(body: LoginBody, set: any) {
  try {
    const user = AdminClass.login(body.email, body.password);
    const result = await dao.login(user);

    if (result instanceof ErrorClass) {
      set.status = 401;
      // If an error occurred during login, return an error response
      return { error: result.toStr() };
    }

    // If login was successful, return the user object
    return result;
  } catch (error) {
    // Handle unexpected errors
    console.error("Error during login:", error);
    return { error: "An unexpected error occurred during login" };
  }
}
