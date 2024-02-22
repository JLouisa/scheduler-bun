import * as dao from "../../database/dao";
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

export async function getAllUsers() {
  return await dao.getAllUsers();
}

export async function getOneUser(id: string) {
  return await dao.getOneUser(id);
}

export async function createUser(body: CreateUserBody) {
  const user = UserClass.new(
    body.firstName,
    body.lastName,
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
  return result;
}

export async function updateUser(body: UpdateUserBody) {
  const user = new UserClass(
    body.id,
    body.firstName,
    body.lastName,
    body.employeeId,
    body.vast,
    body.admin,
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
    return "Invalid Role";
  }

  return await dao.updateOneUser(user);
}

export async function deactivateOneUserToggle(id: string) {
  return await dao.deactivateOneUserToggle(id);
}
