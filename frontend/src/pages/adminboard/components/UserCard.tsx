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
import AddOrEditUser from "./AddOrEditUser";

type UserCardProps = {
  users: types.UserProps[];
};

export function UserCard({ users }: UserCardProps) {
  return (
    <Card className="w-[500px] mt-4">
      <CardHeader>
        <CardTitle className="text-center">Employees</CardTitle>
        <CardDescription className="text-center">
          Active or Inactive
        </CardDescription>
        <AddOrEditUser edit={false} />
      </CardHeader>
      <CardContent>
        {users.map((user) => {
          return <Users user={user} key={user.id} />;
        })}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}

export default UserCard;
