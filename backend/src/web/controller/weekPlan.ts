import { Days, ScheduleTime } from "../../domain/types";
import { WeekPlanClass } from "../../domain/weekPlan";
import * as dao from "../../database/dao";
import { weekCreator } from "../../service/scheduler";
import * as helper from "../../domain/types";
import { ErrorClass } from "../../domain/error";

type WeekPlan = {
  id: string;
  weeklyId: string;
  userId: string;
  day: Days | string;
  time: ScheduleTime | string;
};

type UpdateWeekPlan = {
  id: string;
  weeklyId: string;
  userId: string;
  day: Days | string;
  time: ScheduleTime | string;
};

export async function getAllWeekPlan(weeklyId: string) {
  const weekPlan = await dao.getAllWeekPlan(weeklyId);

  return weekPlan.map((week) => week.db());
}

export function getOneWeekPlan(id: string) {
  return "Get one week plan with id: " + id;
}

export async function calcWeekPlan(id: string) {
  const weekPlan = await dao.getAllWeekPlan(id);

  if (weekPlan.length === 0) {
    const calcNewWeekPlan = await weekCreator(id);
    return calcNewWeekPlan;
  }

  return weekPlan.map((week) => week.db());
}

export async function createWeekPlan(body: WeekPlan) {
  const week = new WeekPlanClass(
    body.id,
    body.weeklyId,
    body.userId,
    body.day,
    body.time
  ).create();

  const select: WeekPlanClass | ErrorClass = await dao.getOneWeekPlan(week.id);

  if (select instanceof ErrorClass) {
    return await dao.createOneWeek(week);
  }

  if (select instanceof WeekPlanClass) {
    return await dao.updateWeekPlan(
      select.id,
      helper.getScheduleTimeEnumToStr(week.time as ScheduleTime)
    );
  }
}

export async function updateWeekPlan(body: UpdateWeekPlan) {
  const week = new WeekPlanClass(
    body.id,
    body.weeklyId,
    body.userId,
    body.day,
    body.time
  ).create();

  return await dao.updateWeekPlan(
    week.id,
    helper.getScheduleTimeEnumToStr(week.time as ScheduleTime)
  );
}

//! Delete one week plan
export async function deleteWeekPlan(id: string) {
  try {
    return await dao.deleteOneWeekPlan(id);
  } catch (error) {
    console.error("Error deleting week plan from DB");
    return ErrorClass.new("Error deleting week plan from DB").toClient();
  }
}
//! Delete all week plan
export function deleteAllWeekPlan() {
  return "Delete all week plan";
}
