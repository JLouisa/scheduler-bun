import * as helper from "../domain/types";
import { UserClass } from "../domain/user";
import { theWeekT } from "./scheduler";
import { AvailabilityClass } from "../domain/availability";
import * as library from "../lib/library";
import { WeekPlanClass } from "../domain/weekPlan";

export type Workers = {
  management: WeekPlanClass[];
  griller: WeekPlanClass[];
  bar: WeekPlanClass[];
  dishwasher: WeekPlanClass;
  kitchen: WeekPlanClass[];
  service: WeekPlanClass[];
};

export type WeekWorker = {
  monday: Workers;
  tuesday: Workers;
  wednesday: Workers;
  thursday: Workers;
  friday: Workers;
  saturday: Workers;
  sunday: Workers;
};

export type theLogicT = {
  management: helper.ScheduleTime[];
  griller: helper.ScheduleTime[];
  bar: helper.ScheduleTime[];
  dishwasher: helper.ScheduleTime[];
  kitchen: helper.ScheduleTime[];
  service: helper.ScheduleTime[];
};

export class WeekWorkerClass {
  constructor(
    public monday: WorkersClass,
    public tuesday: WorkersClass,
    public wednesday: WorkersClass,
    public thursday: WorkersClass,
    public friday: WorkersClass,
    public saturday: WorkersClass,
    public sunday: WorkersClass
  ) {}
  // prettier-ignore
  static create(
    users: UserClass[],
    week: theWeekT,
    theLogic: theLogicT,
    chosen: Map<string, number>
  ) {
    console.log(`users`)
    console.log(users)
    console.log(`week`)
    console.log(week)
    console.log(`chosen`)
    console.log(chosen)
    
    const result = new WeekWorkerClass(
      WorkersClass.create(users, week.monday, theLogic, chosen, helper.Days.Monday),
      WorkersClass.create(users, week.tuesday, theLogic, chosen, helper.Days.Tuesday),
      WorkersClass.create(users, week.wednesday, theLogic, chosen, helper.Days.Wednesday),
      WorkersClass.create(users, week.thursday, theLogic, chosen, helper.Days.Thursday),
      WorkersClass.create(users, week.friday, theLogic, chosen, helper.Days.Friday),
      WorkersClass.create(users, week.saturday, theLogic, chosen, helper.Days.Saturday),
      WorkersClass.create(users, week.sunday, theLogic, chosen, helper.Days.Sunday)
    );
    console.log(result);
    return result;
  }
}

class WorkersClass {
  constructor(
    public management: WeekPlanClass[],
    public griller: WeekPlanClass[],
    public bar: WeekPlanClass[],
    public dishwasher: WeekPlanClass[],
    public kitchen: WeekPlanClass[],
    public service: WeekPlanClass[]
  ) {}
  static create(
    users: UserClass[],
    availableListOfDay: AvailabilityClass[],
    theLogic: theLogicT,
    chosen: Map<string, number>,
    day: helper.Days
  ) {
    // prettier-ignore
    const workers = new WorkersClass(
      WeekPlanClass.createList(users, library.roleListCreator(availableListOfDay, users, helper.Roles.Management), theLogic.management,chosen, day,helper.Roles.Management),
      WeekPlanClass.createList(users, library.roleListCreator(availableListOfDay, users, helper.Roles.Griller), theLogic.griller,chosen, day,helper.Roles.Griller),
      WeekPlanClass.createList(users, library.roleListCreator(availableListOfDay, users, helper.Roles.Bar), theLogic.bar,chosen, day,helper.Roles.Bar),
      WeekPlanClass.createList(users, library.roleListCreator(availableListOfDay, users, helper.Roles.Dishwasher), theLogic.dishwasher,chosen, day,helper.Roles.Dishwasher),
      WeekPlanClass.createList(users, library.roleListCreator(availableListOfDay, users, helper.Roles.Kitchen), theLogic.kitchen,chosen, day,helper.Roles.Kitchen),
      WeekPlanClass.createList(users, library.roleListCreator(availableListOfDay, users, helper.Roles.Service), theLogic.service,chosen, day,helper.Roles.Service),
    );

    return workers;
  }
}
