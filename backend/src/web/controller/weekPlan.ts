import { Days, ScheduleTime } from "../../domain/types";
import { WeekPlanClass } from "../../domain/weekPlan";
import * as dao from "../../database/dao";
import { weekCreator } from "../../service/scheduler";

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

export function getAllWeekPlan() {
  return "Get all week plan";
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
  return await dao.createWeek(week);
}

export async function updateWeekPlan(body: UpdateWeekPlan) {
  const week = new WeekPlanClass(
    body.id,
    body.weeklyId,
    body.userId,
    body.day,
    body.time
  ).create();
  return await dao.updateOneWeekPlan(week);
}

//! Delete one week plan
export async function deleteWeekPlan(id: string) {
  return await dao.deleteOneWeekPlan(id);
}
//! Delete all week plan
export function deleteAllWeekPlan() {
  return "Delete all week plan";
}
