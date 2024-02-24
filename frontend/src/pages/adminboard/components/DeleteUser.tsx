import { Trash2 } from "lucide-react";
import * as types from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import * as DAL from "@/lib/dal";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DeleteUserProps {
  user: types.UserProps;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteUser = ({ user, open, setOpen }: DeleteUserProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteNewUser = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: async (userId: string) => {
      const result = await DAL.deleteOneUser(userId);
      return result;
    },
    onSuccess: () => {
      toast({
        title: `${capitalizeFirstLetter(user.firstName)} ${user.lastName}`,
        description: `${capitalizeFirstLetter(
          user.firstName
        )}'s info has been Successfully deleted!`,
      });
      navigate("/admin");
      setOpen(false);
      window.location.reload();
    },
    onError: () => {
      toast({
        title: "Oops! Something went wrong!",
        description: `Could not delete ${capitalizeFirstLetter(
          user.firstName
        )}`,
      });
    },
  });

  const handleConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, user.firstName);
    if (e.target.value === user.firstName) {
      setIsConfirmed(true);
    }
  };

  const handleDelete = (userId: string) => {
    console.log("delete " + userId);
    deleteNewUser.mutate(userId);
    setIsConfirmed(false);
  };

  return (
    <div className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400">
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Trash2 className="h-4 w-4 cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">
                Delete Permanently User
              </DialogTitle>
              <DialogDescription className="text-center">
                <span className="text-red-700">
                  Are you sure you want to delete this user?
                  <br />
                  This action cannot be undone.
                </span>
                <br />
                <br />
                <span>
                  Fill in the first name to confirm:
                  <br />" {user.firstName} "
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 justify-center">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="username"
                  placeholder={user.firstName}
                  className="col-span-4 text-center"
                  onChange={(e) => handleConfirmation(e)}
                />
              </div>
            </div>
            <div className="flex justify-evenly">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsConfirmed(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="submit"
                  variant={"destructive"}
                  disabled={!isConfirmed}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete User
                </Button>
              </DialogClose>
            </div>
            <DialogFooter className="flex justify-between items-center"></DialogFooter>
          </DialogContent>
        </Dialog>
      </>
      <span className="sr-only">Delete User</span>
    </div>
  );
};

export default DeleteUser;
