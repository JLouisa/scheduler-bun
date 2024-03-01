import { Button } from "@/components/ui/button";
import { createWeekID } from "@/lib/utils";
import * as types from "@/lib/types";
import * as schema from "@/lib/schema";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge, badgeVariants } from "@/components/ui/badge";

const WeekName = ({ weekStatus }: { weekStatus: types.WeekStatusT }) => {
  const [theWeekStatus, setTheWeekStatus] =
    useState<types.WeekStatusT>(weekStatus);
  // const weekID = createWeekID(num);

  return (
    <div className="flex justify-between items-center gap-4 mt-2">
      <span>Week: {theWeekStatus.weeklyId}</span>
      <Badge
        className={`${
          theWeekStatus.status === schema.Status.Open
            ? "bg-blue-500"
            : theWeekStatus.status === schema.Status.InProgress
            ? "bg-yellow-500"
            : theWeekStatus.status === schema.Status.Pending
            ? "bg-orange-700"
            : "bg-green-700"
        } font-bold`}
      >
        {theWeekStatus.status}
      </Badge>
      <div className="flex justify-evenly items-center gap-4">
        <Link to={`/rawweek/${theWeekStatus.weeklyId}`}>
          <Button onClick={() => console.log(theWeekStatus.weeklyId, "view")}>
            View
          </Button>
        </Link>
        <Button
          className="truncate"
          onClick={() => console.log(theWeekStatus.weeklyId, "Calculate")}
          disabled={
            theWeekStatus.status === schema.Status.InProgress ||
            theWeekStatus.status === schema.Status.Pending
              ? false
              : true
          }
        >
          {theWeekStatus.status === schema.Status.Pending
            ? "Re-Calc..."
            : "Calculate"}
        </Button>
        <Button
          disabled={
            theWeekStatus.status === schema.Status.Open ||
            theWeekStatus.status === schema.Status.InProgress ||
            theWeekStatus.status === schema.Status.Pending
              ? true
              : false
          }
          onClick={() => console.log(theWeekStatus.weeklyId, "download")}
          className="ml-2"
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default WeekName;
