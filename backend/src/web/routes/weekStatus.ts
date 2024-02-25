import { Elysia, t } from "elysia";
import * as weekStatus from "../controller/weekStatus";

export const weekStatusRoutes = new Elysia({ prefix: "/weekstatus" })
  // Get all weekStatus
  .get("/", ({ set }) => weekStatus.getLastWeekStatus(set))
  // Get one weekStatus
  .get("/:id", ({ set, params: { id } }) => {
    return weekStatus.getOneWeekStatus(id, set);
  })
  // Create a new weekStatus
  .post("/", ({ set, body }) => weekStatus.createWeekStatus(body, set), {
    body: t.Object({
      weeklyId: t.String(),
      status: t.String(),
    }),
  })
  // Update one weekStatus
  .put("/", ({ set, body }) => weekStatus.updateWeekStatus(body, set), {
    body: t.Object({
      id: t.String(),
      weeklyId: t.String(),
      status: t.String(),
    }),
  })
  //! Delete all weekStatus
  .delete("/all", () => `Delete all weekStatus`)
  //! Delete one weekStatus
  .delete("/:id", ({ params: { id }, set }) =>
    weekStatus.deleteWeekStatus(id, set)
  );
