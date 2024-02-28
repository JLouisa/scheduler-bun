import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeekName from "./WeekName";
import { useQuery } from "@tanstack/react-query";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";

const WeekView = () => {
  const weekData = useQuery({
    queryKey: ["weekStatus"],
    queryFn: DAL.getAllWeekStatus,
  });

  if (weekData.isLoading) {
    return <div>Loading...</div>;
  }

  if (weekData.isError) {
    return <div>Error loading Week Status: {weekData.error.message}</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">View Weeks</CardTitle>
      </CardHeader>
      <CardContent>
        {weekData.data.map((week: types.WeekStatusT) => {
          return <WeekName key={week.id} weekStatus={week} />;
        })}
      </CardContent>
    </Card>
  );
};

export default WeekView;
