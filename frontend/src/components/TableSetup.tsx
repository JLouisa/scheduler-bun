import SelectionOptions from "@/components/SelectionOptions";
import * as types from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import { DateTime } from "luxon";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableSetup = ({ users, available, options }: types.TableSetupProps) => {
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

  const grillers = users.filter((user) => user.primaryRole === "Griller");
  const bar = users.filter((user) => user.primaryRole === "Bar");
  const servers = users.filter((user) => user.primaryRole === "Service");
  const chefs = users.filter((user) => user.primaryRole === "Kitchen");

  const managers = users.filter((user) => user.primaryRole === "Management");
  const dishwashers = users.filter((user) => user.primaryRole === "Dishwasher");
  const kitchen = [...grillers, ...chefs];
  const service = [...bar, ...servers];

  const cleaner = [
    {
      id: "0000-0000-0000-0000",
      firstName: "Wilkins",
      lastName: "",
      employeeId: 101,
      active: true,
      admin: false,
      vast: true,
      minDays: 7,
      maxDays: 7,
      primaryRole: "Cleaner",
      secondaryRole: "None",
    },
  ];

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
          {cleaner.map((user) => {
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
                        user={user}
                        availabilityId={getSpot(
                          user.id,
                          day as keyof types.Week
                        )}
                        options={options}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell> </TableCell>
            <TableCell> </TableCell>
          </TableRow>
          {managers.map((user) => {
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
                        user={user}
                        availabilityId={getSpot(
                          user.id,
                          day as keyof types.Week
                        )}
                        options={options}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell> </TableCell>
          </TableRow>
          {dishwashers.map((user) => {
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
                        user={user}
                        availabilityId={getSpot(
                          user.id,
                          day as keyof types.Week
                        )}
                        options={options}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell> </TableCell>
          </TableRow>
          {kitchen.map((user) => {
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
                        user={user}
                        availabilityId={getSpot(
                          user.id,
                          day as keyof types.Week
                        )}
                        options={options}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell> </TableCell>
          </TableRow>
          {service.map((user) => {
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
                        user={user}
                        availabilityId={getSpot(
                          user.id,
                          day as keyof types.Week
                        )}
                        options={options}
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
