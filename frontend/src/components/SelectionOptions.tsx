import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectionOptions = ({
  day,
  time,
  user,
  availabilityId,
  options,
}: types.SelectionOptionsProps) => {
  const [spotsId, setSpotsId] = useState<string | undefined>(availabilityId);
  const [timeValue, setTimeValue] = useState<string>(time);

  const { toast } = useToast();

  const updateAvailability = useMutation({
    mutationKey: ["availability"],
    mutationFn: async (data: any) => {
      const result = await DAL.postAvailability(data);
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

  const deleteAvailability = useMutation({
    mutationKey: ["deleteAvailability"],
    mutationFn: async (data: string) => {
      const result = await DAL.deleteAvailability(data);
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

  function matchDay(t: string) {
    return options.includes(t);
  }

  const updateSelection = async (e: any) => {
    console.log(user.id, day, e.target.value);

    if (e.target.value === "del" && spotsId !== undefined) {
      console.log("Delete");
      deleteAvailability.mutate(spotsId);
    } else if (e.target.value !== "del") {
      console.log("Post");
      updateAvailability.mutate({
        availabilityId: spotsId ? spotsId : "",
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
          {options.map((value, index) => {
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
