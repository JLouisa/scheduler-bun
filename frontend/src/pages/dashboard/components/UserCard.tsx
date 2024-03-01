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
import * as schema from "@/lib/schema";
import AddOrEditUser from "./AddOrEditUser";

type UserCardProps = {
  users: schema.User[];
  refetch: () => void;
};

export function UserCard({ users, refetch }: UserCardProps) {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-center">Employees</CardTitle>
        <CardDescription className="text-center">
          Active or Inactive
        </CardDescription>
        <AddOrEditUser edit={false} />
      </CardHeader>
      <CardContent>
        {users.map((user) => {
          return <Users user={user} key={user.id} refetch={refetch} />;
        })}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}

export default UserCard;
