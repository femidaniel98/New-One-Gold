// pages/api/signup.ts

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectDB from "@/db";
import UserModel, { IUser } from "@/models/userModel";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "default-secret-key";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed", data: null });
  }

  await connectDB(); // Ensure database connection

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      userRole,
      ownerName,
      businessPhoneNumber,
      shopName,
    } = req.body;

    const missingFields: string[] = [];

    // Validate required fields
    if (!firstName) missingFields.push("firstName");
    if (!lastName) missingFields.push("lastName");
    if (!email) missingFields.push("email");
    if (!password) missingFields.push("password");
    if (!phoneNumber) missingFields.push("phoneNumber");
    if (!address) missingFields.push("address");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `The following fields are required: ${missingFields.join(
          ", "
        )}`,
        data: null,
      });
    }

    // Check if the email is already registered
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
        data: null,
      });
    }

    // Create a new user
    const newUser: IUser = new UserModel({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      userRole: userRole || "shopper", // Default to 'shopper' if not provided
      ownerName,
      businessPhoneNumber,
      shopName,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET_KEY);

    // Create a sanitized user object without the password
    const sanitizedUser = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      address: newUser.address,
      userRole: newUser.userRole,
      ownerName: newUser.ownerName,
      businessPhoneNumber: newUser.businessPhoneNumber,
      shopName: newUser.shopName,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user: sanitizedUser, token },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(400).json({
      success: false,
      message: error?.message || "An error occurred",
      data: null,
    });
  }
}
