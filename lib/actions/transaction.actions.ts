"use server";

import { authoriseUser } from "../auth";
import Car from "../models/car.model";
import Transaction from "../models/transaction.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { formatCarData } from "@/utils";

interface RentalDataProps {
  carId: string;
  startDate: Date;
  endDate: Date;
}

export async function createTransaction({
  rentalData,
}: {
  rentalData: RentalDataProps;
}): Promise<{
  status: number;
  message: string;
  error?: any;
}> {
  await connectToDB();

  const user = await authoriseUser();

  if (!user || !user.userId) {
    throw new Error("User not authorised to create transaction");
  }

  const { carId, startDate, endDate } = rentalData;

  const carPrice = await Car.findById(carId).select("dailyPrice");
  const price = carPrice.dailyPrice * (endDate.getDate() - startDate.getDate());

  const fullCarData = {
    userId: user.userId,
    carId,
    price,
    rentalPeriod: { startDate, endDate },
  };

  try {
    const newTransaction = await Transaction.create(fullCarData);

    return newTransaction.id.toString();
  } catch (error: any) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to create transaction",
      error: error.message,
    };
  }
}

export async function getTransactionById(transactionId: string): Promise<{
  id: string;
  price: number;
  rentalPeriod: { startDate: Date; endDate: Date };
  pending: boolean;
  carData: any;
  userId: string;
}> {
  await connectToDB();

  const user = await authoriseUser();
  if (!user || !user.userId) {
    throw new Error("User not authorised to create transaction");
  }

  try {
    const transaction = await Transaction.findById(transactionId);

    if (user.userId !== transaction.userId.toString()) {
      throw new Error("User not authorised to view transaction");
    }

    const { price, rentalPeriod, pending, carId, userId, id } = transaction;

    const car = await Car.findById(carId);

    const formattedCarData = formatCarData({ data: car, userId: user.userId });

    return {
      id: id.toString(),
      price,
      rentalPeriod: {
        startDate: rentalPeriod.startDate,
        endDate: rentalPeriod.endDate,
      },
      pending,
      carData: formattedCarData,
      userId: userId.toString(),
    };
  } catch (error) {
    throw new Error("Failed to get transaction");
  }
}

export async function confirmTransaction(transactionId: string) {
  await connectToDB();

  try {
    const transaction = await Transaction.findById(transactionId);

    const { carId, userId, rentalPeriod } = transaction;
    const { startDate, endDate } = rentalPeriod;

    await User.findByIdAndUpdate(userId.toString(), {
      $addToSet: {
        rentedCars: carId.toString(),
        transactions: transactionId,
      },
    });

    await Car.findByIdAndUpdate(carId.toString(), {
      $addToSet: {
        rentalPeriod: { startDate, endDate },
      },
    });

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      {
        pending: false,
      }
    );

    return updatedTransaction.id.toString();
  } catch (error) {
    throw new Error("Failed to confirm transaction");
  }
}

export interface TransactionDataProps {
  transaction: {
    id: string;
    price: number;
    rentalPeriod?: { startDate: Date; endDate: Date };
  };
}

export async function checkoutTransaction({
  transaction,
}: TransactionDataProps) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});
  const { id: transactionId, price } = transaction;

  const amount = Number(price * 100);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "gbp",
          unit_amount: amount,
          product_data: {
            name: `Car rental: ${transactionId.toString()}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      transactionId,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/${transactionId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/${transactionId}`,
  });
  redirect(session.url!);
}

export async function cancelTransaction(transactionId: string) {
  await connectToDB();

  const user = await authoriseUser();
  if (!user || !user.userId) {
    throw new Error("User not authorised to create transaction");
  }

  try {
    const deletedTransaction =
      await Transaction.findByIdAndDelete(transactionId);
    return deletedTransaction.id.toString();
  } catch (error) {
    throw new Error("Failed to cancel transaction");
  }
}
