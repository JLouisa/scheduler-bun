import { Elysia, t } from "elysia";
import * as weekPlan from "../controller/weekPlan";

export const weekPlanRoutes = new Elysia({ prefix: "/weekplan" })
  // Get all weekPlans
  .get("/", () => weekPlan.getAllWeekPlan())
  // Get one weekPlan
  .get("/:id", ({ params: { id } }) => {
    return weekPlan.getOneWeekPlan(id);
  })
  //Calculate the time for the weekPlan
  .get("/create/:id", ({ params: { id } }) => weekPlan.calcWeekPlan(id))

  // Create a new weekPlan
  .post("/", ({ body }) => weekPlan.createWeekPlan(body), {
    body: t.Object({
      id: t.String(),
      weeklyId: t.String(),
      userId: t.String(),
      day: t.String(),
      time: t.String(),
    }),
  })

  // Update one weekPlan
  .put("/", ({ body }) => weekPlan.updateWeekPlan(body), {
    body: t.Object({
      id: t.String(),
      weeklyId: t.String(),
      userId: t.String(),
      day: t.String(),
      time: t.String(),
    }),
  })

  //! Delete one weekPlan
  .delete("/one/:id", ({ params: { id } }) => weekPlan.deleteWeekPlan(id))
  //! Delete all weekPlans
  .delete("/all", () => `Delete all weekPlan`);
