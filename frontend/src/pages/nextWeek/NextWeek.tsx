import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSkeletons from "./components/LoadingSkeletons";
import TableSetup from "@/components/TableSetup";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import { createWeekID } from "@/lib/utils";

const NextWeek = () => {
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
    queryKey: ["availabilities"],
    queryFn: () => DAL.getAllAvailabilities(weeklyId),
  });

  const userOptions = ["Available", "13", "15", "17", "Free"];

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
        <h1 className="text-xl text-center mt-4">Available Schedule</h1>
        <TableSetup
          users={userData}
          available={availabilitiesData as types.Week}
          weeklyId={weeklyId}
          options={userOptions}
        />
      </div>
    </>
  );
};

export default NextWeek;
