import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import * as login from "../controller/login";
import { ErrorClass } from "../../domain/error";
import { AdminClass } from "../../domain/admin";
import * as model from "./model";
import { SuccessClass } from "../../domain/success";

export const loginRoutes = new Elysia({ prefix: "/login" })
  // Login as an admin
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  //! =======================================
  .get("/test/info", (Request) => console.log(Request))
  .get("/test/unauth", () => SuccessClass.new("Unauthorized").clientOut())
  .get("/test/auth", async ({ set, jwt, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);
    if (!profile) {
      set.status = 401;
      return ErrorClass.new("Unauthorized").clientOut();
    }
    return SuccessClass.new("Authorized").clientOut();
  })
  //! =======================================
  .post(
    "/",
    async ({ body, set, jwt, cookie: { auth } }) => {
      try {
        const user: ErrorClass | AdminClass = await login.postLogin(body);

        if (user instanceof ErrorClass) {
          set.status = 401;
          return user.clientOut();
        }

        auth.set({
          value: await jwt.sign({
            id: user.id,
            email: user.email,
            active: `${user.active}`,
          }),
          domain: "http://localhost",
          sameSite: "none",
          httpOnly: false, // Prevents JavaScript from accessing the cookie
          maxAge: 86400 * (body.remember ? 30 : 1), //86400 seconds in a day
          secure: false,
        });
        // const myCookie = {
        //   name: auth.name,
        //   value: auth.value,
        //   maxAge: auth.maxAge,
        // };
        // return { user: user.clientOut(), myCookie };
        return user.clientOut();
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
