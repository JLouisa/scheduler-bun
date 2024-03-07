import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Roles } from "@/lib/schema";
import { DateTime } from "luxon";
import * as types from "@/lib/types";
import * as schema from "@/lib/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Uppercase the first letter of a string
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function roleToString(role: Roles): string {
  return Roles[role];
}

export function createWeekID(num = 0) {
  const today = DateTime.local();
  const year = today.year;
  const weekNumber = today.weekNumber - num;
  return `${year}-${weekNumber < 10 ? "0" + weekNumber : weekNumber}`;
}

export function sortAllWeekPlans(finalData: types.WeekProps[]) {
  return {
    Monday: finalData.filter(
      (item: types.WeekProps) => item.day === schema.Days.Monday
    ),
    Tuesday: finalData.filter(
      (item: types.WeekProps) => item.day === schema.Days.Tuesday
    ),
    Wednesday: finalData.filter(
      (item: types.WeekProps) => item.day === schema.Days.Wednesday
    ),
    Thursday: finalData.filter(
      (item: types.WeekProps) => item.day === schema.Days.Thursday
    ),
    Friday: finalData.filter(
      (item: types.WeekProps) => item.day === schema.Days.Friday
    ),
    Saturday: finalData.filter(
      (item: types.WeekProps) => item.day === schema.Days.Saturday
    ),
    Sunday: finalData.filter(
      (item: types.WeekProps) => item.day === schema.Days.Sunday
    ),
  };
}

// Set the user in localStorage
export function createLocalStorageItem(
  obj: schema.Admin,
  name: string = "user"
) {
  // Stringify the object
  const jsonString = JSON.stringify(obj);

  // Save the stringified object in localStorage
  localStorage.setItem(name, jsonString);
}

// Get the user from localStorage
export function getLocalStorageItem(name: string = "user") {
  // Get the stringified object from localStorage
  const jsonString = localStorage.getItem(name);

  // Parse the stringified object
  return jsonString ? JSON.parse(jsonString) : null;
}

// Remove the user from localStorage
export function removeLocalStorageItem(name: string = "user") {
  localStorage.removeItem(name);
}
