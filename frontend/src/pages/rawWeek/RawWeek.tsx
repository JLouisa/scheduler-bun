import { useEffect } from "react";
import LoadingSkeletons from "./components/LoadingSkeletons";
import TableSetup from "@/components/TableSetup";
import { createWeekID } from "@/lib/utils";
import { useParams } from "react-router-dom";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import * as schema from "@/lib/schema";
import HeadUI from "@/components/HeadUI";
import bearStore from "@/lib/bearStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";

const RawWeek = () => {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const { dev } = bearStore();
  const weeklyId = id ? id : createWeekID(dev);

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
    refetchOnMount: "always",
    refetchOnReconnect: true,
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

  if (!isLoadingUsers && !isLoadingAvailabilities) {
    console.log(`react-query is done loading`);
    console.log(userData);
    console.log(availabilitiesData);
  }

  if (isLoadingUsers) {
    return <LoadingSkeletons count={10} />;
    // return <Progress value={33} />;
  }

  if (isLoadingAvailabilities) {
    return <LoadingSkeletons count={10} />;
    // return <Progress value={66} />;
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
        <HeadUI weekName="Raw Week Schedule" weeklyId={weeklyId} />
        <TableSetup
          users={userData}
          available={availabilitiesData as types.Week}
          weeklyId={weeklyId}
          options={adminOptions}
          nextWeek={false}
        />
      </div>
    </>
  );
};

export default RawWeek;
