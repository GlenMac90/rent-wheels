"use server";

import bcrypt from "bcrypt";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { redirect } from "next/navigation";

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

export async function createUser({
  userData,
}: CreateUserDataProps): Promise<void> {
  const { password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  userData.password = hashedPassword;
  await connectToDB();

  try {
    await User.create(userData);
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`);
  } finally {
    redirect("/");
  }
}

export async function updateUser({
  userEmail,
  userData,
}: UpdateUserDataProps): Promise<void> {
  await connectToDB();
  try {
    await User.findOneAndUpdate({ email: userEmail }, userData, {
      upsert: true,
    });
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

export async function getAllUsers() {
  await connectToDB();
  try {
    const allUsers = await User.find();
    return allUsers;
  } catch (error) {
    throw new Error(`Failed to get all users: ${error}`);
  }
}
