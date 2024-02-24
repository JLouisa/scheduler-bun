// import TableSetup from "./components/TableSetup";
import TableSetup from "@/components/TableSetup";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import LoadingSkeletons from "./components/LoadingSkeletons";
import { useState } from "react";
import { createWeekID } from "@/lib/utils";

const RawWeek = () => {
  const [weeklyId, setWeeklyId] = useState<string>(createWeekID());

  // Queries
  const {
    data: userData,
    isLoading: isLoadingUsers,
    error: userError,
    isError: isUserError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: DAL.getAllUsers,
  });

  const {
    data: availabilitiesData,
    isLoading: isLoadingAvailabilities,
    error: availabilityError,
    isError: isAvailabilityError,
  } = useQuery({
    queryKey: ["weekPlans"],
    queryFn: () => DAL.getAllWeeks(weeklyId),
  });

  const adminOptions = [
    "Available",
    "13",
    "13-17",
    "15",
    "15-17",
    "17",
    "18",
    "(17)18",
    "(17)",
    "(18)",
    "Free",
  ];

  if (!isLoadingUsers && !isLoadingAvailabilities) {
    console.log(`react-query is done loading`);
    console.log(userData);
    console.log(availabilitiesData);
  }

  if (isLoadingUsers || isLoadingAvailabilities) {
    return <LoadingSkeletons count={10} />;
  }

  if (isUserError || isAvailabilityError) {
    return (
      <>
        {isUserError && <div>Error loading users: {userError.message}</div>}
        {isAvailabilityError && (
          <div>Error loading availabilities: {availabilityError.message}</div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="w-full">
        <h1 className="text-xl text-center mt-4">Raw Week</h1>
        <TableSetup
          users={userData}
          available={availabilitiesData as types.Week}
          weeklyId={weeklyId}
          options={adminOptions}
        />
      </div>
    </>
  );
};

export default RawWeek;
