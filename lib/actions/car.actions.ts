"use server";

import Car from "../models/car.model";
import { connectToDB } from "../mongoose";

interface CreateCarDataProps {
  owner: string;
  name: string;
  type: string;
  description: string;
  transmission: string;
  fuelCapacity: number;
  peopleCapacity: number;
  dailyPrice: number;
  images: string[];
  users?: string[];
}

export async function createCar({
  carData,
}: {
  carData: CreateCarDataProps;
}): Promise<{
  status: number;
  message: string;
  error?: any;
}> {
  await connectToDB();
  try {
    await Car.create(carData);
    return {
      status: 201,
      message: "Car created successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: "Failed to create car",
      error: error.message,
    };
  }
}
