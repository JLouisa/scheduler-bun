import * as dao from "../../database/dao";
import { ErrorClass } from "../../domain/error";
import { Roles } from "../../domain/types";
import { UserClass } from "../../domain/user";

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

export async function getAllUsers(set: any) {
  const result = await dao.getAllUsers();

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.map((user) => user.clientOut());
}

export async function getOneUser(id: string) {
  const result = await dao.getOneUser(id);

  // Return error
  if (result instanceof ErrorClass) {
    return result.clientOut();
  }

  // Return user
  if (result instanceof ErrorClass) {
    return result.clientOut();
  }
  // Return empty array
  return result;
}

export async function createUser(body: CreateUserBody, set: any) {
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
  ).clientIn();

  if (
    user.primaryRole === Roles.Invalid ||
    user.secondaryRole === Roles.Invalid
  ) {
    set.status = 400;
    return ErrorClass.new("Invalid Role").clientOut();
  }

  const result = await dao.createOneUser(user);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.clientOut();
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
  ).clientIn();

  if (
    user.primaryRole === Roles.Invalid ||
    user.secondaryRole === Roles.Invalid
  ) {
    set.status = 400;
    return ErrorClass.new("Invalid Role").clientOut();
  }

  const result: UserClass | ErrorClass = await dao.updateOneUser(user);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.clientOut();
}

export async function deactivateOneUserToggle(id: string) {
  return await dao.deactivateOneUserToggle(id);
}

export async function deleteOneUser(id: string, set: any) {
  const result = await dao.deleteOneUser(id);

  if (result instanceof ErrorClass) {
    set.status = 400;
    return result.clientOut();
  }

  return result.clientOut();
}
