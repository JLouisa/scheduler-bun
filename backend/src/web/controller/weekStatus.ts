import { WeekStatusClass } from "../../domain/weekStatus";
import * as dao from "../../database/dao";
import * as helper from "../../domain/types";
import { ErrorClass } from "../../domain/error";

type WeekStatus = {
  id: string;
  weeklyId: string;
};

//! Get all week status
export async function getLastWeekStatus() {
  return "Get all week status with weeklyId: " + helper.createWeekID();
}

//! Get one week status
export function getOneWeekStatus(id: string) {
  return "Get one week plan with id: " + id;
}

//! Create one week status
export async function createWeekStatus(body: WeekStatus) {
  return "Create one week status";
}

//! Update one week status
export async function updateWeekStatus(body: WeekStatus) {
  return "Update one week status";
}

//! Delete one week status
export async function deleteWeekStatus(id: string, set: any) {
  return "Delete one week status";
}
//! Delete all week status
export function deleteAllWeekStatus() {
  return "Delete all week status";
}
