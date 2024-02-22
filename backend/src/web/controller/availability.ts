import * as dao from "../../database/dao";
import { AvailabilityClass } from "../../domain/availability";
import { ScheduleTime } from "../../domain/types";
import * as helper from "../../domain/types";

type Availability = {
  id: string;
  weeklyId: string;
  userId: string;
  day: string;
  time: string;
};

type CreateAvailability = {
  availabilityId?: string;
  userId: string;
  day: string;
  time: string;
};

export async function createAvailability(body: CreateAvailability) {
  const available = AvailabilityClass.new(
    body.userId,
    body.day,
    body.time,
    body.availabilityId
  );
  const select = await dao.getOneAvailability(available.id);

  if (select.length === 0) {
    return await dao.createAvailability(available);
  }

  return dao.updateOneAvailability(
    available.id,
    helper.getScheduleTimeEnumToStr(available.time as helper.ScheduleTime)
  );
}

export async function getAllAvailability(ID = helper.createWeekID()) {
  return await dao.getAllAvailabilities(ID);
}

export async function getAllWeekAvailability(weeklyId: string) {
  return await dao.getAllWeekAvailabilities(weeklyId);
}

export async function getOneAvailability(id: string) {
  return await dao.getOneAvailability(id);
}

export async function updateAvailability(id: string, time: string) {
  const theTime: ScheduleTime = helper.getScheduleTimeStrToEnum(time);
  if (theTime === ScheduleTime.Invalid) {
    return { failed: "Invalid time" };
  }

  return await dao.updateOneAvailability(
    id,
    helper.getScheduleTimeEnumToStr(theTime)
  );
}

export async function deleteOneAvailability(id: string) {
  return dao.deleteOneAvailability(id);
}

export async function deleteAllAvailability() {
  return dao.deleteAllAvailability();
}
