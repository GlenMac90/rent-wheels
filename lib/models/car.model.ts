import mongoose from "mongoose";

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
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Car = mongoose.models.Car || mongoose.model("User", carSchema);

export default Car;
