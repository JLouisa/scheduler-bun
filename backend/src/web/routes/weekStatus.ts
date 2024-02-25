import { Elysia, t } from "elysia";
import * as weekStatus from "../controller/weekStatus";

export const weekStatusRoutes = new Elysia({ prefix: "/weekstatus" })
  // Get all weekStatus
  .get("/all/:weeklyId", () => weekStatus.getLastWeekStatus())
  // Get one weekStatus
  .get("/:id", ({ params: { id } }) => {
    return weekStatus.getOneWeekStatus(id);
  })
  // Create a new weekStatus
  .post("/", ({ body }) => weekStatus.createWeekStatus(body), {
    body: t.Object({
      id: t.String(),
      weeklyId: t.String(),
    }),
  })

  // Update one weekStatus
  .put("/", ({ body }) => weekStatus.updateWeekStatus(body), {
    body: t.Object({
      id: t.String(),
      weeklyId: t.String(),
    }),
  })
  //! Delete all weekStatus
  .delete("/all", () => `Delete all weekStatus`)
  //! Delete one weekStatus
  .delete("/:id", ({ params: { id }, set }) =>
    weekStatus.deleteWeekStatus(id, set)
  );
