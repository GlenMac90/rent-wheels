import { ImageDataArrayType } from "@/types/car.index";
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
  imageData: ImageDataArrayType[];
  likedBy: string[];
  isLikedByCurrentUser?: boolean;
  likes?: number;
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
  imageData: [
    {
      type: {
        url: String,
        key: String,
        blurDataURL: String,
        width: Number,
        height: Number,
      },
    },
  ],
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
