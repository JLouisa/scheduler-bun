import { Elysia, t } from "elysia";
import * as available from "../controller/availability";

export const availableRoutes = new Elysia({ prefix: "/availability" })
  // Get all availabilities
  .get("/", ({ set }) => available.getAllAvailability(set))
  // Get all availabilities of a week
  .get("week/:week", ({ set, params: { week } }) =>
    available.getAllWeekAvailability(week, set)
  )
  // Get one availability
  .get("/:id", ({ set, params: { id } }) =>
    available.getOneAvailability(id, set)
  )
  // Create a new availability
  .post("/", ({ set, body }) => available.createAvailability(body, set), {
    body: t.Object({
      availabilityId: t.String(),
      userId: t.String(),
      day: t.String(),
      time: t.String(),
    }),
  })
  // Update one availability
  .put(
    "/",
    ({ set, body }) => available.updateAvailability(body.id, body.time, set),
    {
      body: t.Object({
        id: t.String(),
        time: t.String(),
      }),
    }
  )
  // Delete one availability
  .delete("/:id", ({ params: { id }, set }) =>
    available.deleteOneAvailability(id, set)
  )
  //! Delete all availabilities
  .delete("/all", (set) => available.deleteAllAvailability(set));
