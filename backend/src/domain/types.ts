import { DateTime } from "luxon";

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
  Invalid = "Invalid",
}

export enum Days {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
  Invalid = "Invalid",
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
  Invalid = "Invalid",
}

export enum WeekStatus {
  InProgress = "In Progress",
  Pending = "Pending",
  Completed = "Completed",
  Invalid = "Invalid",
}

export type WeekStatusCollection = {
  weeklyId1: string;
  weeklyId2: string;
  weeklyId3: string;
  weeklyId4: string;
  weeklyId5: string;
};

export function createWeekID(num = 0) {
  const today = DateTime.local();
  const year = today.year;
  const weekNumber = today.weekNumber - num;
  return `${year}-${weekNumber < 10 ? "0" + weekNumber : weekNumber}`;
}

export function getRoleEnumToStr(role: Roles): string {
  return Roles[role];
}

export function getWeekStatusEnumToStr(status: WeekStatus): string {
  if (status === WeekStatus.InProgress) {
    return "In Progress";
  }

  return WeekStatus[status];
}

export function getWeekStatusStrToEnum(status: string): WeekStatus {
  switch (status) {
    case "In Progress":
      return WeekStatus.InProgress;
    case "Pending":
      return WeekStatus.Pending;
    case "Completed":
      return WeekStatus.Completed;
    default:
      return WeekStatus.Invalid;
  }
}

export function getRoleStrToEnum(role: string): Roles {
  switch (role) {
    case "Griller":
      return Roles.Griller;
    case "Kitchen":
      return Roles.Kitchen;
    case "Bar":
      return Roles.Bar;
    case "Service":
      return Roles.Service;
    case "Management":
      return Roles.Management;
    case "Dishwasher":
      return Roles.Dishwasher;
    case "None":
      return Roles.None;
    case "All":
      return Roles.All;
    default:
      return Roles.Invalid;
  }
}

export function getScheduleTimeEnumToStr(time: ScheduleTime): string {
  switch (time) {
    case "Available":
      return ScheduleTime.Available;
    case "13":
      return ScheduleTime.StartAtOne;
    case "13-17":
      return ScheduleTime.FromOneToFive;
    case "15":
      return ScheduleTime.StartAtThree;
    case "15-17":
      return ScheduleTime.FromThreeToFive;
    case "17":
      return ScheduleTime.StartAtFive;
    case "18":
      return ScheduleTime.StartAtSix;
    case "(17)18":
      return ScheduleTime.OnCallAtFiveStartAtSix;
    case "(17)":
      return ScheduleTime.OnCallAtFive;
    case "(18)":
      return ScheduleTime.OnCallAtSix;
    case "Free":
      return ScheduleTime.Free;
    default:
      return ScheduleTime.Invalid;
  }
}

export function getScheduleTimeStrToEnum(time: string): ScheduleTime {
  switch (time) {
    case "Available":
      return ScheduleTime.Available;
    case "13":
      return ScheduleTime.StartAtOne;
    case "13-17":
      return ScheduleTime.FromOneToFive;
    case "15":
      return ScheduleTime.StartAtThree;
    case "15-17":
      return ScheduleTime.FromThreeToFive;
    case "17":
      return ScheduleTime.StartAtFive;
    case "18":
      return ScheduleTime.StartAtSix;
    case "(17)18":
      return ScheduleTime.OnCallAtFiveStartAtSix;
    case "(17)":
      return ScheduleTime.OnCallAtFive;
    case "(18)":
      return ScheduleTime.OnCallAtSix;
    case "Free":
      return ScheduleTime.Free;
    default:
      return ScheduleTime.Invalid;
  }
}

export function getDayEnumToStr(day: Days): string {
  return Days[day];
}

export function getDayStrToEnum(day: string): Days {
  switch (day) {
    case "Monday" || "monday":
      return Days.Monday;
    case "Tuesday" || "tuesday":
      return Days.Tuesday;
    case "Wednesday" || "wednesday":
      return Days.Wednesday;
    case "Thursday" || "thursday":
      return Days.Thursday;
    case "Friday" || "friday":
      return Days.Friday;
    case "Saturday" || "saturday":
      return Days.Saturday;
    case "Sunday" || "sunday":
      return Days.Sunday;
    default:
      return Days.Invalid;
  }
}

export type ClientUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
};
