"use server";

import { authoriseUser } from "../auth";
import Car from "../models/car.model";
import { connectToDB } from "../mongoose";
import { formatCapacity, formatCarData, formatTypes } from "@/utils";

interface CreateCarDataProps {
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
  const user = await authoriseUser();
  if (!user) {
    throw new Error("User not authorised to create car");
  }

  const fullCarData = { owner: user.userId, ...carData };

  await connectToDB();
  try {
    await Car.create(fullCarData);
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

export async function getAllCars() {
  await connectToDB();
  try {
    const cars = await Car.find();
    return cars;
  } catch (error) {
    throw new Error(`Failed to get all cars: ${error}`);
  }
}

export async function deleteAllCars() {
  await connectToDB();
  try {
    await Car.deleteMany();
    return {
      status: 200,
      message: "All cars deleted successfully",
    };
  } catch (error) {
    throw new Error(`Failed to delete all cars: ${error}`);
  }
}

interface SearchParams {
  name?: string;
  maxPrice: string;
  type?: string;
  capacity?: string;
}

export async function fetchSearchResults({
  searchQuery,
}: {
  searchQuery: SearchParams;
}) {
  await connectToDB();

  const parsedMaxPrice = parseInt(searchQuery?.maxPrice, 10);
  const maxPrice = isNaN(parsedMaxPrice) ? 200 : parsedMaxPrice;
  const name = searchQuery?.name ?? "";
  const formattedTypes = formatTypes(searchQuery?.type);
  const capacityArray = formatCapacity(searchQuery?.capacity);

  try {
    const cars = await Car.find({
      name: { $regex: name, $options: "i" },
      type: { $in: formattedTypes },
      peopleCapacity: { $in: capacityArray },
      dailyPrice: { $lte: maxPrice },
    })
      .limit(6)
      .exec();

    const formattedCarsArray = cars.map((car) => {
      return formatCarData(car);
    });

    return formattedCarsArray;
  } catch (error) {
    throw new Error(`Failed to fetch search results: ${error}`);
  }
}
