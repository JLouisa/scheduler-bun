import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type UserSelectActiveProps = {
  active: boolean;
};

export function UserSelectActive({ active }: UserSelectActiveProps) {
  const [activeState, setActiveState] = useState<boolean | undefined>(active);

  const activeHandle = (e: any) => {
    console.log(e.value);
    e.value === "Active" ? setActiveState(true) : setActiveState(false);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <form
        onChange={(e) => {
          activeHandle(e.target);
        }}
      >
        <Select>
          <SelectTrigger id="framework">
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
