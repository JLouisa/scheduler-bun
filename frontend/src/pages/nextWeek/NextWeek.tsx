import { useQuery } from "@tanstack/react-query";
import { createWeekID } from "@/lib/utils";
import LoadingSkeletons from "./components/LoadingSkeletons";
import TableSetup from "@/components/TableSetup";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import * as schema from "@/lib/schema";
import HeadUI from "@/components/HeadUI";
import bearStore from "@/lib/bearStore";

const NextWeek = () => {
  const { dev } = bearStore();
  const weeklyId = createWeekID(dev); // Place in production -> -1

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

  const userOptions: schema.ScheduleTime[] = [
    schema.ScheduleTime.Available,
    schema.ScheduleTime.StartAtOne,
    schema.ScheduleTime.StartAtThree,
    schema.ScheduleTime.StartAtFive,
    schema.ScheduleTime.Free,
  ];

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
        <HeadUI
          weekName="Next Week Schedule"
          weeklyId={weeklyId}
          weekType={types.TheWeekType.Next}
        />
        <TableSetup
          users={userData}
          available={availabilitiesData as types.Week}
          weeklyId={weeklyId}
          options={userOptions}
          weekType={types.TheWeekType.Next}
        />
      </div>
    </>
  );
};

export default NextWeek;
