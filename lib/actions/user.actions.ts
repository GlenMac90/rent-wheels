"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface CreateUserDataProps {
  userData: {
    username: string;
    email: string;
    password: string;
    name: string;
  };
}

interface UpdateUserDataProps {
  userEmail: string;
  userData: {
    username?: string;
    email?: string;
    password?: string;
    name?: string;
    role?: string;
    image?: string;
    bannerImage?: string;
  };
}

interface SignInDataProps {
  email: string;
  password: string;
}

export async function createUser({ userData }: CreateUserDataProps): Promise<{
  status: number;
  message: string;
  existingField?: string;
  error?: any;
}> {
  const { password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  userData.password = hashedPassword;
  await connectToDB();

  const user = await checkIfUserExists(userData.email, userData.username);
  if (user.userExists) {
    return {
      status: 409,
      existingField: user.existingField,
      message: "User already exists",
    };
  }

  try {
    await User.create(userData);
    return {
      status: 201,
      message: "User created successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: "Failed to create user",
      error: error.message,
    };
  }
}

export async function validateUserSession() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/sign-in");
  }
}

export async function checkActiveSession() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
}

export async function validateUserEmail(email: string) {
  await connectToDB();
  try {
    const userEmail = await User.findOne({ email: email.toLowerCase() });
    if (!userEmail) {
      redirect("/sign-up");
    }
  } catch (error) {
    throw new Error(`Failed to validate user email: ${error}`);
  }
}

export async function checkIfUserExists(
  email: string,
  username: string
): Promise<{ existingField?: string; userExists: boolean }> {
  await connectToDB();
  try {
    const userEmail = await User.findOne({ email: email.toLowerCase() });
    const userUsername = await User.findOne({ username });

    if (userEmail) {
      return {
        existingField: "email",
        userExists: true,
      };
    }

    if (userUsername) {
      return {
        existingField: "username",
        userExists: true,
      };
    }

    return {
      userExists: false,
    };
  } catch (error) {
    throw new Error(`Failed to check if user exists: ${error}`);
  }
}

export async function updateUser({ userEmail, userData }: UpdateUserDataProps) {
  await connectToDB();
  try {
    await User.findOneAndUpdate({ email: userEmail }, userData, {
      upsert: true,
    });
    revalidatePath("/profile");
    return {
      status: 200,
      message: "User updated successfully",
    };
  } catch (error) {
    throw new Error(`Failed to update user: ${error}`);
  }
}

export async function getUserById(userId: string): Promise<void> {
  await connectToDB();
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error(`Failed to get user by ID: ${error}`);
  }
}

export async function getUserByEmail(email: string) {
  await connectToDB();
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    return user;
  } catch (error) {
    throw new Error(`Failed to get user by email: ${error}`);
  }
}

export async function getProfileHeaderInfo() {
  await connectToDB();
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    redirect("/sign-in");
  }
  const email = session.user.email;

  try {
    const profileData = await User.findOne(
      { email: email.toLowerCase() },
      {
        image: 1,
        bannerImage: 1,
        name: 1,
        role: 1,
      }
    );
    const { image, bannerImage, name, role } = profileData;
    return {
      image,
      bannerImage,
      name,
      role,
    };
  } catch (error) {
    throw new Error(`Failed to get user by email: ${error}`);
  }
}

export async function getUserByUsername(username: string) {
  await connectToDB();
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw new Error(`Failed to get user by email: ${error}`);
  }
}

export async function deleteUser(userId: string): Promise<void> {
  await connectToDB();
  try {
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error(`Failed to delete user: ${error}`);
  }
}

export async function getAllUsers() {
  await connectToDB();
  try {
    const allUsers = await User.find();
    return allUsers;
  } catch (error) {
    throw new Error(`Failed to get all users: ${error}`);
  }
}

export async function signInUser(data: SignInDataProps) {
  await connectToDB();
  const { email, password } = data;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return {
        status: 401,
        message: "Invalid password",
      };
    }

    return {
      status: 200,
      message: "User signed in successfully",
    };
  } catch (error) {
    throw new Error(`Failed to sign in user: ${error}`);
  }
}
