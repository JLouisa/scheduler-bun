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
  .post(
    "/",
    ({ set, body }) => {
      console.log(body);
      return available.createAvailability(body, set);
    },
    {
      body: t.Object({
        id: t.Optional(t.String()),
        weeklyId: t.String(),
        userId: t.String(),
        day: t.Union([
          t.Literal("Monday"),
          t.Literal("Tuesday"),
          t.Literal("Wednesday"),
          t.Literal("Thursday"),
          t.Literal("Friday"),
          t.Literal("Saturday"),
          t.Literal("Sunday"),
        ]),
        time: t.Union([
          t.Literal("Available"),
          t.Literal("13"),
          t.Literal("13-17"),
          t.Literal("15"),
          t.Literal("15-17"),
          t.Literal("17"),
          t.Literal("18"),
          t.Literal("(17)18"),
          t.Literal("(17)"),
          t.Literal("(18)"),
          t.Literal("Free"),
        ]),
      }),
    }
  )
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
