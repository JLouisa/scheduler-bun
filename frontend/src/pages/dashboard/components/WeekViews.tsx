import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createWeekID } from "@/lib/utils";
import { DateTime } from "luxon";
import WeekName from "./WeekName";
import { useQuery } from "@tanstack/react-query";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import LoadingSkeletons from "./LoadingSkeletons";

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
    <Card className="w-[500px]">
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
