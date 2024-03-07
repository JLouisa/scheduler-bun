import { Elysia } from "elysia";
import { isAuth } from "../../lib/auth";
import { jwt } from "@elysiajs/jwt";
import { ErrorClass } from "../../domain/error";

export const adminRoutes = new Elysia({ prefix: "/auth" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  .get("/profile", async ({ jwt, set, cookie: { auth } }) => {
    // const profile = await jwt.verify(auth.value);

    // if (!profile) {
    //   set.status = 401;
    //   return ErrorClass.new("Unauthorized").clientOut();
    // }

    return `Hello is authenticated`;
  });
