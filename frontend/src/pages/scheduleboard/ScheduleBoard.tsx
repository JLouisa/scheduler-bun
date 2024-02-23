import TableSetup from "./components/TableSetup";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import LoadingSkeletons from "./components/LoadingSkeletons";
import { useState } from "react";

const ScheduleBoard = () => {
  const [theMode, setTheMode] = useState<string>("user");

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
    queryFn: () => DAL.getAllAvailabilities("2024-8"),
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

  return (
    <>
      <TableSetup
        users={userData}
        available={availabilitiesData as types.Week}
        theMode={theMode}
      />
    </>
  );
};

export default ScheduleBoard;
