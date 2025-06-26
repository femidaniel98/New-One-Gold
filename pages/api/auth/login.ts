// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectDB from "@/db";
import UserModel from "@/models/userModel";

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
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Both email and password are required",
        data: null,
      });
    }

    const loginResult = await (UserModel as any).loginWithEmail({
      email,
      password,
    });


    // Check the login result
    if (!loginResult) {
      return res.status(400).json({
        success: false,
        message: loginResult?.message,
        data: null,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: loginResult?._id }, JWT_SECRET_KEY);

    // Create a sanitized user object without the password
    const sanitizedUser = {
      _id: loginResult?._id,
      firstName: loginResult?.firstName,
      lastName: loginResult?.lastName,
      email: loginResult?.email,
      phoneNumber: loginResult?.phoneNumber,
      address: loginResult?.address,
      userRole: loginResult?.userRole,
      ownerName: loginResult?.ownerName,
      businessPhoneNumber: loginResult?.businessPhoneNumber,
      shopName: loginResult?.shopName,
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user: sanitizedUser, token },
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message || "An error occurred",
      data: null,
    });
  }
}
