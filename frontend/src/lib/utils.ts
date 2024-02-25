import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Roles } from "@/lib/types";
import { DateTime } from "luxon";

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
