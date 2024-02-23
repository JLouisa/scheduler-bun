import UserAvatar from "./UserAvatar";
import UserSelectActive from "./UserSelectActive";

type UserProps = {
  firstName: string;
  lastName: string;
  role: string;
  active: boolean;
};

const Users = ({ firstName, lastName, role, active }: UserProps) => {
  return (
    <div className="w-full flex justify-between items-center gap-4 mt-4">
      <UserAvatar />
      <div>
        <span className="truncate text-center">
          {firstName + " " + lastName}
        </span>
        <br />
        <span className="text-gray-400 text-center truncate">{role}</span>
      </div>
      <UserSelectActive active={active} />
    </div>
  );
};

export default Users;