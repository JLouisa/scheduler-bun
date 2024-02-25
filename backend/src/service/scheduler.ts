import * as dao from "../database/dao";
import { AvailabilityClass } from "../domain/availability";
import * as library from "../lib/library";
import * as theTypes from "../domain/types";
import { theLogicT, WeekWorkerClass } from "../service/types";
import { WeekPlanClass } from "../domain/weekPlan";

export type theWeekT = {
  monday: AvailabilityClass[];
  tuesday: AvailabilityClass[];
  wednesday: AvailabilityClass[];
  thursday: AvailabilityClass[];
  friday: AvailabilityClass[];
  saturday: AvailabilityClass[];
  sunday: AvailabilityClass[];
};

export async function weekCreator(weeklyId: string) {
  // List of all available spots
  const InitAvailabilities = await dao.getAllAvailabilitiesS(weeklyId);

  if (InitAvailabilities.length === 0) {
    throw new Error("No available spots");
  }
  // Exclude every available spot with time "Free"
  const availabilities = InitAvailabilities.filter(
    (availability) => availability.time !== theTypes.ScheduleTime.Free
  );

  const users = await dao.getAllUsers();
  if (users.length === 0) {
    throw new Error("No users");
  }

  // Create a Map with userId as key and 0 as value
  const chosenMap = new Map<string, number>();

  users.forEach((user) => {
    chosenMap.set(user.id, 0);
  });

  // list of all available spots on per day basis sorted by time
  const monday = library.bubbleSort(
    availabilities.filter(
      (availability: AvailabilityClass) =>
        availability.day === theTypes.Days.Monday
    )
  );
  const tuesday = library.bubbleSort(
    availabilities.filter(
      (availability: AvailabilityClass) =>
        availability.day === theTypes.Days.Tuesday
    )
  );
  const wednesday = library.bubbleSort(
    availabilities.filter(
      (availability: AvailabilityClass) =>
        availability.day === theTypes.Days.Wednesday
    )
  );
  const thursday = library.bubbleSort(
    availabilities.filter(
      (availability: AvailabilityClass) =>
        availability.day === theTypes.Days.Thursday
    )
  );
  const friday = library.bubbleSort(
    availabilities.filter(
      (availability: AvailabilityClass) =>
        availability.day === theTypes.Days.Friday
    )
  );
  const saturday = library.bubbleSort(
    availabilities.filter(
      (availability: AvailabilityClass) =>
        availability.day === theTypes.Days.Saturday
    )
  );
  const sunday = library.bubbleSort(
    availabilities.filter(
      (availability: AvailabilityClass) =>
        availability.day === theTypes.Days.Sunday
    )
  );

  // list of all available spots on per day basis sorted by time
  const theWeek: theWeekT = {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  };

  // Logic for the schedule
  const theLogic: theLogicT = {
    management: [theTypes.ScheduleTime.StartAtThree],
    griller: [theTypes.ScheduleTime.StartAtThree],
    bar: [theTypes.ScheduleTime.StartAtSix],
    dishwasher: [theTypes.ScheduleTime.StartAtSix],
    kitchen: [
      theTypes.ScheduleTime.StartAtThree,
      theTypes.ScheduleTime.StartAtSix,
    ],
    service: [
      theTypes.ScheduleTime.StartAtThree,
      theTypes.ScheduleTime.StartAtFive,
      theTypes.ScheduleTime.StartAtSix,
      theTypes.ScheduleTime.OnCallAtSix,
    ],
  };

  // return theWeek;

  const week = WeekWorkerClass.create(users, theWeek, theLogic, chosenMap);

  const finalWeekPlan: WeekPlanClass[] = [];

  // Monday
  week.monday.management.forEach((theDay) => {
    finalWeekPlan.push(theDay);
  });
  week.monday.griller.forEach((theDay) => {
    finalWeekPlan.push(theDay);
  });
  week.monday.dishwasher.forEach((theDay) => {
    finalWeekPlan.push(theDay);
  });
  week.monday.bar.forEach((theDay) => {
    finalWeekPlan.push(theDay);
  });
  week.monday.kitchen.forEach((theDay) => {
    finalWeekPlan.push(theDay);
  });
  week.monday.service.forEach((theDay) => {
    finalWeekPlan.push(theDay);
  });

  // Tuesday
  Object.values(week.tuesday)
    .flat()
    .forEach((role) => {
      finalWeekPlan.push(role);
    });

  // Wednesday
  Object.values(week.wednesday)
    .flat()
    .forEach((theDay) => {
      finalWeekPlan.push(theDay);
    });

  // Thursday
  Object.values(week.thursday)
    .flat()
    .forEach((role) => {
      finalWeekPlan.push(role);
    });

  // Friday
  Object.values(week.friday)
    .flat()
    .forEach((role) => {
      finalWeekPlan.push(role);
    });

  // Saturday
  Object.values(week.saturday)
    .flat()
    .forEach((role) => {
      finalWeekPlan.push(role);
    });

  // Sunday
  Object.values(week.sunday)
    .flat()
    .forEach((role) => {
      finalWeekPlan.push(role);
    });

  const savedWeekPlan = await dao.createListWeekPlans(finalWeekPlan);

  return savedWeekPlan;
}
