import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import RoleSelect from "./RoleSelect";
import { useState } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteUser from "./DeleteUser";

interface EditUserProps {
  theUser?: types.UserProps;
  setTheUser?: React.Dispatch<React.SetStateAction<types.UserProps>>;
  edit: boolean;
}

const AddOrEditUser = ({ theUser, setTheUser, edit }: EditUserProps) => {
  const [isActive, setIsActive] = useState<boolean>(theUser?.active || true);
  const [isVast, setIsVast] = useState<boolean>(theUser?.vast || false);
  const [open, setOpen] = useState(false);

  const createNewUser = useMutation({
    mutationKey: [edit ? "updateNewUser" : "postNewUser"],
    mutationFn: async (data: types.UserProps | types.NewUserT) => {
      const result = edit
        ? await DAL.updateNewUser(data as types.UserProps)
        : await DAL.postNewUser(data as types.NewUserT);
      return result;
    },
    onSuccess: (user) => {
      toast({
        title: `${capitalizeFirstLetter(user.firstName)} ${user.lastName}`,
        description: `${capitalizeFirstLetter(user.firstName)}${
          edit
            ? " has been successfully Updated"
            : "'s info has been Successfully created"
        }!`,
      });
      if (edit) setTheUser!(user);
      setOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Oops! Something went wrong!",
        variant: "destructive",
        description: `Error: ${error}`,
      });
    },
  });

  const fields = [
    {
      label: "First name",
      id: "firstName",
      defaultValue: theUser?.firstName || "Faynalie",
    },
    {
      label: "Last name",
      id: "lastName",
      defaultValue: theUser?.lastName || "Osborne",
    },
    {
      label: "Empl. ID",
      id: "employeeId",
      defaultValue: theUser?.employeeId || 123,
    },
    {
      label: "Min Days",
      id: "minDays",
      defaultValue: theUser?.minDays || 4,
    },
    {
      label: "Max Days",
      id: "maxDays",
      defaultValue: theUser?.maxDays || 5,
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
    const userInfo = {
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
    const dataObj = !edit ? { ...userInfo } : { id: theUser!.id, ...userInfo };
    console.log(dataObj);
    createNewUser.mutate(dataObj);
  };

  const toggleBool = (bool: boolean, setBool: any) => {
    setBool(!bool);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {edit ? (
        <DialogTrigger asChild>
          <Button className="w-16 text-center">Edit</Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button className="w-full text-center">Add Users</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {edit && <DeleteUser user={theUser!} open={open} setOpen={setOpen} />}
          <DialogTitle className="text-center">Edit Users</DialogTitle>
          <DialogDescription>
            Edit users to the system by filling out the form below.
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
            <Checkbox
              id="vast"
              checked={isVast}
              onCheckedChange={() => toggleBool(isVast, setIsVast)}
            />
            <label
              htmlFor="vast"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Vast User
            </label>
            <Checkbox
              id="active"
              checked={isActive}
              onCheckedChange={() => toggleBool(isActive, setIsActive)}
            />
            <label
              htmlFor="active"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Active User
            </label>
          </div>
          <RoleSelect
            id="primaryRole"
            roles={roles}
            theRoleP={theUser?.primaryRole || "Service"}
            theRoleS={theUser?.secondaryRole || "None"}
          />
          <RoleSelect
            id="secondaryRole"
            roles={roles}
            theRoleP={theUser?.primaryRole || "Service"}
            theRoleS={theUser?.secondaryRole || "None"}
          />
        </form>

        <DialogFooter>
          <Button
            form="AddNewUserForm"
            className="w-full text-center"
            type="submit"
            disabled={createNewUser.isPending}
            onClick={() => setOpen(true)}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrEditUser;
