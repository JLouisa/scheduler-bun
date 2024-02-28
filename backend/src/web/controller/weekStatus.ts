import { WeekStatusClass } from "../../domain/weekStatus";
import * as dao from "../../database/dao/weekStatusDAO";
import * as helper from "../../domain/types";
import { ErrorClass } from "../../domain/error";

type WeekStatus = {
  weeklyId: string;
  status: string;
};

type UpdateWeekStatus = {
  id: string;
  weeklyId: string;
  status: string;
};

//! Get all week status
export async function getLastWeekStatus(set: any) {
  const collection = WeekStatusClass.collection();
  const result: WeekStatusClass[] | ErrorClass = await dao.getLastWeekStatus(
    collection
  );

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((weekStatus) => weekStatus.clientOut());
}

//! Get one week status
export async function getOneWeekStatus(id: string, set: any) {
  const result = await dao.getOneWeekStatus(id);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((weekStatus) => weekStatus.clientOut());
}

//! Create one week status
export async function createWeekStatus(body: WeekStatus, set: any) {
  const weekStatus = WeekStatusClass.new(body.weeklyId, body.status);
  const result = await dao.createOneWeekStatus(weekStatus);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((weekStatus) => weekStatus.clientOut());
}

//! Update one week status
export async function updateWeekStatus(body: UpdateWeekStatus, set: any) {
  const newWeekStatus = new WeekStatusClass(
    body.id,
    body.weeklyId,
    body.status
  );

  if (newWeekStatus.status === helper.WeekStatus.Invalid) {
    set.status = 400;
    return new ErrorClass("Invalid status");
  }

  const result: WeekStatusClass | WeekStatusClass[] | ErrorClass =
    await dao.updateOneWeekStatus(newWeekStatus);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((weekStatus) => weekStatus.clientOut());
}

//! Maintain week status
export async function maintainWeekStatus(set: any) {
  const result = await dao.maintainWeekStatus();

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }
  return result.map((weekStatus) => weekStatus.clientOut());
}

//! Delete one week status
export async function deleteWeekStatus(id: string, set: any) {
  return "Delete one week status";
}
//! Delete all week status
export function deleteAllWeekStatus(set: any) {
  return "Delete all week status";
}
