import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

export const isAuth = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET!,
      })
    )
    .derive(async ({ cookie, jwt, set }) => {
      if (!cookie!.access_token) {
        set.status = 401;
        console.log("token");
        return true;
      }

      const user = await jwt.verify(cookie!.auth.value);
      if (!user) {
        set.status = 401;
        console.log("User not authenticated");
        return true;
      }

      return user;
    });
