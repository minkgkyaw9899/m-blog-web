import { AuthContext } from "@/context/authContext";
import React, { use, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import LoginSvg from "@/assets/login.svg";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
  const { token } = use(AuthContext);

  const navigation = useNavigate();

  useEffect(() => {
    if (token) navigation("/");
  }, [navigation, token]);

  return (
    <div className="flex-1 px- py-6 lg:py-12 lg:px-28">
      <div className="flex justify-around items-center">
        {/* form  */}
        <div className="space-y-4">
          <p className="font-semibold text-sm mb-24">M-Blog</p>

          <div className="mb-12">
            <p className="font-extrabold text-3xl text-slate-950">Hello,</p>
            <p className="font-extrabold text-3xl mb-2 text-slate-950">
              Welcome Back
            </p>
            <p className="text-slate-500 font-semibold text-sm">
              hey, welcome back to your special place
            </p>
          </div>

          <div className="space-y-3 mb-28">
            <Input name="email" placeholder="example@gmail.com" />
            <Input type="password" name="password" />

            <div className="flex justify-between items-center">
              <div className="space-x-2 mb-8">
                <Checkbox id="remember-me" />
                <label
                  htmlFor="remember-me"
                  className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember Me
                </label>
              </div>

              <label className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                forgot password?
              </label>
            </div>
            <Button>Sign in</Button>
          </div>

          <div className="flex gap-1">
            <p>Don't have an account?</p>
            <Link to={"/auth/sing-up"} className="text-indigo-400 font-bold">Sign up</Link>
          </div>
        </div>
        {/* image */}
        <img className="w-2/5 h-2/5 hidden md:inline" src={LoginSvg} />
      </div>
    </div>
  );
};

export default SignInPage;
