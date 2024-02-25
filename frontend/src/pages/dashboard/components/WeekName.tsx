import { Button } from "@/components/ui/button";
import { createWeekID } from "@/lib/utils";
import * as types from "@/lib/types";
import { useState } from "react";
import { Link } from "react-router-dom";

const WeekName = ({ weekStatus }: { weekStatus: types.WeekStatusT }) => {
  const [theWeekStatus, setTheWeekStatus] =
    useState<types.WeekStatusT>(weekStatus);
  // const weekID = createWeekID(num);
  return (
    <div className="flex justify-between items-center mt-4">
      <span>Week: {theWeekStatus.weeklyId}</span>
      <span
        className={`${
          theWeekStatus.status === "In Progress"
            ? "text-orange-700"
            : theWeekStatus.status === "Pending"
            ? "text-blue-900"
            : "text-green-700"
        } font-bold`}
      >
        {theWeekStatus.status}
      </span>
      <div>
        <Link to={`/rawweek/${theWeekStatus.weeklyId}`}>
          <Button onClick={() => console.log(theWeekStatus.weeklyId, "view")}>
            View
          </Button>
        </Link>
        <Button
          disabled={
            theWeekStatus.status === "In Progress" ||
            theWeekStatus.status === "Pending"
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
