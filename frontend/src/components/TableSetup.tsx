import { Fragment, useState } from "react";
import { DateTime } from "luxon";
import { capitalizeFirstLetter } from "@/lib/utils";
import SelectionOptions from "@/components/SelectionOptions";
import * as types from "@/lib/types";
import * as Schema from "@/lib/schema";
import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const TableSetup = ({
  users,
  available,
  options,
  nextWeek,
}: types.TableSetupProps) => {
  const [availableWeek, setAvailableWeek] = useState(available);
  const weekNum = DateTime.local().weekNumber;

  const days = Object.values(Schema.Days);

  const getTime = (id: string, day: keyof types.Week): Schema.ScheduleTime => {
    const dayArray = availableWeek?.[day];
    const spot = dayArray?.find((item) => item.userId === id);
    return spot ? spot.time : Schema.ScheduleTime.None;
  };

  const getSpot = (id: string, day: keyof types.Week): string | undefined => {
    const dayArray = availableWeek?.[day];
    const spot = dayArray?.find((item) => item.userId === id);
    return spot?.id ?? undefined;
  };

  const roles = {
    cleaner: users.filter((user) => user.primaryRole === Schema.Roles.Cleaner),
    manager: users.filter(
      (user) => user.primaryRole === Schema.Roles.Management
    ),
    kitchen: [
      ...users.filter((user) => user.primaryRole === Schema.Roles.Griller),
      ...users.filter((user) => user.primaryRole === Schema.Roles.Kitchen),
    ],
    dishwashers: users.filter(
      (user) => user.primaryRole === Schema.Roles.Dishwasher
    ),
    service: [
      ...users.filter((user) => user.primaryRole === Schema.Roles.Bar),
      ...users.filter((user) => user.primaryRole === Schema.Roles.Service),
    ],
  };

  return (
    <Table className="mt-8 border-t-2 border-l-2 shadow-md">
      <TableCaption>A list of users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] border-r-2">{`Week ${
            weekNum < 10 ? `0` + weekNum : weekNum
          }`}</TableHead>
          <TableHead className="w-[100px] border-r-2"></TableHead>
          <TableHead className="w-[100px] border-r-2"></TableHead>
          {days.map((day) => (
            <TableHead key={day} className="w-[100px] border-r-2">
              {day}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.values(roles).map((role, index) => (
          <Fragment key={index}>
            {role.map((user) => (
              <TableRow key={user.id as string}>
                <TableCell className="font-medium border-r-2 truncate">
                  {capitalizeFirstLetter(user.firstName)}
                </TableCell>
                <TableCell className="w-[100px] border-r-2 text-center text-slate-500">
                  {user.employeeId}
                </TableCell>
                <TableCell className="w-[100px] border-r-2 text-center text-slate-500">{`${user.minDays}-${user.maxDays}`}</TableCell>
                {days.map((day) => (
                  <TableCell
                    className="w-[100px] border-r-2 text-center"
                    key={day}
                  >
                    <SelectionOptions
                      day={day}
                      time={getTime(user.id as string, day as keyof types.Week)}
                      user={user}
                      availabilityId={getSpot(
                        user.id as string,
                        day as keyof types.Week
                      )}
                      options={options}
                      nextWeek={nextWeek}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSetup;
