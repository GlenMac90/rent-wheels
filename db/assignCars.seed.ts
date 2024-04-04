"use server";

import { connectToDB } from "@/lib/mongoose";
import { updateUser } from "@/lib/actions/user.actions";
import { ICar } from "@/lib/models/car.model";
import { IUser } from "@/lib/models/user.model";

export const assignCarsToUsers = async ({
  allUsers,
  allCars,
}: {
  allUsers: IUser[];
  allCars: ICar[];
}) => {
  await connectToDB();
  try {
    for (const user of allUsers) {
      const ownedCars = allCars.reduce((acc: string[], car) => {
        if (car.owner.toString() === user._id.toString()) {
          acc.push(car._id);
        }
        return acc;
      }, []);
      const notOwnedCars = allCars.reduce((acc: string[], car) => {
        if (car.owner.toString() !== user._id.toString()) {
          acc.push(car._id);
        }
        return acc;
      }, []);
      const rentedCarCount = Math.floor(Math.random() * 10);

      const rentedCars = Array.from({ length: rentedCarCount }, () => {
        const randomIndex = Math.floor(Math.random() * notOwnedCars.length);
        return notOwnedCars.splice(randomIndex, 1)[0];
      });

      const updatedUser = await updateUser({
        userId: user._id.toString(),
        userData: {
          ownedCars,
          rentedCars,
        },
      });
      if (!updatedUser) {
        throw new Error("Could not update user");
      }
    }
  } catch (error) {
    console.error("Error assigning cars:", error);
  }
};
