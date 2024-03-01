import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeekName from "./WeekName";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const WeekView = () => {
  const {
    data: weekData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["weekStatus"],
    queryFn: DAL.getAllWeekStatus,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {String(error)}</div>; // Render an error message
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">View Weeks</CardTitle>
      </CardHeader>
      <CardContent>
        {weekData.map((week: types.WeekStatusT) => {
          return <WeekName key={week.id} weekStatus={week} />;
        })}
      </CardContent>
    </Card>
  );
};

export default WeekView;
