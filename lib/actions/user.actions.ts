"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import User from "../models/user.model";
import Car from "../models/car.model";
import { connectToDB } from "../mongoose";
import {
  CreateUserDataProps,
  UpdateUserDataProps,
  SignInDataProps,
} from "@/types/user.index";
import { authoriseUser } from "../auth";
import { formatCarData } from "@/utils";

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

export async function getProfileImage() {
  await connectToDB();
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) return null;
  const user = await User.findOne(
    { email: session.user.email },
    {
      image: 1,
    }
  );
  if (user.image && user.image.url) {
    return user.image.url;
  } else {
    return null;
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

    if (userEmail) {
      return {
        existingField: "email",
        userExists: true,
      };
    }

    const userUsername = await User.findOne({ username });

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

export async function updateUser({ userId, userData }: UpdateUserDataProps) {
  await connectToDB();

  const verifiedUser = await authoriseUser();
  if (!verifiedUser) {
    throw new Error("User not authorised");
  }

  const id = userId || verifiedUser.userId;

  try {
    await User.findByIdAndUpdate(id, userData, {
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

export async function deleteNonAdmins(): Promise<void> {
  await connectToDB();
  try {
    await User.deleteMany({ email: { $ne: "glen.mccallum@live.co.uk" } });
    console.log("Non-admin users deleted successfully.");
  } catch (error) {
    console.error(`Failed to delete non-admin users: ${error}`);
    throw new Error(`Failed to delete non-admin users: ${error}`);
  }
}

export async function getAllUsers() {
  await connectToDB();
  try {
    const users = await User.find();
    return users;
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

export async function getProfilePageCars() {
  await connectToDB();

  const verifiedUser = await authoriseUser();
  if (!verifiedUser) {
    throw new Error("User not authorised");
  }
  try {
    const user = await User.findById(verifiedUser.userId)
      .select("rentedCars ownedCars image bannerImage role name")
      .exec();

    const { rentedCars, ownedCars, image, bannerImage, role, name } = user;

    if (!rentedCars) {
      throw new Error("User not found");
    }

    const populatedRentedCars = await Promise.all(
      rentedCars.map(async (carId: string) => {
        const car = await Car.findById(carId).exec();
        const carData = formatCarData({
          data: car,
          userId: verifiedUser?.userId,
        });
        return carData;
      })
    );

    const populatedOwnedCars = await Promise.all(
      ownedCars.map(async (carId: string) => {
        const car = await Car.findById(carId).exec();
        const carData = formatCarData({
          data: car,
          userId: verifiedUser?.userId,
        });
        return carData;
      })
    );

    const profileData = {
      image: {
        url: image?.url,
        key: image?.key,
        blurDataURL: image?.blurDataURL,
        width: image?.width,
        height: image?.height,
      },
      bannerImage: {
        url: bannerImage?.url,
        key: bannerImage?.key,
        blurDataURL: bannerImage?.blurDataURL,
        width: bannerImage?.width,
        height: bannerImage?.height,
      },
      role,
      name,
    };

    return {
      rentedCars: populatedRentedCars ?? [],
      ownedCars: populatedOwnedCars ?? [],
      profileData,
    };
  } catch (error) {
    throw new Error(`Failed to get rented cars: ${error}`);
  }
}

export async function checkActiveSessionHasAccount(session: Session | null) {
  console.log("SESSION INFORMATION:", session);
  try {
    if (!session || !session.user) return;

    const user = await User.findOne({ email: session.user.email });

    if (user) return;

    await User.create({
      email: session.user.email,
      name: session.user.name,
      password: uuidv4(),
    });
  } catch (error) {
    throw new Error(`Failed to check active session has account: ${error}`);
  }
}
