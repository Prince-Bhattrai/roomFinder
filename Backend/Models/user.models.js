import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, 
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "postModel",
    },
  ],
  cartData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartModel",
    },
  ],
}, { timestamps: true });

export const userModel = mongoose.model("UserModel", userSchema);
