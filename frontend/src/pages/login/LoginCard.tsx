import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RememberMe from "./components/RememberMe";
import { Link } from "react-router-dom";
import * as types from "@/lib/types";

export function LoginCard({ loginFn }: { loginFn: any }) {
  //Using Ref to hold state
  const emailRef = React.useRef("");
  const passwordRef = React.useRef("");
  const rememberRef = React.useRef<boolean>(false);

  const createLoginInfo = (
    email: string,
    password: string,
    remember: boolean
  ): types.LoginEmail => {
    return {
      email: email,
      password: password,
      remember: remember,
    };
  };

  // Post request to the server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("submitting");
    console.log(emailRef.current);
    console.log(passwordRef.current);
    console.log(rememberRef.current);

    const loginInfo = createLoginInfo(
      emailRef.current,
      passwordRef.current,
      rememberRef.current
    );

    loginFn.mutate(loginInfo);
  };

  return (
    <div className="mt-16">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Customize the schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="loginForm" onSubmit={(e) => handleSubmit(e)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="jonathan@email.com"
                  defaultValue="jonathan@email.com"
                  onChange={(e) => (emailRef.current = e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="admin123"
                  defaultValue="admin123"
                  onChange={(e) => (passwordRef.current = e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5 ">
                <RememberMe rememberRef={rememberRef} />
                <Link to="/forgot-password" className="text-primary-600">
                  Forgot your password?
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button type="submit" form="loginForm" className="w-full">
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginCard;
