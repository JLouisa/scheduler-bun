import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import * as login from "../controller/login";
import { ErrorClass } from "../../domain/error";
import { AdminClass } from "../../domain/admin";
import * as model from "./model";

export const loginRoutes = new Elysia({ prefix: "/login" })
  // Login as an admin
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  .post(
    "/",
    async ({ body, set, jwt, cookie: { auth } }) => {
      try {
        const user: ErrorClass | AdminClass = await login.postLogin(body);

        if (user instanceof ErrorClass) {
          set.status = 401;
          return user.clientOut();
        }

        if (user instanceof AdminClass) {
          auth.set({
            value: await jwt.sign({
              id: user.id,
              email: user.email,
              active: `${user.active}`,
            }),
            httpOnly: true, // Prevents JavaScript from accessing the cookie
            maxAge: 86400 * (body.remember ? 30 : 1), //86400 seconds in a day
          });
          return user.clientOut();
        }
      } catch (error) {
        console.error("Error during login:", error);
        set.status = 500; // Internal Server Error
        return ErrorClass.new(
          "An unexpected error occurred during login"
        ).clientOut();
      }
    },
    {
      body: model.LoginModel,
    }
  );
