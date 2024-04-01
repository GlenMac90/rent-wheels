import { ImageDataArrayType } from "@/types/car.index";
import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  role?: string;
  image?: ImageDataArrayType;
  bannerImage?: ImageDataArrayType;
  rentedCars?: string[];
  ownedCars?: string[];
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: String,
  image: {
    type: {
      url: String,
      blurDataURL: String,
      width: Number,
      height: Number,
    },
  },
  bannerImage: {
    type: {
      url: String,
      blurDataURL: String,
      width: Number,
      height: Number,
    },
  },
  rentedCars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
  ownedCars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
