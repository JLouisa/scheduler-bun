import { Elysia, t } from "elysia";
import * as user from "../controller/user";

export const userRoutes = new Elysia({ prefix: "/user" })
  // Get all users
  .get("/", () => user.getAllUsers())
  // Create a new user
  .post("/", ({ body }) => user.createUser(body), {
    body: t.Object({
      firstName: t.String(),
      lastName: t.String(),
      employeeId: t.Number(),
      admin: t.Boolean(),
      vast: t.Boolean(),
      active: t.Boolean(),
      minDays: t.Number(),
      maxDays: t.Number(),
      primaryRole: t.String(),
      secondaryRole: t.String(),
    }),
  })
  // Get one user
  .get("/:id", ({ params: { id } }) => {
    return user.getOneUser(id);
  })
  // Update one user
  .put("/", ({ body, set }) => user.updateUser(body, set), {
    body: t.Object({
      id: t.String(),
      firstName: t.String(),
      lastName: t.String(),
      employeeId: t.Number(),
      admin: t.Boolean(),
      vast: t.Boolean(),
      active: t.Boolean(),
      minDays: t.Number(),
      maxDays: t.Number(),
      primaryRole: t.String(),
      secondaryRole: t.String(),
    }),
  })
  //! Delete all users
  .delete("/all", () => `Delete all users`)
  //! Delete one users
  .delete("/one/:id", ({ set, params: { id } }) => user.deleteOneUser(id, set))
  // Deactivate one users
  .delete("/:id", ({ params: { id } }) => user.deactivateOneUserToggle(id));
