"use server";

import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import { getBlurData } from "@/lib/actions/image.actions";

const generateRandomAvatar = async () => {
  const avatar = faker.image.avatar();

  const { blurDataURL, width, height } = await getBlurData(avatar);
  const imageData = {
    url: avatar,
    key: avatar,
    blurDataURL,
    width,
    height,
  };

  return imageData;
};

const generateRandomBannerImage = async () => {
  const bannerImage = faker.image.urlPicsumPhotos();

  const { blurDataURL, width, height } = await getBlurData(bannerImage);
  const imageData = {
    url: bannerImage,
    key: bannerImage,
    blurDataURL,
    width,
    height,
  };

  return imageData;
};

export const createUsers = async () => {
  await connectToDB();
  try {
    const userPromises = Array.from({ length: 20 }).map(async (_, index) => {
      const encryptedPassword = await bcrypt.hash(
        `${faker.internet.password()}${index}`,
        10
      );
      const image = await generateRandomAvatar();
      const bannerImage = await generateRandomBannerImage();
      return User.create({
        username: faker.internet.userName(),
        email: `${faker.internet.email()}${index}`,
        password: encryptedPassword,
        name: faker.internet.displayName(),
        role: faker.person.jobTitle(),
        image,
        bannerImage,
      });
    });
    return await Promise.all(userPromises);
  } catch (error) {
    console.error(error);
  }
};
