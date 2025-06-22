import { userModel } from "../Models/user.models.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";

configDotenv()

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Hashing error"
        });
      }

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Hashing error"
          });
        }

        const newUser = new userModel({
          name,
          email,
          password: hash
        });

        await newUser.save();

        res.status(200).json({
          success: true,
          message: "User registered successfully"
        });
      });
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password); // ✅ await added
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Password doesn't match, please try again"
      });
    }
    const token = jwt.sign({id: user._id},process.env.SECRET,{expiresIn:"24h"})
    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await userModel.findOne({ _id: id }).populate("post");
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "User data not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User data",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
