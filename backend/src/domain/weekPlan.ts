import { NIL as NIL_UUID } from "uuid";
import { ScheduleTime, Days } from "./types";
import * as helper from "./types";
import { UserClass } from "./user";
import { AvailabilityClass } from "./availability";

export class WeekPlanClass {
  constructor(
    public id: string,
    public weeklyId: string,
    public userId: string,
    public day: Days | string,
    public time: ScheduleTime | string
  ) {}
  static new(
    userId: string,
    weeklyId: string,
    day: string,
    time: string,
    id: string = NIL_UUID
  ): WeekPlanClass {
    return new WeekPlanClass(
      id === undefined ? NIL_UUID : id,
      weeklyId,
      userId,
      helper.getDayStrToEnum(day),
      helper.getScheduleTimeStrToEnum(time)
    );
  }
  clientIn(): WeekPlanClass {
    return new WeekPlanClass(
      this.id,
      this.weeklyId,
      this.userId,
      helper.getDayStrToEnum(this.day as string),
      helper.getScheduleTimeStrToEnum(this.time as string)
    );
  }
  clientOut(): WeekPlanClass {
    return new WeekPlanClass(
      this.id,
      this.weeklyId,
      this.userId,
      helper.getDayEnumToStr(this.day as Days),
      helper.getScheduleTimeEnumToStr(this.time as ScheduleTime)
    );
  }
  dbIn(): WeekPlanClass {
    return new WeekPlanClass(
      this.id,
      this.weeklyId,
      this.userId,
      helper.getDayEnumToStr(this.day as Days),
      helper.getScheduleTimeEnumToStr(this.time as ScheduleTime)
    );
  }
  dbOut(): WeekPlanClass {
    return new WeekPlanClass(
      this.id,
      this.weeklyId,
      this.userId,
      helper.getDayStrToEnum(this.day as string),
      helper.getScheduleTimeStrToEnum(this.time as string)
    );
  }
  static createList(
    users: UserClass[],
    list: AvailabilityClass[],
    logic: helper.ScheduleTime[],
    chosen: Map<string, number>,
    day: helper.Days,
    role: helper.Roles
  ): WeekPlanClass[] {
    const newList: WeekPlanClass[] = [];
    const skipTheTime = [helper.Roles.Dishwasher, helper.Roles.Bar];

    // Iterate over the availability list
    for (let i = 0; i < list.length && newList.length < logic.length; i++) {
      const availability = list[i];
      const userId = availability.userId;

      // Find the user corresponding to the availability
      const user = users.find((user) => user.id === userId);
      if (!user) continue;

      // Check if the user has exceeded the maximum days chosen
      const chosenCount = chosen.get(userId) || 0;
      if (chosenCount >= user.maxDays) continue;

      // Determine the time based on conditions
      let time = logic[newList.length];
      if (
        day === helper.Days.Monday &&
        newList.length === 0 &&
        !skipTheTime.includes(role)
      ) {
        time = helper.ScheduleTime.StartAtOne;
      }

      // Create a new PersonClass instance and add it to the newList
      const newPerson = WeekPlanClass.new(
        userId,
        availability.weeklyId,
        helper.getDayEnumToStr(day),
        helper.getScheduleTimeEnumToStr(time)
      );
      newList.push(newPerson);

      // Update the chosen count
      chosen.set(userId, chosenCount + 1);
    }

    return newList;
  }
}
