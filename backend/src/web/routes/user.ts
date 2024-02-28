import { Elysia, t } from "elysia";
import * as user from "../controller/user";
import * as model from "./model";

export const userRoutes = new Elysia({ prefix: "/user" })
  // Get all users
  .get("/", ({ set }) => user.getAllUsers(set))
  // Create a new user
  .post("/", ({ body, set }) => user.createUser(body, set), {
    body: model.UserPartialModel,
  })
  // Get one user
  .get("/:id", ({ params: { id }, set }) => {
    return user.getOneUser(id);
  })
  // Update one user
  .put("/", ({ body, set }) => user.updateUser(body, set), {
    body: model.UserFullModel,
  })
  //! Delete all users
  .delete("/all", ({ set }) => `Delete all users`)
  //! Delete one users
  .delete("/one/:id", ({ set, params: { id } }) => user.deleteOneUser(id, set))
  // Deactivate one users
  .delete("/:id", ({ params: { id }, set }) =>
    user.deactivateOneUserToggle(id, set)
  );
