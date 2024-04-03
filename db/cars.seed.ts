"use server";

import { faker } from "@faker-js/faker";

import { connectToDB } from "@/lib/mongoose";
import Car, { ICar } from "@/lib/models/car.model";
import { carTypes, carCapacity } from "@/constants";
import { IUser } from "@/lib/models/user.model";
import { getBlurData } from "@/lib/actions/image.actions";

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

const generateRandomImages = async () => {
  const imageDataArray = [];
  const randomImages = Array.from({ length: 3 }, () =>
    faker.image.urlLoremFlickr({ category: "cars" })
  );

  for (const img of randomImages) {
    const { blurDataURL, width, height } = await getBlurData(img);
    imageDataArray.push({
      url: img,
      key: img,
      blurDataURL,
      width,
      height,
    });
  }
  return imageDataArray;
};

const getRandomUsers = (users: IUser[]) => {
  let count = 0;
  const randomNumber = Math.round(Math.random() * 7);
  const randomUsers: string[] = [];
  while (count < randomNumber) {
    const randomIndex = Math.floor(Math.random() * users.length);
    if (randomUsers.includes(users[randomIndex].id)) return;
    randomUsers.push(users[randomIndex].id);
    count++;
  }
  return randomUsers;
};

export const createCars = async (users: IUser[]): Promise<ICar[]> => {
  await connectToDB();
  try {
    const carPromises = users.map(async (user) => {
      const shouldHaveCar = Math.random() < 0.8;
      if (shouldHaveCar) {
        const numberOfCars = Math.floor(Math.random() * 3) + 1;
        const randomListOfUsers = getRandomUsers(users);

        const carCreatePromises = Array.from(
          { length: numberOfCars },
          async () => {
            const imageData = await generateRandomImages();
            return Car.create({
              owner: user._id,
              name: faker.vehicle.model(),
              type: assignRandomCarType(),
              description: faker.lorem.sentence(),
              transmission: assignRandomTransmission(),
              fuelCapacity: generateRandomFuelCapacity(),
              peopleCapacity: assignRandomCarPeopleCapacity(),
              dailyPrice: generateRandomDailyPrice(),
              imageData,
              likedBy: randomListOfUsers,
            });
          }
        );
        return Promise.all(carCreatePromises);
      }
      return [];
    });
    const cars = await Promise.all(carPromises);
    const flattenedCars = cars
      .flat()
      .filter((car) => car !== undefined) as ICar[];
    return flattenedCars;
  } catch (error) {
    console.error("Error seeding cars:", error);
    throw error;
  }
};
