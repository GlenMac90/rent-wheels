"use server";

import { ImageDataArrayType } from "@/types/car.index";
import { authoriseUser } from "../auth";
import Car from "../models/car.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { formatCapacity, formatCarData, formatTypes } from "@/utils";
import { revalidatePath } from "next/cache";

interface CreateCarDataProps {
  name: string;
  type: string;
  description: string;
  transmission: string;
  fuelCapacity: number;
  peopleCapacity: number;
  dailyPrice: number;
  imageData: ImageDataArrayType[];
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
  if (!user || !user.userId) {
    throw new Error("User not authorised to create car");
  }

  const fullCarData = { owner: user.userId, ...carData };

  await connectToDB();
  try {
    const newCar = await Car.create(fullCarData);

    await User.findByIdAndUpdate(user?.userId, {
      $addToSet: { ownedCars: newCar._id },
    });

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
  const user = await authoriseUser();

  try {
    const cars = await Car.find().limit(4).exec();
    console.log(cars);
    const formattedCarsArray = cars.map((car) => {
      return formatCarData({ data: car, userId: user?.userId });
    });
    return formattedCarsArray;
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

export async function toggleLike({
  carId,
  path,
}: {
  carId: string;
  path: string;
}) {
  await connectToDB();
  const user = await authoriseUser();
  if (!user) {
    throw new Error("User not authorised");
  }

  try {
    const car = await Car.findById(carId);

    if (!car) {
      throw new Error("Car not found");
    }

    const index = car.likedBy.indexOf(user.userId);
    let update;
    let likedStatus;

    if (index === -1) {
      likedStatus = true;
      update = { $addToSet: { likedBy: user.userId } };
    } else {
      likedStatus = false;
      update = { $pull: { likedBy: user.userId } };
    }

    const updatedCar = await Car.findByIdAndUpdate(carId, update, {
      new: true,
    });

    revalidatePath(path);

    return {
      carId: updatedCar._id.toString(),
      likedStatus,
    };
  } catch (error) {
    throw new Error(`Failed to ${path} car: ${error}`);
  }
}

export interface SearchParams {
  name?: string;
  maxPrice: string;
  type?: string;
  capacity?: string;
  page?: string;
}

export async function fetchSearchResults({
  searchQuery,
}: {
  searchQuery: SearchParams;
}) {
  await connectToDB();

  const user = await authoriseUser();
  if (!user) {
    throw new Error("User not authorised");
  }

  const parsedMaxPrice = parseInt(searchQuery?.maxPrice, 10);
  const maxPrice = isNaN(parsedMaxPrice) ? 200 : parsedMaxPrice;
  const name = searchQuery?.name ?? "";
  const formattedTypes = formatTypes(searchQuery?.type);
  const capacityArray = formatCapacity(searchQuery?.capacity);
  const page = (searchQuery.page && parseInt(searchQuery?.page, 10)) || 1;

  const carsToFetch = page * 6;

  const queryObject = {
    name: { $regex: name, $options: "i" },
    type: { $in: formattedTypes },
    peopleCapacity: { $in: capacityArray },
    dailyPrice: { $lte: maxPrice },
  };

  try {
    const cars = await Car.find(queryObject).limit(carsToFetch).exec();
    const availableCars = await Car.countDocuments(queryObject).exec();

    const moreCarsAvailable = availableCars > carsToFetch + cars.length;

    const formattedCarsArray = cars.map((car) => {
      return formatCarData({
        data: car,
        userId: user?.userId,
      });
    });

    return {
      cars: formattedCarsArray,
      moreCars: moreCarsAvailable,
    };
  } catch (error) {
    throw new Error(`Failed to fetch search results: ${error}`);
  }
}
