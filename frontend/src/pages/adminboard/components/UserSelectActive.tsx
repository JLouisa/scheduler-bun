import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import * as DAL from "@/lib/dal";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import * as types from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/utils";

type UserSelectActiveProps = {
  id: string;
  active: boolean;
};

export function UserSelectActive({ id, active }: UserSelectActiveProps) {
  const [activeState, setActiveState] = useState<boolean | undefined>(active);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  //Send activeState to the backend
  const toggleUserActiveState = useMutation({
    mutationKey: ["toggleUserActiveState"],
    mutationFn: async (userId: string) => {
      const result = await DAL.deactivateUser(userId);
      return result;
    },
    onSuccess: (user: types.UserProps) => {
      toast({
        description: `${capitalizeFirstLetter(
          user.firstName
        )} has been successfully ${user.active ? "Activated" : "Deactivated"}`,
      });
      console.log(user.active);
      setActiveState(user.active);
      setDisableBtn(false);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: `Error: ${error}`,
      });
      setDisableBtn(false);
    },
  });

  const activeHandle = (e: any) => {
    setDisableBtn(true);
    console.log(e.value);
    // e.value === "Active" ? setActiveState(true) : setActiveState(false);
    toggleUserActiveState.mutate(id);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <form
        onChange={(e) => {
          activeHandle(e.target);
        }}
      >
        <Select>
          <SelectTrigger disabled={disableBtn} id="framework">
            <SelectValue placeholder={activeState ? "Active" : "Inactive"} />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </form>
    </div>
  );
}

export default UserSelectActive;
