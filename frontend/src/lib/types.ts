import * as schema from "./schema";

export enum TheWeekType {
  Current,
  Next,
  Raw,
}

export interface WeekProps {
  id: string;
  weeklyId: string;
  userId: string;
  day: string;
  time: string;
}

export interface Week {
  Monday: schema.Availability[];
  Tuesday: schema.Availability[];
  Wednesday: schema.Availability[];
  Thursday: schema.Availability[];
  Friday: schema.Availability[];
  Saturday: schema.Availability[];
  Sunday: schema.Availability[];
}

export interface TableSetupProps {
  users: schema.User[];
  available: Week | undefined;
  weeklyId: string;
  options: schema.ScheduleTime[];
  weekType: TheWeekType;
  weekPlan?: Week | undefined;
}

export type LoadingSkeletonsType = {
  count: number;
};

export interface SelectionOptionsProps {
  day: schema.Days;
  time: schema.ScheduleTime;
  user: schema.User;
  availabilityId: string | undefined;
  weeklyId?: string;
  options: schema.ScheduleTime[];
  weekType: TheWeekType;
}

export type RememberMeT = {
  rememberRef: React.MutableRefObject<boolean>;
};

export type WeekStatusT = {
  id: string;
  weeklyId: string;
  status: schema.Status;
};
