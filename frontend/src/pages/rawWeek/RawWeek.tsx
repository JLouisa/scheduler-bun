import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSkeletons from "./components/LoadingSkeletons";
import TableSetup from "@/components/TableSetup";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import { createWeekID } from "@/lib/utils";
import { useParams } from "react-router-dom";

const RawWeek = () => {
  const { id } = useParams();
  const weeklyId = id ? id : createWeekID();

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
        <div className="w-full flex justify-between items-center">
          <h1 className="text-xl text-center mt-4 flex-grow">Raw Week</h1>
          <span className="text-xl text-end">{weeklyId}</span>
        </div>
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
