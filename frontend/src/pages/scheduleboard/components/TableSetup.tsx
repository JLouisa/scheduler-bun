import SelectionOptions from "./SelectionOptions";
import * as types from "@/lib/types";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalizeFirstLetter } from "@/lib/utils";
import { DateTime } from "luxon";

const TableSetup = ({ users, available, theMode }: types.TableSetupProps) => {
  const weekNum = DateTime.local().weekNumber;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getTime = (id: string, day: keyof types.Week): string => {
    if (available) {
      const dayArray = available[day];
      const spot = dayArray.find((item) => item.userId === id);

      if (spot !== undefined) return spot.time;
    }
    return "-";
  };

  const getSpot = (id: string, day: keyof types.Week): string | undefined => {
    if (available) {
      const dayArray = available[day];
      const spot = dayArray.find((item) => item.userId === id);

      if (spot !== undefined) return spot.id;
    }
    return undefined;
  };

  const headCell = "w-[100px] border-r-2 text-center";
  const tableCell = "w-[100px] border-r-2 text-center";
  const lightCell = "w-[100px] border-r-2 text-center text-slate-500";
  const nameCell = "font-medium border-r-2 truncate";

  return (
    <>
      <Table className="mt-8 border-t-2 border-l-2 shadow-md">
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] border-r-2">{`Week ${
              weekNum < 10 ? `0` + weekNum : weekNum
            }`}</TableHead>
            <TableHead className={`${headCell}`}></TableHead>
            <TableHead className={`${headCell}`}></TableHead>
            {days.map((day) => {
              return (
                <TableHead key={day} className={`${headCell}`}>
                  {day}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell className={`${nameCell}`}>
                  {capitalizeFirstLetter(user.firstName)}
                </TableCell>
                <TableCell className={`${lightCell}`}>
                  {user.employeeId}
                </TableCell>
                <TableCell
                  className={`${lightCell}`}
                >{`${user.minDays}-${user.maxDays}`}</TableCell>
                {days.map((day) => {
                  return (
                    <TableCell className={`${tableCell}`} key={day}>
                      <SelectionOptions
                        day={day}
                        time={getTime(user.id, day as keyof types.Week)}
                        mode={theMode}
                        user={user}
                        availabilityId={getSpot(
                          user.id,
                          day as keyof types.Week
                        )}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default TableSetup;
