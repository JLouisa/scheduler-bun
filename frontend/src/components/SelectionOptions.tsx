import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import * as schema from "@/lib/schema";
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
    mutationKey: ["postAvailability"],
    mutationFn: async (data: schema.Availability) => {
      const result = await DAL.postAvailability(data);
      return result;
    },
    onSuccess: (result: schema.Availability) => {
      setSpotsId(result.id);
      setTimeValue(result.time);
      toast({
        title: `Update successful`,
        description: `${capitalizeFirstLetter(user.firstName)}: ${day}, ${
          result.time
        }`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: `Uh oh! Something went wrong.`,
        description: `There was a problem with your request. Please try again. ${error.message}`,
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
      const available: schema.Availability = schema.AvailabilityClass.new(
        user.id as string,
        day,
        e.target.value,
        spotsId ? spotsId : undefined
      );
      updateAvailability.mutate(available);
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
