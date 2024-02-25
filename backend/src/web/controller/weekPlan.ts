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

// Get one weekPlan
export function getOneWeekPlan(id: string, set: any) {
  return "Get one week plan with id: " + id;
}

// Get all weekPlans
export async function getAllWeekPlan(weeklyId: string, set: any) {
  const weekPlan = await dao.getAllWeekPlan(weeklyId);

  if (weekPlan instanceof ErrorClass) {
    set.status = 400;
    return weekPlan.clientOut();
  }

  return weekPlan.map((week) => week.db());
}

// Calculate the time for the weekPlan
export async function calcWeekPlan(weeklyId: string, set: any) {
  const weekPlan = await dao.getAllWeekPlan(weeklyId);

  if (weekPlan instanceof ErrorClass) {
    set.status = 500;
    return weekPlan.clientOut();
  }

  if (weekPlan.length === 0) {
    return await weekCreator(weeklyId);
  }

  return weekPlan.map((week) => week.db());
}

// Create a new weekPlan
export async function createWeekPlan(body: WeekPlan, set: any) {
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

// Update one weekPlan
export async function updateWeekPlan(body: UpdateWeekPlan, set: any) {
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
export async function deleteWeekPlan(id: string, set: any) {
  try {
    const result = await dao.deleteOneWeekPlan(id);
    if (result instanceof ErrorClass) {
      set.status(500);
      return result.clientOut();
    }

    return result;
  } catch (error) {
    console.error("Error deleting week plan from DB");
    set.status(500);
    return ErrorClass.new("Error deleting week plan from DB").clientOut();
  }
}
//! Delete all week plan
export function deleteAllWeekPlan(set: any) {
  return "Delete all week plan";
}
