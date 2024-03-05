import * as dao from "../../database/dao/availabilityDAO";
import { AvailabilityClass } from "../../domain/availability";
import { ErrorClass } from "../../domain/error";
import * as helper from "../../domain/types";

type Availability = {
  id: string;
  weeklyId: string;
  userId: string;
  day: string;
  time: string;
};

type CreateAvailability = {
  id?: string;
  userId: string;
  day: string;
  time: string;
};

//! Create a new availability
export async function createAvailability(body: CreateAvailability, set: any) {
  const available = AvailabilityClass.new(
    body.userId,
    body.day,
    body.time,
    body?.id
  );

  console.log(`availableClass`);
  console.log(available);

  // Check if the day and time are valid
  if (
    available.day === helper.Days.Invalid ||
    available.time === helper.ScheduleTime.Invalid
  ) {
    set.status = 400;
    return ErrorClass.new("Invalid information").clientOut();
  }

  // Check if the availability already exists
  const result =
    available.id === undefined
      ? await dao.createAvailability2(available)
      : await dao.createAvailability(available);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((availability) => availability.clientOut());
}

//! Get all availabilities in DB
export async function getAllAvailability(set: any, ID = helper.createWeekID()) {
  const result = await dao.getAllAvailabilities(ID);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((availability) => availability.clientOut());
}

//! Get all availabilities of a week
export async function getAllWeekAvailability(weeklyId: string, set: any) {
  const result = await dao.getAllWeekAvailabilities(weeklyId);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((availability) => availability.clientOut());
}

//! Get one availability
export async function getOneAvailability(id: string, set: any) {
  const result = await dao.getOneAvailability(id);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((availability) => availability.clientOut());
}

//! Update one availability
export async function updateAvailability(id: string, time: string, set: any) {
  const theTime: helper.ScheduleTime = helper.getScheduleTimeStrToEnum(time);

  // Check if the time is valid
  if (theTime === helper.ScheduleTime.Invalid) {
    return ErrorClass.new("Invalid time").clientOut();
  }

  const result = await dao.updateOneAvailability(
    id,
    helper.getScheduleTimeEnumToStr(theTime)
  );

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((availability) => availability.clientOut());
}

//! Delete one availability
export async function deleteOneAvailability(id: string, set: any) {
  const result = dao.deleteOneAvailability(id);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result;
}

//! Delete all availabilities
export async function deleteAllAvailability(set: any) {
  const result = dao.deleteAllAvailability();

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }
  return { success: result };
}
