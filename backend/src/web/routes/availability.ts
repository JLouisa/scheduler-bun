import { Elysia, t } from "elysia";
import * as available from "../controller/availability";
import * as model from "./model";

export const availableRoutes = new Elysia({ prefix: "/availability" })
  // Get all availabilities
  .get("/", ({ set }) => available.getAllAvailability(set))
  // Get all availabilities of a week
  .get("week/:weekly", ({ set, params: { weekly } }) =>
    available.getAllWeekAvailability(weekly, set)
  )
  // Get one availability
  .get("/:id", ({ set, params: { id } }) =>
    available.getOneAvailability(id, set)
  )
  // Create a new availability
  .post(
    "/",
    ({ set, body }) => {
      console.log(`body in routes`);
      console.log(body);
      return available.createAvailability(body, set);
    },
    {
      body: model.AvailableFullModel,
    }
  )
  // Update one availability
  .put(
    "/",
    ({ set, body }) => available.updateAvailability(body.id, body.time, set),
    {
      body: model.AvailablePartialModel,
    }
  )
  // Delete one availability
  .delete("/:id", ({ params: { id }, set }) =>
    available.deleteOneAvailability(id, set)
  )
  //! Delete all availabilities
  .delete("/all", (set) => available.deleteAllAvailability(set))
  .delete("/", () => "Delete all availabilities");
