import TableSetup from "./components/TableSetup";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import LoadingSkeletons from "./components/LoadingSkeletons";
import { useState } from "react";

const WeekBoard = () => {
  const [theMode, setTheMode] = useState<string>("admin");
  const [weeklyId, setWeeklyId] = useState<string>("2024-8");

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

  const dev = false;
  if (dev) return <div>Test</div>;

  return (
    <>
      <div className="w-full">
        <h1 className="text-xl text-center mt-4">Week Schedule</h1>
        <TableSetup
          users={userData}
          available={availabilitiesData as types.Week}
          theMode={theMode}
          weeklyId={weeklyId}
        />
      </div>
    </>
  );
};

export default WeekBoard;
