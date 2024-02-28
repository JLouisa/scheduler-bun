import { z } from "zod";
import { createWeekID } from "./utils";

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
  None = "-",
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
  Cleaner = "Cleaner",
  None = "None",
  All = "All",
}

export enum WeekStatus {
  Open = "Open",
  InProgress = "In Progress",
  Pending = "Pending",
  Completed = "Completed",
}

// Define the schema for user data
export const UserSchema = z.object({
  id: z.string().uuid().or(z.undefined()),
  firstName: z.string(),
  lastName: z.string(),
  employeeId: z.number().int().max(9999).min(0).nonnegative(),
  vast: z.boolean(),
  admin: z.boolean(),
  active: z.boolean(),
  minDays: z.number().int().min(0).nonnegative(),
  maxDays: z.number().int().max(7).min(0).nonnegative(),
  primaryRole: z.nativeEnum(Roles),
  secondaryRole: z.nativeEnum(Roles),
});
export type User = z.infer<typeof UserSchema>;

export class UserClass implements User {
  constructor(
    public id: string | undefined,
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
    id: undefined = undefined
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
      user.id as string,
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
  id: z.string().uuid().or(z.undefined()),
  weeklyId: z.string(),
  userId: z.string(),
  day: z.nativeEnum(Days),
  time: z.nativeEnum(ScheduleTime),
  createdAt: z.string().optional(),
});
export type Availability = z.infer<typeof AvailabilitySchema>;

export class AvailabilityClass implements Availability {
  constructor(
    public id: string | undefined,
    public weeklyId: string,
    public userId: string,
    public day: Days,
    public time: ScheduleTime,
    public createdAt?: string
  ) {}
  static new(
    userId: string,
    day: Days,
    time: ScheduleTime,
    id: string | undefined = undefined
  ): AvailabilityClass {
    return new AvailabilityClass(id, createWeekID(), userId, day, time);
  }

  static serverIn(availability: Availability): AvailabilityClass {
    return new AvailabilityClass(
      availability.id as string,
      availability.weeklyId,
      availability.userId,
      availability.day,
      availability.time,
      availability.createdAt
    );
  }
}

export const LoginEmailSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  remember: z.boolean(),
});
export type LoginEmail = z.infer<typeof LoginEmailSchema>;

export class LoginClass implements LoginEmail {
  constructor(
    public email: string,
    public password: string,
    public remember: boolean
  ) {}

  static new(email: string, password: string, remember: boolean) {
    return new LoginClass(email, password, remember);
  }
}

export class WeekClass {
  constructor(
    public Monday: Availability[],
    public Tuesday: Availability[],
    public Wednesday: Availability[],
    public Thursday: Availability[],
    public Friday: Availability[],
    public Saturday: Availability[],
    public Sunday: Availability[]
  ) {}
  static new(availabilities: Availability[]): WeekClass {
    return new WeekClass(
      availabilities.filter((item: Availability) => item.day === Days.Monday),
      availabilities.filter((item: Availability) => item.day === Days.Tuesday),
      availabilities.filter(
        (item: Availability) => item.day === Days.Wednesday
      ),
      availabilities.filter((item: Availability) => item.day === Days.Thursday),
      availabilities.filter((item: Availability) => item.day === Days.Friday),
      availabilities.filter((item: Availability) => item.day === Days.Saturday),
      availabilities.filter((item: Availability) => item.day === Days.Sunday)
    );
  }
}

// Define the schema for errors returned from the server
export const ErrorSchema = z.object({
  error: z.string(),
});
export type Error = z.infer<typeof ErrorSchema>;
