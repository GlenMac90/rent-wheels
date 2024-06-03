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

  // react-hook-form setup

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(signInFormSchema),
  });

  const formValues = watch();

  // form submission

  const onSubmit: SubmitHandler<SignInFormFields> = async (data) => {
    const { email, password } = data;
    try {
      const userSession = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      // sign in user

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

      // redirect user to home page

      if (user.status === 200) {
        router.push("/");
      }
    } catch (error) {
      // handle errors

      console.error("Error signing in user", error);
      toast({
        variant: "destructive",
        title: "Error signing in user",
        description: "Please try again",
      });
    }
  };

  // sign in with OAuth Provider

  const handleOAuthSignIn = async (OAuthProvider: string) => {
    try {
      await signIn(OAuthProvider);
    } catch (error) {
      console.error(`Error signing in with ${OAuthProvider}`, error);
      toast({
        variant: "destructive",
        title: `Error signing in with ${OAuthProvider}`,
        description: "Please try again",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white_gray-850 flex h-fit w-full max-w-80 flex-col gap-4 rounded-ten p-6"
    >
      {/* Email field */}

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

      {/* Password field */}

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

      {/* Sign In button */}

      <Button height="h-10" width="w-full" submit>
        Sign In
      </Button>
      <p className="semibold-14 md:semibold-16 text-gray-900_white">
        Don&apos;t have an account?
      </p>

      {/* Sign Up button */}

      <Button height="h-10" width="w-full" linkPath="/sign-up">
        Sign Up
      </Button>

      {/* Sign In with Github button */}

      <Button
        height="h-10"
        width="w-full"
        handleClick={() => handleOAuthSignIn("google")}
      >
        Sign In With Google
      </Button>

      <Button
        height="h-10"
        width="w-full"
        handleClick={() => handleOAuthSignIn("github")}
      >
        Sign In With Github
      </Button>
    </form>
  );
};

export default SignInForm;
