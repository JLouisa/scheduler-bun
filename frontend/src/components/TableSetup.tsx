import { Fragment } from "react";
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

const TableSetup = ({ users, available, options }: types.TableSetupProps) => {
  const weekNum = DateTime.local().weekNumber;

  const days = Object.values(Schema.Days);

  const getTime = (
    id: string,
    day: keyof types.Week
  ): Schema.ScheduleTime | string => {
    const dayArray = available?.[day];
    const spot = dayArray?.find((item) => item.userId === id);
    return spot ? `${spot.time}` : "";
  };

  const getSpot = (id: string, day: keyof types.Week): string | undefined => {
    const dayArray = available?.[day];
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
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSetup;

// import SelectionOptions from "@/components/SelectionOptions";
// import * as types from "@/lib/types";
// import * as Schema from "@/lib/schema";
// import { capitalizeFirstLetter } from "@/lib/utils";
// import { DateTime } from "luxon";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Fragment } from "react";

// const TableSetup = ({ users, available, options }: types.TableSetupProps) => {
//   const weekNum = DateTime.local().weekNumber;

//   const days = [
//     Schema.Days.Monday,
//     Schema.Days.Tuesday,
//     Schema.Days.Wednesday,
//     Schema.Days.Thursday,
//     Schema.Days.Friday,
//     Schema.Days.Saturday,
//     Schema.Days.Sunday,
//   ];

//   const getTime = (id: string, day: keyof types.Week): string => {
//     if (available) {
//       const dayArray = available[day];
//       const spot = dayArray.find((item) => item.userId === id);

//       if (spot !== undefined) return spot.time;
//     }
//     return "-";
//   };

//   const getSpot = (id: string, day: keyof types.Week): string | undefined => {
//     if (available) {
//       const dayArray = available[day];
//       const spot = dayArray.find((item) => item.userId === id);

//       if (spot !== undefined) return spot.id;
//     }
//     return undefined;
//   };

//   const headCell = "w-[100px] border-r-2 text-center";
//   const tableCell = "w-[100px] border-r-2 text-center";
//   const lightCell = "w-[100px] border-r-2 text-center text-slate-500";
//   const nameCell = "font-medium border-r-2 truncate";

//   // const cleaner = users.filter((user) => user.primaryRole === "Cleaner");
//   const grillers = users.filter(
//     (user) => user.primaryRole === Schema.Roles.Griller
//   );
//   const bar = users.filter((user) => user.primaryRole === Schema.Roles.Bar);
//   const servers = users.filter(
//     (user) => user.primaryRole === Schema.Roles.Service
//   );
//   const chefs = users.filter(
//     (user) => user.primaryRole === Schema.Roles.Kitchen
//   );

//   const managers = users.filter(
//     (user) => user.primaryRole === Schema.Roles.Management
//   );
//   const dishwashers = users.filter(
//     (user) => user.primaryRole === Schema.Roles.Dishwasher
//   );
//   const kitchen = [...grillers, ...chefs];
//   const service = [...bar, ...servers];

//   const cleaner = [
//     {
//       id: "0000-0000-0000-0000",
//       firstName: "Wilkins",
//       lastName: "",
//       employeeId: 101,
//       active: true,
//       admin: false,
//       vast: true,
//       minDays: 7,
//       maxDays: 7,
//       primaryRole: "Cleaner",
//       secondaryRole: "None",
//     },
//   ];

//   const roles = [cleaner, managers, kitchen, dishwashers, service];

//   return (
//     <>
//       <Table className="mt-8 border-t-2 border-l-2 shadow-md">
//         <TableCaption>A list of users.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px] border-r-2">{`Week ${
//               weekNum < 10 ? `0` + weekNum : weekNum
//             }`}</TableHead>
//             <TableHead className={`${headCell}`}></TableHead>
//             <TableHead className={`${headCell}`}></TableHead>
//             {days.map((day) => {
//               return (
//                 <TableHead key={day} className={`${headCell}`}>
//                   {day}
//                 </TableHead>
//               );
//             })}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {roles.map((role, index) => {
//             return (
//               <Fragment key={index}>
//                 <TableRow>
//                   <TableCell> </TableCell>
//                   <TableCell> </TableCell>
//                 </TableRow>
//                 {role.map((user) => {
//                   return (
//                     <TableRow key={user.id as string}>
//                       <TableCell className={`${nameCell}`}>
//                         {capitalizeFirstLetter(user.firstName)}
//                       </TableCell>
//                       <TableCell className={`${lightCell}`}>
//                         {user.employeeId}
//                       </TableCell>
//                       <TableCell
//                         className={`${lightCell}`}
//                       >{`${user.minDays}-${user.maxDays}`}</TableCell>
//                       {days.map((day) => {
//                         return (
//                           <TableCell className={`${tableCell}`} key={day}>
//                             <SelectionOptions
//                               day={day}
//                               time={getTime(
//                                 user.id as string,
//                                 day as keyof types.Week
//                               )}
//                               user={user}
//                               availabilityId={getSpot(
//                                 user.id as string,
//                                 day as keyof types.Week
//                               )}
//                               options={options}
//                             />
//                           </TableCell>
//                         );
//                       })}
//                     </TableRow>
//                   );
//                 })}
//               </Fragment>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </>
//   );
// };

// export default TableSetup;
