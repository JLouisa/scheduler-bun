import { Elysia, t } from "elysia";
import * as login from "../controller/login";

export const loginRoutes = new Elysia({ prefix: "/login" })
  // Login as an admin
  .post("/", ({ body, set }) => login.postLogin(body, set), {
    body: t.Object({
      email: t.String(),
      password: t.String(),
      remember: t.Boolean(),
    }),
  });
