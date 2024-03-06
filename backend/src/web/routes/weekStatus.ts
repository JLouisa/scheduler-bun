import { Elysia, t } from "elysia";
import * as weekStatus from "../controller/weekStatus";
import * as model from "./model";
import jwt from "@elysiajs/jwt";
import { ErrorClass } from "../../domain/error";

export const weekStatusRoutes = new Elysia({ prefix: "/weekstatus" })
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_SECRET!,
    })
  )
  // Get all weekStatus
  .get("/", async ({ set, jwt, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);
    if (!profile) {
      set.status = 401;
      return ErrorClass.new("Unauthorized").clientOut();
    }

    return weekStatus.getLastWeekStatus(set);
  })
  // Get one weekStatus
  .get("/:id", async ({ set, params: { id }, jwt, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);
    if (!profile) {
      set.status = 401;
      return ErrorClass.new("Unauthorized").clientOut();
    }

    return weekStatus.getOneWeekStatus(id, set);
  })
  // Create a new weekStatus
  .post(
    "/",
    async ({ set, body, jwt, cookie: { auth } }) => {
      const profile = await jwt.verify(auth.value);
      if (!profile) {
        set.status = 401;
        return ErrorClass.new("Unauthorized").clientOut();
      }

      return weekStatus.createWeekStatus(body, set);
    },
    {
      body: model.WeekStatusPartialModel,
    }
  )
  // Update one weekStatus
  .put(
    "/",
    async ({ set, body, jwt, cookie: { auth } }) => {
      const profile = await jwt.verify(auth.value);
      if (!profile) {
        set.status = 401;
        return ErrorClass.new("Unauthorized").clientOut();
      }

      return weekStatus.updateWeekStatus(body, set);
    },
    {
      body: model.WeekStatusFullModel,
    }
  )
  .put(
    "/:weeklyId",
    async ({ set, params: { weeklyId }, jwt, cookie: { auth } }) => {
      const profile = await jwt.verify(auth.value);
      if (!profile) {
        set.status = 401;
        return ErrorClass.new("Unauthorized").clientOut();
      }

      return weekStatus.updateCompleteWeekStatus(set, weeklyId);
    }
  )
  //! Delete all weekStatus
  .delete("/all", () => `Delete all weekStatus`)
  //! Delete one weekStatus
  .delete("/:id", async ({ params: { id }, set, jwt, cookie: { auth } }) => {
    const profile = await jwt.verify(auth.value);
    if (!profile) {
      set.status = 401;
      return ErrorClass.new("Unauthorized").clientOut();
    }

    return weekStatus.deleteWeekStatus(id, set);
  });
