import { useQuery } from "@tanstack/react-query";
import UserCard from "./components/UserCard";
import LoadingSkeletons from "../scheduleboard/components/LoadingSkeletons";
import * as DAL from "@/lib/dal";

const AdminBoard = () => {
  // Get all users from the database
  const {
    data: userData,
    isLoading: isLoadingUsers,
    error: userError,
    isError: isUserError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: DAL.getAllUsers,
  });

  if (isLoadingUsers) {
    return <LoadingSkeletons count={10} />;
  }

  if (isUserError) {
    return <div>Error loading users: {userError.message}</div>;
  }

  return (
    <>
      <UserCard users={userData} />
    </>
  );
};

export default AdminBoard;
