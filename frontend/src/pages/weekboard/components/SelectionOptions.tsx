import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import * as DAL from "@/lib/dal";
import { useToast } from "@/components/ui/use-toast";
import * as types from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils";

const SelectionOptions = ({
  day,
  time,
  mode,
  user,
  availabilityId,
  weeklyId,
}: types.SelectionOptionsProps) => {
  const [spotsId, setSpotsId] = useState<string | undefined>(availabilityId);
  const [timeValue, setTimeValue] = useState<string>(time);

  const { toast } = useToast();

  const updateWeekAvailability = useMutation({
    mutationKey: ["updateOnWeekAvailability"],
    mutationFn: async (data: types.WeekProps) => {
      const result = await DAL.postOneWeek(data);
      return result;
    },
    onSuccess: (data) => {
      setSpotsId(data.id);
      setTimeValue(data.time);
      toast({
        title: `Update successful`,
        description: `${capitalizeFirstLetter(user.firstName)}: ${day}, ${
          data.time
        }`,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: `Uh oh! Something went wrong.`,
        description: "There was a problem with your request. Please try again.",
      });
    },
  });

  const deleteWeekAvailability = useMutation({
    mutationKey: ["deleteWeekAvailability"],
    mutationFn: async (data: string) => {
      const result = await DAL.deleteWeekAvailability(data);
      return result;
    },
    onSuccess: () => {
      setSpotsId(undefined);
      setTimeValue("-");

      toast({
        description: `Deletion successful`,
      });
    },
  });

  const userValues = ["Available", "13", "15", "17", "Free"];
  const adminValues = [
    "Available",
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
  const adminValues2 = [
    "13",
    "13-17",
    "15",
    "15-17",
    "17",
    "18",
    "(17)18",
    "(17)",
    "(18)",
  ];

  function matchDay(t: string) {
    return mode === "user" ? userValues.includes(t) : adminValues.includes(t);
  }

  const updateSelection = async (e: any) => {
    console.log(user.id, day, e.target.value);

    if (e.target.value === "del" && spotsId !== undefined) {
      console.log("Delete");
      console.log(spotsId);
      deleteWeekAvailability.mutate(spotsId);
    } else if (e.target.value !== "del") {
      console.log("Post WeekAvailability");
      console.log(weeklyId, spotsId, user.id, day, e.target.value);
      updateWeekAvailability.mutate({
        id: spotsId ? spotsId : "",
        weeklyId: weeklyId as string,
        userId: user.id,
        day,
        time: e.target.value,
      });
    }
  };

  return (
    <form
      onChange={(e) => {
        updateSelection(e);
      }}
    >
      <Select>
        <SelectTrigger className="w-full text-center">
          <SelectValue placeholder={matchDay(timeValue) ? timeValue : "-"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="del">-</SelectItem>
          {(mode === "user" ? userValues : adminValues2).map((value, index) => {
            return (
              <SelectItem key={index} value={value}>
                {value}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </form>
  );
};

export default SelectionOptions;
