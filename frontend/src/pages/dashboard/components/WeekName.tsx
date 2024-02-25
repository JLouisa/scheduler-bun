import { Button } from "@/components/ui/button";
import { createWeekID } from "@/lib/utils";

const WeekName = ({ num }: { num: number }) => {
  const weekID = createWeekID(num);
  return (
    <div className="flex justify-evenly items-center mt-4">
      <span>Week: {weekID}</span>
      <Button onClick={() => console.log(weekID)}>View</Button>
    </div>
  );
};

export default WeekName;
