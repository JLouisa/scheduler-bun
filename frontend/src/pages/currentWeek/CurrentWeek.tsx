import HeadUI from "@/components/HeadUI";
import { createWeekID } from "@/lib/utils";

const CurrentWeek = () => {
  const weeklyId = createWeekID();
  return (
    <>
      <div className="w-full">
        <HeadUI weekName="Current Week Schedule" weeklyId={weeklyId} />
      </div>
    </>
  );
};

export default CurrentWeek;
