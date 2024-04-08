"use server";

import { authoriseUser } from "../auth";
import Car from "../models/car.model";
import Transaction from "../models/transaction.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Stripe from "stripe";
import { redirect } from "next/navigation";

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
  carId: string;
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

    return {
      id: id.toString(),
      price,
      rentalPeriod: {
        startDate: rentalPeriod.startDate,
        endDate: rentalPeriod.endDate,
      },
      pending,
      carId: carId.toString(),
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

    const { carId, userId, rentalData } = transaction;
    const { startDate, endDate } = rentalData;

    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        rentedCars: carId,
      },
    });

    await Car.findByIdAndUpdate(carId, {
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
    userId: string;
    carId: string;
    price: number;
    rentalPeriod: { startDate: Date; endDate: Date };
  };
}

export async function checkoutTransaction({
  transaction,
}: TransactionDataProps) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});
  const { id: transactionId, price, userId: buyerId, carId } = transaction;

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
      buyerId,
      transactionId,
      carId,
    },
    mode: "payment",
    success_url: `https://rent-wheels-liart.vercel.app/checkout?success=true`,
    cancel_url: `https://rent-wheels-liart.vercel.app/checkout?success=false`,
  });
  redirect(session.url!);
}
