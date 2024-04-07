import mongoose, { Document } from "mongoose";

import { rentalPeriod } from "./car.model";

export interface ITransaction extends Document {
  userId: string;
  carId: string;
  price: number;
  rentalPeriod: rentalPeriod;
  pending: boolean;
}

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
  price: { type: Number, required: true },
  rentalPeriod: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  pending: { type: Boolean, default: false },
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
