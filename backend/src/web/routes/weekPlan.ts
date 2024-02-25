import { Elysia, t } from "elysia";
import * as weekPlan from "../controller/weekPlan";

export const weekPlanRoutes = new Elysia({ prefix: "/weekplan" })
  // Get all weekPlans
  .get("/all/:weeklyId", ({ set, params: { weeklyId } }) =>
    weekPlan.getAllWeekPlan(weeklyId, set)
  )
  // Get one weekPlan
  .get("/:id", ({ set, params: { id } }) => {
    return weekPlan.getOneWeekPlan(id, set);
  })
  //Calculate the time for the weekPlan
  .get("/create/:id", ({ set, params: { id } }) =>
    weekPlan.calcWeekPlan(id, set)
  )

  // Create a new weekPlan
  .post("/", ({ set, body }) => weekPlan.createWeekPlan(body, set), {
    body: t.Object({
      id: t.String(),
      weeklyId: t.String(),
      userId: t.String(),
      day: t.String(),
      time: t.String(),
    }),
  })

  // Update one weekPlan
  .put("/", ({ set, body }) => weekPlan.updateWeekPlan(body, set), {
    body: t.Object({
      id: t.String(),
      weeklyId: t.String(),
      userId: t.String(),
      day: t.String(),
      time: t.String(),
    }),
  })

  //! Delete one weekPlan
  .delete("/one/:id", ({ params: { id }, set }) =>
    weekPlan.deleteWeekPlan(id, set)
  )
  //! Delete all weekPlans
  .delete("/all", () => `Delete all weekPlan`);
