import { Elysia, t } from "elysia";
import * as user from "../controller/user";
import * as model from "./model";
import jwt from "@elysiajs/jwt";
import { ErrorClass } from "../../domain/error";
import { SuccessClass } from "../../domain/success";

export const userRoutes = new Elysia({ prefix: "/user" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  // Get all users
  .get("/", ({ set }) => user.getAllUsers(set))
  // Get one user
  .get("/:id", ({ params: { id }, set }) => {
    return user.getOneUser(id);
  })
  // Create a new user
  .post(
    "/",
    async ({ body, set, jwt, cookie: { auth } }) => {
      const profile = await jwt.verify(auth.value);

      if (!profile) {
        set.status = 401;
        return ErrorClass.new("Unauthorized").clientOut();
      }
      return user.createUser(body, set);
    },
    {
      body: model.UserPartialModel,
    }
  )
  // Update one user
  .put(
    "/",
    async ({ body, set, jwt, cookie: { auth } }) => {
      const profile = await jwt.verify(auth.value);

      if (!profile) {
        set.status = 401;
        return ErrorClass.new("Unauthorized").clientOut();
      }
      return user.updateUser(body, set);
    },
    {
      body: model.UserFullModel,
    }
  )
  //! Delete all users
  .delete("/all", async ({ set, jwt, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);

    if (!profile) {
      set.status = 401;
      return ErrorClass.new("Unauthorized").clientOut();
    }
    return SuccessClass.new(`Delete all users`).clientOut();
  })
  //! Delete one users
  .delete(
    "/one/:id",
    async ({ set, params: { id }, jwt, cookie: { auth } }) => {
      const profile = await jwt.verify(auth.value);

      if (!profile) {
        set.status = 401;
        return ErrorClass.new("Unauthorized").clientOut();
      }
      return user.deleteOneUser(id, set);
    }
  )
  // Deactivate one users
  .delete("/:id", async ({ params: { id }, set, jwt, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);

    if (!profile) {
      set.status = 401;
      return ErrorClass.new("Unauthorized").clientOut();
    }
    return user.deactivateOneUserToggle(id, set);
  });
