export interface AvailableProps {
  day: string;
  id: string;
  time: string;
  userId: string;
  weeklyId: string;
  createdAt: string;
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
  primaryRole: string;
  secondaryRole: string;
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
  primaryRole: string;
  secondaryRole: string;
}

export interface NewUserType {
  firstName: string;
  lastName: string;
  employeeId: number;
  active: boolean;
  admin: boolean;
  vast: boolean;
  minDays: number;
  maxDays: number;
  primaryRole: string;
  secondaryRole: string;
}

export interface TableSetupProps {
  users: UserProps[];
  available: Week | undefined;
  weeklyId: string;
  options: string[];
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
  user: UserProps;
  availabilityId: string | undefined;
  weeklyId?: string;
  options: string[];
}

export type LoginEmail = {
  email: string;
  password: string;
  remember: boolean;
};

export type RememberMeT = {
  rememberRef: React.MutableRefObject<boolean>;
};

export enum Roles {
  Griller,
  Kitchen,
  Bar,
  Service,
  Management,
  Dishwasher,
  None,
  All,
}

export enum WeekStatus {
  InProgress,
  Pending,
  Completed,
  Invalid,
}

export type WeekStatusT = {
  id: string;
  weeklyId: string;
  status: string | WeekStatus;
};

export type NewUserT = {
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
