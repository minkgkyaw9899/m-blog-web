import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/authContext";
import { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import SingUpSvg from "@/assets/sign-up.svg";
import { Checkbox } from "@/components/ui/checkbox";
import { CircleChevronRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axiosInstance";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse } from "axios";

const schema = z
  .object({
    name: z
      .string({})
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z.string({}).email("Invalid email address"),
    password: z
      .string({})
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be at most 50 characters"),
    confirmPassword: z
      .string({})
      .min(6, "Confirm password must be at least 6 characters")
      .max(50, "Confirm password must be at most 50 characters"),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof schema>;

export type AuthResponse = {
  meta: {
    status: number;
    message: string;
  };
  data: {
    user: {
      id: number;
      email: string;
      name: string;
      bio: null | string;
      avatar: null | string;
      createdAt: Date;
      updatedAt: Date;
    };
    token: string;
  };
};

const SignUpPage = () => {
  const { token, addUser, changeToken, saveAuthInfo } = use(AuthContext);
  const [isRememberMe, setIsRememberMe] = useState(false);

  const navigation = useNavigate();

  useEffect(() => {
    if (token) navigation("/");
  }, [navigation, token]);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: async (data: FormFields) => {
      try {
        const response = await axiosInstance.post<
          FormFields,
          AxiosResponse<AuthResponse>
        >("/auth/sign-up", data);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data.meta.message || "An error occurred"
          );
        }
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
      reset();
    },
    onSuccess: (data) => {
      toast.success(data?.meta.message || "Account created successfully");
      if (data) {
        addUser(data.data.user);
        changeToken(data.data.token);
        if (isRememberMe) {
          saveAuthInfo(data.data.token, data.data.user);
        }
      }
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormFields) => {
    await mutateAsync(data);
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
              Create your account
            </p>
            <p className="text-slate-500 font-semibold text-sm">
              hey, welcome to your special place
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3 mb-28 w-full">
              <div>
                <Input
                  type="text"
                  {...register("name")}
                  placeholder="Full Name"
                />
                <p className="text-red-400 text-sm">{errors.name?.message}</p>
              </div>
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
              <div>
                <Input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm Password"
                />
                <p className="text-red-400 text-sm">
                  {errors.confirmPassword?.message}
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
              </div>
              <div className="flex justify-end items-center">
                <Button disabled={isPending || !isValid} type="submit">
                  {isPending ? "loading..." : "Sign Up"}{" "}
                  <CircleChevronRightIcon />
                </Button>
              </div>
            </div>
          </form>
          <div className="flex gap-1">
            <p>Already have an account?</p>
            <Link to={"/auth/sign-in"} className="text-indigo-400 font-bold">
              Sign In
            </Link>
          </div>
        </div>
        {/* image */}
        <img className="w-2/5 h-2/5 hidden md:inline" src={SingUpSvg} />
      </div>
    </div>
  );
};

export default SignUpPage;
