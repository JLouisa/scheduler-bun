import { z } from "zod";

// Enums
export enum ScheduleTime {
  Available = "Available",
  StartAtOne = "13",
  FromOneToFive = "13-17",
  StartAtThree = "15",
  FromThreeToFive = "15-17",
  StartAtFive = "17",
  StartAtSix = "18",
  OnCallAtFiveStartAtSix = "(17)18",
  OnCallAtFive = "(17)",
  OnCallAtSix = "(18)",
  Free = "Free",
  None = "None",
}

export enum Days {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export enum Roles {
  Griller = "Griller",
  Kitchen = "Kitchen",
  Bar = "Bar",
  Service = "Service",
  Management = "Management",
  Dishwasher = "Dishwasher",
  None = "None",
  All = "All",
}

export enum WeekStatus {
  InProgress = "In Progress",
  Pending = "Pending",
  Completed = "Completed",
}

// Define the schema for user data
export const UserSchema = z.object({
  id: z.string().uuid().default(""),
  firstName: z.string(),
  lastName: z.string(),
  employeeId: z.number().max(9999).min(0),
  vast: z.boolean(),
  admin: z.boolean(),
  active: z.boolean(),
  minDays: z.number().min(0),
  maxDays: z.number().max(7).min(0),
  primaryRole: z.nativeEnum(Roles),
  secondaryRole: z.nativeEnum(Roles),
});
export type User = z.infer<typeof UserSchema>;

export class UserClass implements User {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public employeeId: number,
    public vast: boolean,
    public admin: boolean,
    public active: boolean,
    public minDays: number,
    public maxDays: number,
    public primaryRole: Roles,
    public secondaryRole: Roles
  ) {}

  static new(
    firstName: string,
    lastName: string,
    employeeId: number,
    vast: boolean,
    admin: boolean,
    active: boolean,
    minDays: number,
    maxDays: number,
    primaryRole: Roles,
    secondaryRole: Roles,
    id: string = ""
  ) {
    return new UserClass(
      id,
      firstName,
      lastName,
      employeeId,
      vast,
      admin,
      active,
      minDays,
      maxDays,
      primaryRole,
      secondaryRole
    );
  }

  static serverIn(user: User) {
    return new UserClass(
      user.id,
      user.firstName,
      user.lastName,
      user.employeeId,
      user.vast,
      user.admin,
      user.active,
      user.minDays,
      user.maxDays,
      user.primaryRole,
      user.secondaryRole
    );
  }
}

// Define the schema for availability data
export const AvailabilitySchema = z.object({
  id: z.string(),
  weeklyId: z.string(),
  userId: z.string(),
  day: z.string(),
  time: z.string(),
});
export type Availability = z.infer<typeof AvailabilitySchema>;

export class AvailabilityClass implements Availability {
  constructor(
    public id: string,
    public weeklyId: string,
    public userId: string,
    public day: Days | string,
    public time: ScheduleTime | string
  ) {
    this.id = id;
    this.weeklyId = weeklyId;
    this.userId = userId;
    this.day = day;
    this.time = time;
  }

  static new(
    weeklyId: string,
    userId: string,
    day: string,
    time: string,
    id: string = ""
  ): AvailabilityClass {
    return new AvailabilityClass(id, weeklyId, userId, day, time);
  }

  static serverIn(availability: Availability) {
    return new AvailabilityClass(
      availability.id,
      availability.weeklyId,
      availability.userId,
      availability.day,
      availability.time
    );
  }
}

// Define the schema for errors returned from the server
export const ErrorSchema = z.object({
  error: z.string(),
});
export type Error = z.infer<typeof ErrorSchema>;
