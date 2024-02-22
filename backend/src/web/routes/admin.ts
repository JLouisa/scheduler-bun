import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { env } from "bun";

export const adminRoutes = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: env.JWT_SECRET!,
    })
  )
  .get("/sign/:name", async ({ jwt, cookie: { auth }, params }) => {
    auth.set({
      value: await jwt.sign(params),
      httpOnly: true,
      maxAge: 7 * 86400,
      path: "/profile",
    });

    return `Sign in as ${auth.value}`;
  })
  .get("/profile", async ({ jwt, set, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);

    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }

    return `Hello ${profile.name}`;
  });
