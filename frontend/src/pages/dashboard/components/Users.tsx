import UserAvatar from "./UserAvatar";
import UserSelectActive from "./UserSelectActive";
import { capitalizeFirstLetter } from "@/lib/utils";
import * as types from "@/lib/types";
import { useState } from "react";
import AddOrEditUser from "./AddOrEditUser";

type UserProps = {
  user: types.UserProps;
  refetch: () => void;
};

const Users = ({ user, refetch }: UserProps) => {
  const [theUser, setTheUser] = useState<types.UserProps>(user);

  return (
    <div className="w-full flex justify-between items-center gap-4 mt-4">
      <UserAvatar />
      <div className="flex flex-col justify-center items-center">
        <div className="truncate">
          {capitalizeFirstLetter(theUser.firstName) +
            " " +
            capitalizeFirstLetter(theUser.lastName)}
        </div>
        <div className="text-gray-400 truncate">{theUser.primaryRole}</div>
      </div>
      <div className="flex justify-between items-center gap-4">
        <AddOrEditUser
          theUser={theUser}
          setTheUser={setTheUser}
          edit={true}
          refetch={refetch}
        />
        <UserSelectActive theUser={theUser} setTheUser={setTheUser} />
      </div>
    </div>
  );
};

export default Users;
