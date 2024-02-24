import { useQuery } from "@tanstack/react-query";
import UserCard from "./components/UserCard";
import LoadingSkeletons from "@/pages/dashboard/components/LoadingSkeletons";
import * as DAL from "@/lib/dal";

const Dashboard = () => {
  // Get all users from the database
  const {
    data: userData,
    isLoading: isLoadingUsers,
    error: userError,
    isError: isUserError,
    refetch,
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
      <UserCard users={userData} refetch={refetch} />
    </>
  );
};

export default Dashboard;
