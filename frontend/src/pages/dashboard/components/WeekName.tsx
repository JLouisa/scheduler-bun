import { Button } from "@/components/ui/button";
import { createWeekID } from "@/lib/utils";
import * as types from "@/lib/types";
import * as schema from "@/lib/schema";
import { useState } from "react";
import { Link } from "react-router-dom";

const WeekName = ({ weekStatus }: { weekStatus: types.WeekStatusT }) => {
  const [theWeekStatus, setTheWeekStatus] =
    useState<types.WeekStatusT>(weekStatus);
  // const weekID = createWeekID(num);

  return (
    <div className="flex justify-between items-center gap-4 mt-2">
      <span>Week: {theWeekStatus.weeklyId}</span>
      <span
        className={`${
          theWeekStatus.status === schema.Status.InProgress
            ? "text-orange-700"
            : theWeekStatus.status === schema.Status.Pending
            ? "text-blue-900"
            : "text-green-700"
        } font-bold`}
      >
        {theWeekStatus.status}
      </span>
      <div className="flex justify-evenly items-center gap-4">
        <Link to={`/rawweek/${theWeekStatus.weeklyId}`}>
          <Button onClick={() => console.log(theWeekStatus.weeklyId, "view")}>
            View
          </Button>
        </Link>
        <Button
          onClick={() => console.log(theWeekStatus.weeklyId, "Calculate")}
          disabled={
            theWeekStatus.status === schema.Status.Open ||
            theWeekStatus.status === schema.Status.InProgress ||
            theWeekStatus.status === schema.Status.Pending
              ? false
              : true
          }
        >
          {theWeekStatus.status === schema.Status.Pending
            ? "Re-Calculate"
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
