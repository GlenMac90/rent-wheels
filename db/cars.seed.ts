"use server";

import { faker } from "@faker-js/faker";

import { connectToDB } from "@/lib/mongoose";
import Car, { ICar } from "@/lib/models/car.model";
import { carTypes, carCapacity } from "@/constants";
import { IUser } from "@/lib/models/user.model";

const assignRandomCarType = () => {
  const randomIndex = Math.floor(Math.random() * carTypes.length);
  return carTypes[randomIndex].label;
};

const assignRandomCarPeopleCapacity = () => {
  const randomIndex = Math.floor(Math.random() * carCapacity.length);
  return carCapacity[randomIndex].id;
};

const generateRandomFuelCapacity = () => {
  const randomDecimal = Math.random();
  const randomFuelCapacity = Math.round(randomDecimal * (80 - 30) + 30);
  return randomFuelCapacity;
};

const assignRandomTransmission = () => {
  const randomDecimal = Math.random();
  const transmission = randomDecimal < 0.5 ? "manual" : "automatic";
  return transmission;
};

const generateRandomDailyPrice = () => {
  const randomDecimal = Math.random();
  const randomPrice = Math.round(randomDecimal * (500 - 20) + 20);
  return randomPrice;
};

const generateRandomImages = () => {
  const randomImages = Array.from({ length: 3 }, () =>
    faker.image.urlLoremFlickr()
  );
  return randomImages;
};

export const createCars = async (users: IUser[]): Promise<ICar[]> => {
  await connectToDB();
  try {
    const carPromises = users.map(async (user) => {
      const shouldHaveCar = Math.random() < 0.5;
      if (shouldHaveCar) {
        const numberOfCars = Math.floor(Math.random() * 7) + 1;

        const carCreatePromises = Array.from(
          { length: numberOfCars },
          async () => {
            return Car.create({
              owner: user._id,
              name: faker.vehicle.model(),
              type: assignRandomCarType(),
              description: faker.lorem.sentence(),
              transmission: assignRandomTransmission(),
              fuelCapacity: generateRandomFuelCapacity(),
              peopleCapacity: assignRandomCarPeopleCapacity(),
              dailyPrice: generateRandomDailyPrice(),
              images: generateRandomImages(),
            });
          }
        );
        return Promise.all(carCreatePromises);
      }
      return [];
    });
    const cars = await Promise.all(carPromises);
    // Flatten the array of car arrays into a single array and filter out empty values
    console.log(cars);
    return cars.flat().filter((car) => car !== undefined) as ICar[];
  } catch (error) {
    console.error("Error seeding cars:", error);
    throw error;
  }
};
