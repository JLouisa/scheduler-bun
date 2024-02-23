import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import * as DAL from "@/lib/dal";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roleToString } from "@/lib/utils";
import * as types from "@/lib/types";
import RoleSelect from "./RoleSelect";

export function AddUser() {
  const createNewUser = useMutation({
    mutationKey: ["postNewUser"],
    mutationFn: async (data: any) => {
      const result = await DAL.postNewUser(data);
      return result;
    },
    onSuccess: () => {
      toast({
        description: `User Created Successfully`,
      });
    },
  });

  const fields = [
    {
      label: "First name",
      id: "firstName",
      defaultValue: "Faynalie",
    },
    {
      label: "Last name",
      id: "lastName",
      defaultValue: "Osborne",
    },
    {
      label: "Empl. ID",
      id: "employeeId",
      defaultValue: "123",
    },
    {
      label: "Min Days",
      id: "minDays",
      defaultValue: "4",
    },
    {
      label: "Max Days",
      id: "maxDays",
      defaultValue: "5",
    },
  ];

  const rest = [
    {
      label: "Vast",
      id: "vast",
      defaultValue: "false",
    },
    {
      label: "Active",
      id: "active",
      defaultValue: "true",
    },
    {
      label: "Primary Role",
      id: "primaryRole",
      defaultValue: "Kitchen",
    },
    {
      label: "Secondary Role",
      id: "secondaryRole",
      defaultValue: "Service",
    },
  ];

  const roles = [
    "All",
    "Bar",
    "Dishwasher",
    "Griller",
    "Kitchen",
    "Management",
    "None",
    "Service",
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(`e`);
    console.log(e);
    const dataObj: types.NewUserT = {
      firstName: e.target[0].value,
      lastName: e.target[1].value,
      employeeId: Number(e.target[2].value),
      admin: false,
      vast: e.target[6].checked,
      active: e.target[8].checked,
      minDays: Number(e.target[3].value),
      maxDays: Number(e.target[4].value),
      primaryRole: e.target[10].value,
      secondaryRole: e.target[12].value,
    };
    console.log(dataObj);
    createNewUser.mutate(dataObj);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full text-center">Add Users</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Add Users</DialogTitle>
          <DialogDescription>
            Add users to the system by filling out the form below.
          </DialogDescription>
        </DialogHeader>

        <form id="AddNewUserForm" onSubmit={(e) => handleSubmit(e)}>
          <div className="grid gap-4 py-4">
            {fields.map((field) => (
              <div
                className="grid grid-cols-4 items-center gap-4"
                key={field.id}
              >
                <Label htmlFor={field.id} className="text-right">
                  {field.label}
                </Label>
                <Input
                  type={
                    field.id === "maxDays" ||
                    field.id === "minDays" ||
                    field.id === "employeeId"
                      ? "number"
                      : "text"
                  }
                  id={field.id}
                  defaultValue={field.defaultValue}
                  className="col-span-3"
                  required
                />
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2 mx-auto">
            <Checkbox id="vast" />
            <label
              htmlFor="vast"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Vast User
            </label>
            <Checkbox id="active" />
            <label
              htmlFor="active"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Active User
            </label>
          </div>
          <RoleSelect id="primaryRole" roles={roles} />
          <RoleSelect id="secondaryRole" roles={roles} />
        </form>

        <DialogFooter>
          <Button
            form="AddNewUserForm"
            className="w-full text-center"
            type="submit"
          >
            Save new user
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddUser;
