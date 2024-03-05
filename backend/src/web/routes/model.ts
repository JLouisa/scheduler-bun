import { t } from "elysia";
import { ScheduleTime, Days, Roles } from "../../domain/types";

const day = [
  t.Literal(Days.Monday),
  t.Literal(Days.Tuesday),
  t.Literal(Days.Wednesday),
  t.Literal(Days.Thursday),
  t.Literal(Days.Friday),
  t.Literal(Days.Saturday),
  t.Literal(Days.Sunday),
];

const time = [
  t.Literal(ScheduleTime.Available),
  t.Literal(ScheduleTime.StartAtOne),
  t.Literal(ScheduleTime.FromOneToFive),
  t.Literal(ScheduleTime.StartAtThree),
  t.Literal(ScheduleTime.FromThreeToFive),
  t.Literal(ScheduleTime.StartAtFive),
  t.Literal(ScheduleTime.StartAtSix),
  t.Literal(ScheduleTime.OnCallAtFiveStartAtSix),
  t.Literal(ScheduleTime.OnCallAtFive),
  t.Literal(ScheduleTime.OnCallAtSix),
  t.Literal(ScheduleTime.Free),
];

const role = [
  t.Literal(Roles.Management),
  t.Literal(Roles.Griller),
  t.Literal(Roles.Kitchen),
  t.Literal(Roles.Dishwasher),
  t.Literal(Roles.Service),
  t.Literal(Roles.Bar),
  t.Literal(Roles.Cleaner),
  t.Literal(Roles.All),
  t.Literal(Roles.None),
];

//! Availability
export const AvailablePartialModel = t.Object({
  id: t.String(),
  time: t.Union(time),
});

export const AvailableFullModel = t.Object({
  id: t.Optional(t.String()),
  weeklyId: t.String(),
  userId: t.String(),
  day: t.Union(day),
  time: t.Union(time),
});

//! Login
export const LoginModel = t.Object({
  email: t.String(),
  password: t.String(),
  remember: t.Boolean(),
});

//! User
export const UserPartialModel = t.Object({
  firstName: t.String(),
  lastName: t.String(),
  employeeId: t.Number(),
  vast: t.Boolean(),
  admin: t.Boolean(),
  active: t.Boolean(),
  minDays: t.Number(),
  maxDays: t.Number(),
  primaryRole: t.Union(role),
  secondaryRole: t.Union(role),
});

export const UserFullModel = t.Intersect([
  t.Object({
    id: t.String(),
  }),
  UserPartialModel,
]);

//! WeekStatus
export const WeekStatusPartialModel = t.Object({
  weeklyId: t.String(),
  status: t.String(),
});

export const WeekStatusFullModel = t.Intersect([
  t.Intersect([
    t.Object({
      id: t.String(),
    }),
    WeekStatusPartialModel,
  ]),
]);
