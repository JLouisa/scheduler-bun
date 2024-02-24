import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RoleSelect = ({
  id,
  roles,
  theRoleP,
  theRoleS,
}: {
  id: string;
  roles: string[];
  theRoleP: string;
  theRoleS: string;
}) => {
  return (
    <div className="mt-2">
      <Label htmlFor={id} className="text-sm" />
      <Select defaultValue={id === "primaryRole" ? theRoleP : theRoleS}>
        <SelectTrigger id={id}>
          <SelectValue
            placeholder={id === "primaryRole" ? theRoleP : theRoleS}
          />
        </SelectTrigger>
        <SelectContent position="popper">
          {roles.map((role, index) => {
            if (role == "Management" && id !== "primaryRole") {
              // Do nothing
            } else if (
              (role == "None" || role == "All") &&
              id == "primaryRole"
            ) {
              // Do nothing
            } else {
              return (
                <SelectItem value={role} key={role + index}>
                  {role}
                </SelectItem>
              );
            }
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSelect;
