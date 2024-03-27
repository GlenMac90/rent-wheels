"use server";

import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";

export const createUsers = async () => {
  await connectToDB();
  try {
    const userPromises = Array.from({ length: 20 }).map(async (_, index) => {
      const encryptedPassword = await bcrypt.hash(
        `${faker.internet.password()}${index}`,
        10
      );
      return User.create({
        username: faker.internet.userName(),
        email: `${faker.internet.email()}${index}`,
        password: encryptedPassword,
        name: faker.internet.displayName(),
        role: faker.person.jobTitle(),
        image: faker.image.avatar(),
        bannerImage: faker.image.urlPicsumPhotos(),
      });
    });
    return await Promise.all(userPromises);
  } catch (error) {
    console.log(error);
  }
};
