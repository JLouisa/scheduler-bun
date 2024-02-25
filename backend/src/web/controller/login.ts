import * as dao from "../../database/dao/loginDAO";
import { AdminClass } from "../../domain/admin";
import { ErrorClass } from "../../domain/error";

type LoginBody = {
  email: string;
  password: string;
  remember: boolean;
};

export async function postLogin(
  body: LoginBody
): Promise<AdminClass | ErrorClass> {
  try {
    const user = AdminClass.login(body.email, body.password);

    const result: AdminClass[] | ErrorClass = await dao.login(user);

    if (result instanceof ErrorClass) {
      return result;
    }

    // If login was successful, return the user object
    return result[0];
  } catch (error) {
    // Handle unexpected errors
    console.error("Error during login:", error);
    return ErrorClass.new("An unexpected error occurred during login");
  }
}
