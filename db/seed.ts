"use server";

import { createUsers } from "./user.seed";
import { createCars } from "./cars.seed";
import { assignCarsToUsers } from "./assignCars.seed";
import { getAllUsers } from "@/lib/actions/user.actions";

export async function seedDB() {
  console.time("Execution Time");
  try {
    const users = await createUsers();
    if (!users) {
      throw new Error("Could not create users");
    }
    const cars = await createCars(users);
    if (!cars) {
      throw new Error("Could not create cars");
    }
    const allUsers = await getAllUsers();
    if (!allUsers) {
      throw new Error("Could not get all users");
    }
    await assignCarsToUsers({ allUsers, allCars: cars });
  } catch (error) {
    console.log(error);
  }
  console.timeEnd("Execution Time");
}
