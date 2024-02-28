import { Days, ScheduleTime } from "../../domain/types";

import { WeekPlanClass } from "../../domain/weekPlan";
import { ErrorClass } from "../../domain/error";
import { weekCreator } from "../../service/scheduler";

import * as dao from "../../database/dao/weekPlanDAO";
import * as helper from "../../domain/types";
import * as availabilityDAO from "../../database/dao/availabilityDAO";
import { AvailabilityClass } from "../../domain/availability";

type WeekPlan = {
  id?: string;
  weeklyId: string;
  userId: string;
  day: Days;
  time: ScheduleTime;
};

// Get one weekPlan
export async function getOneWeekPlan(id: string, set: any) {
  const result = await dao.getOneWeekPlan(id);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((week) => week.clientOut());
}

// Get all weekPlans
export async function getAllWeekPlan(weeklyId: string, set: any) {
  const weekPlan = await dao.getAllWeekPlan(weeklyId);

  if (weekPlan instanceof ErrorClass) {
    set.status = 400;
    return weekPlan.clientOut();
  }

  return weekPlan.map((week) => week.clientOut());
}

// Calculate the time for the weekPlan
export async function calcWeekPlan(weeklyId: string, set: any) {
  const weekPlan = await dao.getAllWeekPlan(weeklyId);

  if (weekPlan instanceof ErrorClass) {
    set.status = 500;
    return weekPlan.clientOut();
  }

  if (weekPlan.length === 0) {
    const availabilities: AvailabilityClass[] | ErrorClass =
      await availabilityDAO.getAllAvailabilitiesS(weeklyId);

    if (availabilities instanceof ErrorClass) {
      set.status = 500;
      return availabilities.clientOut();
    }

    return await weekCreator(weeklyId, availabilities);
  }

  return weekPlan.map((week) => week.clientOut());
}

// Create a new weekPlan
export async function createWeekPlan(body: WeekPlan, set: any) {
  const week = WeekPlanClass.new(
    body.userId,
    body.weeklyId,
    body.day,
    body.time,
    body.id
  );

  // Check if the day and time are valid
  if (
    week.day === helper.Days.Invalid ||
    week.time === helper.ScheduleTime.Invalid
  ) {
    set.status = 400;
    return ErrorClass.new("Invalid information").clientOut();
  }

  // Check if the availability already exists
  const result = await dao.createOneWeek(week);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((availability) => availability.clientOut());

  // const select: WeekPlanClass[] | ErrorClass = await dao.getOneWeekPlan(week.id);

  // if (select instanceof ErrorClass) {
  //   return await dao.createOneWeek(week);
  // }

  // if (select instanceof WeekPlanClass) {
  //   return await dao.updateWeekPlan(
  //     select.id,
  //     helper.getScheduleTimeEnumToStr(week.time as ScheduleTime)
  //   );
  // }
}

// Update one weekPlan
export async function updateWeekPlan(body: WeekPlan, set: any) {
  const week = new WeekPlanClass(
    body.id as string,
    body.weeklyId,
    body.userId,
    body.day,
    body.time
  ).clientIn();

  if (
    week.day === helper.Days.Invalid ||
    week.time === helper.ScheduleTime.Invalid
  ) {
    set.status = 400;
    return ErrorClass.new("Invalid information").clientOut();
  }

  const result = await dao.updateWeekPlan(
    week.id,
    helper.getScheduleTimeEnumToStr(week.time as ScheduleTime)
  );

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((availability) => availability.clientOut());
}

//! Delete one week plan
export async function deleteWeekPlan(id: string, set: any) {
  const result = await dao.deleteOneWeekPlan(id);

  if (result instanceof ErrorClass) {
    set.status(400);
    return result.clientOut();
  }

  return result.map((week) => week.clientOut());
}

//! Delete all week plan
export function deleteAllWeekPlan(set: any) {
  return "Delete all week plan";
}
