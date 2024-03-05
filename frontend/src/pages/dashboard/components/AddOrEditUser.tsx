import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import * as DAL from "@/lib/dal";
import * as schema from "@/lib/schema";
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
  theUser?: schema.User;
  setTheUser?: React.Dispatch<React.SetStateAction<schema.User>>;
  edit: boolean;
  refetch?: () => void;
}

const AddOrEditUser = ({
  theUser,
  setTheUser,
  edit,
}: // refetch,
EditUserProps) => {
  const [isActive, setIsActive] = useState<boolean>(theUser?.active || true);
  const [isVast, setIsVast] = useState<boolean>(theUser?.vast || false);
  const [open, setOpen] = useState(false);

  const createNewUser = useMutation({
    mutationKey: [edit ? "updateNewUser" : "postNewUser"],
    mutationFn: async (data: schema.User) => {
      const result = edit
        ? await DAL.updateNewUser(data as schema.User)
        : await DAL.postNewUser(data as schema.User);
      return result;
    },
    onSuccess: (user: schema.User) => {
      toast({
        title: `${capitalizeFirstLetter(user.firstName)} ${user.lastName}`,
        description: `${capitalizeFirstLetter(user.firstName)}${
          edit
            ? " has been successfully Updated"
            : "'s info has been Successfully created"
        }!`,
      });

      if (edit) {
        setTheUser!(user);
      } else {
        window.location.reload();
        // refetch();
      }

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
      required: true,
    },
    {
      label: "Last name",
      id: "lastName",
      defaultValue: theUser?.lastName || "",
      required: false,
    },
    {
      label: "Empl. ID",
      id: "employeeId",
      defaultValue: theUser?.employeeId || 123,
      required: true,
    },
    {
      label: "Min Days",
      id: "minDays",
      defaultValue: theUser?.minDays || 4,
      required: true,
    },
    {
      label: "Max Days",
      id: "maxDays",
      defaultValue: theUser?.maxDays || 5,
      required: true,
    },
  ];

  const roles = [
    schema.Roles.Management,
    schema.Roles.Service,
    schema.Roles.Griller,
    schema.Roles.Kitchen,
    schema.Roles.Bar,
    schema.Roles.Dishwasher,
    schema.Roles.Cleaner,
    schema.Roles.All,
    schema.Roles.None,
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
          <DialogTitle className="text-center">
            {edit ? "Edit Users" : "Add Users"}
          </DialogTitle>
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
                  {field.required ? "*" : ""}
                </Label>
                <Input
                  type={
                    field.id === "maxDays" ||
                    field.id === "minDays" ||
                    field.id === "employeeId"
                      ? "number"
                      : "text"
                  }
                  max={field.id === "maxDays" ? 7 : 9999}
                  min={field.id === "minDays" ? 1 : 0}
                  id={field.id}
                  defaultValue={field.defaultValue}
                  className="col-span-3"
                  required={field.required}
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
