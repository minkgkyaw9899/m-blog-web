import { AuthContext } from "@/context/authContext";
import { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import LoginSvg from "@/assets/login.svg";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosInstance";
import { AxiosError, type AxiosResponse } from "axios";
import type { AuthResponse } from "./SignUpPage";
import { toast } from "sonner";

const schema = z.object({
  email: z.string({}).email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be at most 50 characters"),
});

type FormFields = z.infer<typeof schema>;

const SignInPage = () => {
  const { token, addUser, changeToken, saveAuthInfo } = use(AuthContext);
  const [isRememberMe, setIsRememberMe] = useState(false);

  const {
    register,
    formState: { isValid, errors },
    reset,
    handleSubmit,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (data: FormFields) => {
      const response = await axiosInstance.post<
        FormFields,
        AxiosResponse<AuthResponse>
      >("/auth/sign-in", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.meta.message);
      if (data) {
        changeToken(data.data.token);
        addUser(data.data.user);
        if (isRememberMe) {
          saveAuthInfo(data.data.token, data.data.user);
        }
      }
      reset();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.meta.message || "An error occurred");
      }
    },
  });

  const navigation = useNavigate();

  useEffect(() => {
    if (token) navigation("/");
  }, [navigation, token]);

  const onSubmit = (data: FormFields) => {
    mutate(data);
  };

  return (
    <div className="flex-1 px- py-6 lg:py-12 lg:px-28">
      <div className="flex justify-around items-center">
        {/* form  */}
        <div className="space-y-4 w-2/5">
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3 mb-28 w-full">
              <div>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                />
                <p className="text-red-400 text-sm">{errors.email?.message}</p>
              </div>
              <div>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                />
                <p className="text-red-400 text-sm">
                  {errors.password?.message}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <div className="space-x-2 mb-8">
                  <Checkbox
                    value={isRememberMe ? 1 : 0}
                    onCheckedChange={(checked) =>
                      setIsRememberMe(checked ? true : false)
                    }
                    id="remember-me"
                  />
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
              <Button disabled={isPending || !isValid}>
                Sign in <LogInIcon />
              </Button>
            </div>
          </form>

          <div className="flex gap-1">
            <p>Don't have an account?</p>
            <Link to={"/auth/sign-up"} className="text-indigo-400 font-bold">
              Sign up
            </Link>
          </div>
        </div>
        {/* image */}
        <img className="w-2/5 h-2/5 hidden md:inline" src={LoginSvg} />
      </div>
    </div>
  );
};

export default SignInPage;
