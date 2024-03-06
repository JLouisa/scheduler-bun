import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import LoginCard from "./components/LoginCard";
import bearStore from "@/lib/bearStore";
import * as DAL from "@/lib/dal";
import * as schema from "@/lib/schema";

const Login = () => {
  const { setIsAdmin } = bearStore();
  const navigate = useNavigate();

  const loginFn = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: schema.LoginEmail) => {
      const result = await DAL.loginUser(data);
      console.log(result);
      return result;
    },
    onSuccess: () => {
      toast({
        title: `Login successful`,
      });
      navigate("/dashboard");
      setIsAdmin(true);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Username or password is incorrect. Please try again.",
      });
      setIsAdmin(false);
    },
  });

  return (
    <>
      <LoginCard loginFn={loginFn} />
    </>
  );
};

export default Login;
