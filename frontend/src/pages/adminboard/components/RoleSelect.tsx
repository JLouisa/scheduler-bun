import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RoleSelect = ({ id, roles }: { id: string; roles: string[] }) => {
  return (
    <div className="mt-2">
      <Label htmlFor={id} className="text-sm" />
      <Select>
        <SelectTrigger id={id}>
          <SelectValue
            defaultValue={id === "primaryRole" ? "Service" : "None"}
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
