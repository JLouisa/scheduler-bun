import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createWeekID } from "@/lib/utils";
import { useParams } from "react-router-dom";
import TableSetup from "@/components/TableSetup";
import LoadingSkeletons from "./components/LoadingSkeletons";
import HeadUI from "@/components/HeadUI";
import * as schema from "@/lib/schema";
import * as types from "@/lib/types";
import * as DAL from "@/lib/dal";

const RawWeek = () => {
  const queryClient = useQueryClient();

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
    data: weekPlansData,
    isLoading: isLoadingWeekPlans,
    error: weekPlansError,
    isError: isWeekPlansError,
  } = useQuery({
    queryKey: ["weekPlans"],
    queryFn: () => DAL.getAllWeeks(weeklyId),
    refetchOnMount: "always",
    refetchOnReconnect: true,
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

  const adminOptions: schema.ScheduleTime[] = [
    schema.ScheduleTime.StartAtOne,
    schema.ScheduleTime.FromOneToFive,
    schema.ScheduleTime.StartAtThree,
    schema.ScheduleTime.FromThreeToFive,
    schema.ScheduleTime.StartAtFive,
    schema.ScheduleTime.StartAtSix,
    schema.ScheduleTime.OnCallAtFiveStartAtSix,
    schema.ScheduleTime.OnCallAtFive,
    schema.ScheduleTime.OnCallAtSix,
    schema.ScheduleTime.Free,
  ];

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["weekPlans"] });
    };
  }, []);

  if (!isLoadingUsers && !isLoadingAvailabilities && isLoadingWeekPlans) {
    console.log(`react-query is done loading`);
    console.log(userData);
    console.log(availabilitiesData);
  }

  if (isLoadingUsers) {
    return <LoadingSkeletons count={10} />;
  }

  if (isLoadingAvailabilities) {
    return <LoadingSkeletons count={10} />;
  }

  if (isLoadingWeekPlans) {
    return <LoadingSkeletons count={10} />;
  }

  if (isUserError || isAvailabilityError || isWeekPlansError) {
    return (
      <>
        {isUserError && <div>Error loading users: {userError.message}</div>}
        {isAvailabilityError && (
          <div>Error loading availabilities: {availabilityError.message}</div>
        )}
        {isWeekPlansError && (
          <div>Error loading week plans: {weekPlansError.message}</div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="w-full">
        <HeadUI
          weekName="Raw Week Schedule"
          weeklyId={weeklyId}
          weekType={types.TheWeekType.Raw}
        />
        <TableSetup
          users={userData}
          available={weekPlansData as types.Week}
          weeklyId={weeklyId}
          options={adminOptions}
          weekType={types.TheWeekType.Raw}
          weekPlan={availabilitiesData as types.Week}
        />
      </div>
    </>
  );
};

export default RawWeek;
