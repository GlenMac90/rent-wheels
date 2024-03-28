import mongoose, { Document } from "mongoose";

export interface ICar extends Document {
  owner: string;
  name: string;
  type: string;
  description: string;
  transmission: string;
  fuelCapacity: number;
  peopleCapacity: number;
  dailyPrice: number;
  images: string[];
  likedBy: string[];
  isLikedByCurrentUser?: boolean;
}

const carSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  transmission: { type: String, required: true },
  fuelCapacity: { type: Number, required: true },
  peopleCapacity: { type: Number, required: true },
  dailyPrice: { type: Number, required: true },
  images: [String],
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
