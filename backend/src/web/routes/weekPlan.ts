import { Elysia, t } from "elysia";
import * as weekPlan from "../controller/weekPlan";
import * as model from "./model";
import { ErrorClass } from "../../domain/error";
import jwt from "@elysiajs/jwt";

export const weekPlanRoutes = new Elysia({ prefix: "/weekplan" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  // Get all weekPlans
  .get("/all/:weeklyId", ({ set, params: { weeklyId } }) =>
    weekPlan.getAllWeekPlan(weeklyId, set)
  )
  //Calculate the time for the weekPlan
  .get(
    "/create/:id",
    async ({ set, params: { id }, jwt, cookie: { auth } }) => {
      const profile = await jwt.verify(auth.value);

      if (!profile) {
        set.status = 401;
        return ErrorClass.new("Unauthorized").clientOut();
      }

      return weekPlan.createWholeWeekPlan(id, set);
    }
  )
  //Calculate the time for the weekPlan
  .get(
    "/calculate/:id",
    async ({ set, params: { id }, jwt, cookie: { auth } }) => {
      const profile = await jwt.verify(auth.value);

      if (!profile) {
        set.status = 401;
        return ErrorClass.new("Unauthorized").clientOut();
      }
      return weekPlan.calcWeekPlan(id, set);
    }
  )
  // Get one weekPlan
  .get("/:id", ({ set, params: { id } }) => {
    return weekPlan.getOneWeekPlan(id, set);
  })
  // Create a new weekPlan
  .post(
    "/",
    async ({ set, body, jwt, cookie: { auth } }) => {
      const profile = await jwt.verify(auth.value);

      if (!profile) {
        set.status = 401;

        return ErrorClass.new("Unauthorized").clientOut();
      }
      return weekPlan.createWeekPlan(body, set);
    },
    {
      body: model.AvailableFullModel,
    }
  )

  // Update one weekPlan
  .put(
    "/",
    async ({ set, body, jwt, cookie: { auth } }) => {
      const profile = await jwt.verify(auth.value);

      if (!profile) {
        set.status = 401;
        return ErrorClass.new("Unauthorized").clientOut();
      }
      return weekPlan.updateWeekPlan(body, set);
    },
    {
      body: model.AvailableFullModel,
    }
  )

  //! Delete one weekPlan
  .delete(
    "/one/:id",
    async ({ params: { id }, set, jwt, cookie: { auth } }) => {
      const profile = await jwt.verify(auth.value);

      if (!profile) {
        set.status = 401;
        return ErrorClass.new("Unauthorized").clientOut();
      }
      return weekPlan.deleteWeekPlan(id, set);
    }
  )
  //! Delete all weekPlans
  .delete("/all", () => `Delete all weekPlan`);
