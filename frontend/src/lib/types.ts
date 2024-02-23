import { boolean } from "zod";

export interface AvailableProps {
  createdAt: string;
  day: string;
  id: string;
  time: string;
  userId: string;
  weeklyId: string;
}

export interface WeekProps {
  id: string;
  weeklyId: string;
  userId: string;
  day: string;
  time: string;
}

export interface Week {
  Monday: AvailableProps[];
  Tuesday: AvailableProps[];
  Wednesday: AvailableProps[];
  Thursday: AvailableProps[];
  Friday: AvailableProps[];
  Saturday: AvailableProps[];
  Sunday: AvailableProps[];
}

export interface Users {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: number;
  active: boolean;
  admin: boolean;
  vast: boolean;
  minDays: number;
  maxDays: number;
  primaryRole: number;
  secondaryRole: number;
}

export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: number;
  active: boolean;
  admin: boolean;
  vast: boolean;
  minDays: number;
  maxDays: number;
  primaryRole: number;
  secondaryRole: number;
}

export interface TableSetupProps {
  users: UserProps[];
  available: Week | undefined;
  theMode: string;
  weeklyId: string;
}

export type postAvailability = {
  availabilityId: string;
  userId: string;
  day: string;
  time: string;
};

export type LoadingSkeletonsType = {
  count: number;
};

export interface SelectionOptionsProps {
  day: string;
  time: string;
  mode: string;
  user: UserProps;
  availabilityId: string | undefined;
  weeklyId?: string;
}

export type LoginEmail = {
  email: string;
  password: string;
  remember: boolean;
};

export type RememberMeT = {
  rememberRef: React.MutableRefObject<boolean>;
};
