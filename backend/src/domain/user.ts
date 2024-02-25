import { NIL as NIL_UUID } from "uuid";
import { Roles } from "./types";
import * as helper from "./types";

export class UserClass {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public employeeId: number,
    public vast: boolean,
    public admin: boolean,
    public active: boolean,
    public minDays: number,
    public maxDays: number,
    public primaryRole: Roles | string,
    public secondaryRole: Roles | string
  ) {}
  // Create a new instance of the class after validation
  static new(
    firstName: string,
    lastName: string,
    employeeId: number,
    vast: boolean,
    admin: boolean,
    active: boolean,
    minDays: number,
    maxDays: number,
    primaryRole: string,
    secondaryRole: string
  ): UserClass {
    return new UserClass(
      NIL_UUID,
      firstName,
      lastName,
      employeeId,
      vast,
      admin,
      active,
      Number(minDays),
      Number(maxDays),
      helper.getRoleStrToEnum(primaryRole),
      helper.getRoleStrToEnum(secondaryRole)
    );
  }
  // Create a new instance of the class from DB for logic work
  dbOut(): UserClass {
    return new UserClass(
      this.id,
      this.firstName,
      this.lastName,
      this.employeeId,
      this.vast,
      this.admin,
      this.active,
      this.minDays,
      this.maxDays,
      helper.getRoleStrToEnum(this.primaryRole as string),
      helper.getRoleStrToEnum(this.secondaryRole as string)
    );
  }
  // Create a new instance of the class for database insertion
  dbIn(): UserClass {
    return new UserClass(
      this.id,
      this.firstName,
      this.lastName,
      this.employeeId,
      this.vast,
      this.admin,
      this.active,
      this.minDays,
      this.maxDays,
      helper.getRoleEnumToStr(this.primaryRole as Roles),
      helper.getRoleEnumToStr(this.secondaryRole as Roles)
    );
  }
  clientIn(): UserClass {
    return new UserClass(
      this.id,
      this.firstName,
      this.lastName,
      this.employeeId,
      this.vast,
      this.admin,
      this.active,
      this.minDays,
      this.maxDays,
      helper.getRoleStrToEnum(this.primaryRole as string),
      helper.getRoleStrToEnum(this.secondaryRole as string)
    );
  }
  clientOut(): UserClass {
    return new UserClass(
      this.id,
      this.firstName,
      this.lastName,
      this.employeeId,
      this.vast,
      this.admin,
      this.active,
      this.minDays,
      this.maxDays,
      helper.getRoleEnumToStr(this.primaryRole as Roles),
      helper.getRoleEnumToStr(this.secondaryRole as Roles)
    );
  }
}
