import { DateTime } from "luxon";
import { NIL as NIL_UUID } from "uuid";
import { ScheduleTime, Days } from "./types";
import * as helper from "./types";

export class AvailabilityClass {
  constructor(
    public id: string | undefined,
    public weeklyId: string,
    public userId: string,
    public day: Days | string,
    public time: ScheduleTime | string,
    public createdAt: Date
  ) {
    this.id = id;
    this.weeklyId = weeklyId;
    this.userId = userId;
    this.day = day;
    this.time = time;
    this.createdAt = createdAt;
  }
  // Create a new instance of the class after validation
  static new(
    userId: string,
    day: string,
    time: string,
    id: string | undefined = undefined
  ): AvailabilityClass {
    return new AvailabilityClass(
      id,
      helper.createWeekID(),
      userId,
      helper.getDayStrToEnum(day),
      helper.getScheduleTimeStrToEnum(time),
      DateTime.local().toJSDate()
    );
  }
  // Create a new instance of the class from DB for logic work
  dbOut(): AvailabilityClass {
    return new AvailabilityClass(
      this.id,
      this.weeklyId,
      this.userId,
      helper.getDayStrToEnum(this.day as string),
      helper.getScheduleTimeStrToEnum(this.time as string),
      this.createdAt
    );
  }
  // Create a new instance of the class for database insertion
  dbIn(): AvailabilityClass {
    return new AvailabilityClass(
      this.id,
      this.weeklyId,
      this.userId,
      helper.getDayEnumToStr(this.day as Days),
      helper.getScheduleTimeEnumToStr(this.time as ScheduleTime),
      this.createdAt
    );
  }
  clientOut(): AvailabilityClass {
    return new AvailabilityClass(
      this.id,
      this.weeklyId,
      this.userId,
      helper.getDayEnumToStr(this.day as Days),
      helper.getScheduleTimeEnumToStr(this.time as ScheduleTime),
      this.createdAt
    );
  }
  clientIn(): AvailabilityClass {
    return new AvailabilityClass(
      this.id,
      this.weeklyId,
      this.userId,
      helper.getDayStrToEnum(this.day as string),
      helper.getScheduleTimeStrToEnum(this.time as string),
      this.createdAt
    );
  }
}
