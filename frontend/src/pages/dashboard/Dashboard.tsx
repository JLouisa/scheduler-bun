import { useQuery } from "@tanstack/react-query";
import UserCard from "./components/UserCard";
import LoadingSkeletons from "@/pages/dashboard/components/LoadingSkeletons";
import * as DAL from "@/lib/dal";
import ViewWeeks from "@/pages/dashboard/components/WeekViews";
import bearStore from "@/lib/bearStore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isAdmin } = bearStore();
  const navigate = useNavigate();
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

  if (isAdmin === false) {
    console.log("isAdmin: ", isAdmin);
    console.log("Unauthorized access to dashboard. Redirecting to login.");
    navigate("/login");
  }

  if (isLoadingUsers) {
    return <LoadingSkeletons count={10} />;
  }

  if (isUserError) {
    return <div>Error loading users: {userError.message}</div>;
  }

  return (
    <>
      <UserCard users={userData} refetch={refetch} />
      <ViewWeeks />
    </>
  );
};

export default Dashboard;
