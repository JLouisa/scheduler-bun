import Users from "./Users";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as types from "@/lib/types";
import AddUser from "./AddUser";

type UserCardProps = {
  users: types.Users[];
};

export function UserCard({ users }: UserCardProps) {
  return (
    <Card className="w-[500px] mt-4">
      <CardHeader>
        <CardTitle className="text-center">Employees</CardTitle>
        <CardDescription className="text-center">
          Active or Inactive
        </CardDescription>
        <AddUser />
      </CardHeader>
      <CardContent>
        {users.map((user) => {
          return (
            <Users
              key={user.id}
              id={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              role={user.primaryRole}
              active={user.active}
            />
          );
        })}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}

export default UserCard;
