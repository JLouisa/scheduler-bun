import { useMutation } from "@tanstack/react-query";
import LoginCard from "./LoginCard";
import { toast } from "@/components/ui/use-toast";
import * as DAL from "@/lib/dal";
import * as types from "@/lib/types";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const loginFn = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: types.LoginEmail) => {
      const result = await DAL.loginUser(data);
      console.log(result);
      return result;
    },
    onSuccess: () => {
      toast({
        title: `Login successful`,
      });
      navigate("/admin");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: `Username or password is incorrect.`,
        description: "Uh oh! Something went wrong. Please try again.",
      });
    },
  });

  return (
    <>
      <LoginCard loginFn={loginFn} />
    </>
  );
};

export default Login;
