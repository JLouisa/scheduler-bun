import { DateTime } from "luxon";

export enum ScheduleTime {
  Available,
  StartAtOne,
  FromOneToFive,
  StartAtThree,
  FromThreeToFive,
  StartAtFive,
  StartAtSix,
  OnCallAtFiveStartAtSix,
  OnCallAtFive,
  OnCallAtSix,
  Free,
  None,
  Invalid,
}

export enum Days {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
  Invalid,
}

export enum Roles {
  Griller,
  Kitchen,
  Bar,
  Service,
  Management,
  Dishwasher,
  None,
  All,
  Invalid,
}

export function createWeekID(num = 0) {
  const today = DateTime.local();
  const year = today.year;
  const weekNumber = today.weekNumber + num;
  return `${year}-${weekNumber}`;
}

export function getRoleEnumToStr(role: Roles): string {
  return Roles[role];
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
    case ScheduleTime.Available:
      return "Available";
    case ScheduleTime.StartAtOne:
      return "13";
    case ScheduleTime.FromOneToFive:
      return "13-17";
    case ScheduleTime.StartAtThree:
      return "15";
    case ScheduleTime.FromThreeToFive:
      return "15-17";
    case ScheduleTime.StartAtFive:
      return "17";
    case ScheduleTime.StartAtSix:
      return "18";
    case ScheduleTime.OnCallAtFiveStartAtSix:
      return "(17)18";
    case ScheduleTime.OnCallAtFive:
      return "(17)";
    case ScheduleTime.OnCallAtSix:
      return "(18)";
    case ScheduleTime.Free:
      return "Free";
    default:
      return "Invalid time";
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
  switch (day) {
    case Days.Monday:
      return "Monday";
    case Days.Tuesday:
      return "Tuesday";
    case Days.Wednesday:
      return "Wednesday";
    case Days.Thursday:
      return "Thursday";
    case Days.Friday:
      return "Friday";
    case Days.Saturday:
      return "Saturday";
    case Days.Sunday:
      return "Sunday";
    default:
      return "Invalid day";
  }
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
