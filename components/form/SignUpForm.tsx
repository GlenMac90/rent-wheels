"use client";

import { useState, ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpFormFields, signUpFormSchema } from "@/schemas";
import Button from "../Button";
import { createUser } from "@/lib/actions/user.actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [secondPassword, setSecondPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(signUpFormSchema),
  });

  const formValues = watch();

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    if (data.password !== secondPassword) {
      setPasswordsMatch(false);
      return;
    }
    try {
      const user = await createUser({
        userData: {
          username: data.username,
          email: data.email.toLowerCase(),
          password: data.password,
          name: data.name,
        },
      });
      if (user.status === 201) {
        router.push("/");
      }
      if (user.status === 409) {
        toast({
          variant: "destructive",
          title: `User with this ${user.existingField} already exists`,
          description: `Please try again with a different ${user.existingField}`,
        });
      }
    } catch (error) {
      console.error("Error signing up user", error);
      toast({
        variant: "destructive",
        title: "Error signing up user",
        description: "Please try again",
      });
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordsMatch(true);
    setSecondPassword(e.target.value);
  };

  return (
    <form
      className="bg-white_gray-850 flex w-full max-w-80 flex-col gap-4 rounded-ten p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label className="semibold-14 md:semibold-16 text-gray-900_white">
          Username
        </label>
        <div className="bg-white-200_gray-800 rounded-ten px-4 py-2">
          <input
            {...register("username")}
            autoComplete="off"
            type="text"
            className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
            value={formValues.username}
            placeholder="Enter your username"
          />
        </div>
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="semibold-14 md:semibold-16 text-gray-900_white">
          Email
        </label>
        <div className="bg-white-200_gray-800 rounded-ten px-4 py-2">
          <input
            {...register("email")}
            autoComplete="off"
            type="email"
            className="flex w-full bg-transparent text-gray-400 outline-none"
            value={formValues.email}
            placeholder="Enter your email Address"
          />
        </div>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="semibold-14 md:semibold-16 text-gray-900_white">
          Name
        </label>
        <div className="bg-white-200_gray-800 rounded-ten px-4 py-2">
          <input
            {...register("name")}
            autoComplete="off"
            type="text"
            className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
            value={formValues.name}
            placeholder="Enter your name"
          />
        </div>
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
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
            className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
            placeholder="Enter your password"
          />
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="semibold-14 md:semibold-16 text-gray-900_white">
          Re-enter Password
        </label>
        <div className="bg-white-200_gray-800 rounded-ten px-4 py-2">
          <input
            autoComplete="off"
            type="password"
            className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
            placeholder="Enter your password again"
            onChange={handlePasswordChange}
          />
        </div>
        {!passwordsMatch && (
          <span className="text-red-500">The passwords do not match</span>
        )}
      </div>
      <Button height="h-10" width="w-20" submit>
        Sign Up
      </Button>
      <p className="semibold-14 md:semibold-16 text-gray-900_white">
        Already have an account?
      </p>
      <Button height="h-10" width="w-20" linkPath="/sign-in">
        Sign In
      </Button>
    </form>
  );
};

export default SignUpForm;
