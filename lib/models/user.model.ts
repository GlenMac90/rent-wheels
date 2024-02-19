import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: String,
  image: String,
  bannerImage: String,
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
