"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { useToast } from "@/components/ui/use-toast";
import Button from "../Button";
import { SignInFormFields, signInFormSchema } from "@/schemas";
import { signInUser } from "@/lib/actions/user.actions";

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(signInFormSchema),
  });

  const formValues = watch();

  const onSubmit: SubmitHandler<SignInFormFields> = async (data) => {
    const { email, password } = data;
    try {
      const userSession = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      const user = await signInUser({ email, password });

      if (!user || !userSession) {
        toast({
          variant: "destructive",
          title: "Problem Signing In",
          description: "Please try again",
        });
      }

      if (user.status === 404) {
        toast({
          variant: "destructive",
          title: "User not found",
          description: "Please try again with a different email",
        });
      }

      if (user.status === 401) {
        toast({
          variant: "destructive",
          title: "Invalid password",
          description: "Please try again with a different password",
        });
      }

      if (user.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error signing in user", error);
      toast({
        variant: "destructive",
        title: "Error signing in user",
        description: "Please try again",
      });
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signIn("github");
    } catch (error) {
      console.error("Error signing in with Github", error);
      toast({
        variant: "destructive",
        title: "Error signing in with Github",
        description: "Please try again",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white_gray-850 flex w-full max-w-80 flex-col gap-4 rounded-ten p-6"
    >
      <div className="flex flex-col gap-2">
        <label className="semibold-14 md:semibold-16 text-gray-900_white">
          Email
        </label>
        <div className="bg-white-200_gray-800 rounded-ten px-4 py-2">
          <input
            {...register("email")}
            autoComplete="off"
            type="email"
            className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
            value={formValues.email}
            placeholder="Enter your email address"
          />
        </div>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="semibold-14 md:semibold-16 text-gray-900_white">
          Password
        </label>
        <div className="bg-white-200_gray-800 rounded-ten px-4 py-2">
          <input
            {...register("password")}
            autoComplete="off"
            type="password"
            className="flex w-full bg-transparent text-gray-400 outline-none"
            value={formValues.password}
            placeholder="Enter your password"
          />
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <Button height="h-10" width="w-full" submit>
        Sign In
      </Button>
      <p className="semibold-14 md:semibold-16 text-gray-900_white">
        Don&apos;t have an account?
      </p>
      <Button height="h-10" width="w-full" linkPath="/sign-up">
        Sign Up
      </Button>
      <Button height="h-10" width="w-full" handleClick={handleGithubSignIn}>
        Sign In With Github
      </Button>
    </form>
  );
};

export default SignInForm;
