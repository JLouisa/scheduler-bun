import { Elysia, t } from "elysia";
import * as available from "../controller/availability";

export const availableRoutes = new Elysia({ prefix: "/availability" })
  // Get all availabilities
  .get("/", () => available.getAllAvailability())
  // Get all availabilities of a week
  .get("week/:week", ({ params: { week } }) =>
    available.getAllWeekAvailability(week)
  )
  // Get one availability
  .get("/:id", ({ params: { id } }) => available.getOneAvailability(id))
  // Create a new availability
  .post("/", ({ body }) => available.createAvailability(body), {
    body: t.Object({
      availabilityId: t.String(),
      userId: t.String(),
      day: t.String(),
      time: t.String(),
    }),
  })
  // Update one availability
  .put("/", ({ body }) => available.updateAvailability(body.id, body.time), {
    body: t.Object({
      id: t.String(),
      time: t.String(),
    }),
  })
  // Delete one availability
  .delete("/:id", ({ params: { id } }) => available.deleteOneAvailability(id))
  //! Delete all availabilities
  .delete("/all", () => available.deleteAllAvailability());
