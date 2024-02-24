import * as dao from "../../database/dao";
import { ErrorClass } from "../../domain/error";
import { Roles } from "../../domain/types";
import { UserClass } from "../../domain/user";

import set from "elysia";

type CreateUserBody = {
  firstName: string;
  lastName: string;
  employeeId: number;
  admin: boolean;
  vast: boolean;
  active: boolean;
  minDays: number;
  maxDays: number;
  primaryRole: string;
  secondaryRole: string;
};

type UpdateUserBody = {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: number;
  admin: boolean;
  vast: boolean;
  active: boolean;
  minDays: number;
  maxDays: number;
  primaryRole: string;
  secondaryRole: string;
};

export async function getAllUsers() {
  return await dao.getAllUsers();
}

export async function getOneUser(id: string) {
  return await dao.getOneUser(id);
}

export async function createUser(body: CreateUserBody) {
  const user = UserClass.new(
    body.firstName.toLowerCase(),
    body.lastName.toLowerCase(),
    body.employeeId,
    body.admin,
    body.vast,
    body.active,
    body.minDays,
    body.maxDays,
    body.primaryRole,
    body.secondaryRole
  );

  const result = await dao.createOneUser(user);

  if (result instanceof ErrorClass) {
    return result.toClient();
  }

  return result.client();
}

export async function updateUser(body: UpdateUserBody, set: any) {
  const user = new UserClass(
    body.id,
    body.firstName.toLowerCase(),
    body.lastName.toLowerCase(),
    body.employeeId,
    body.vast,
    false, //body.admin,
    body.active,
    body.minDays,
    body.maxDays,
    body.primaryRole,
    body.secondaryRole
  ).create();

  if (
    user.primaryRole === Roles.Invalid ||
    user.secondaryRole === Roles.Invalid
  ) {
    set.status = 400;
    return ErrorClass.new("Invalid Role").toClient();
  }

  const result: UserClass | ErrorClass = await dao.updateOneUser(user);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.toClient();
  }

  return result.client();
}

export async function deactivateOneUserToggle(id: string) {
  return await dao.deactivateOneUserToggle(id);
}

export async function deleteOneUser(id: string, set: any) {
  const result = await dao.deleteOneUser(id);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.toClient();
  }

  return result.client();
}
