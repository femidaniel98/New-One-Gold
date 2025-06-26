// pages/api/updateUser.ts

import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/db";
import UserModel, { IUser } from "@/models/userModel";
import { requireAuth } from "@/middlewares/authMiddleware";

export default requireAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "PUT":
      return handleUpdateUser(req, res);
    case "DELETE":
      return handleDeleteUser(req, res);
    default:
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed", data: null });
  }
});

async function handleUpdateUser(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(); // Ensure database connection

  try {
    console.log(req.query);
    const { id } = req.query;
    const updates = req.body;

    // Validate required fields
    if (!id || !updates) {
      return res.status(400).json({
        success: false,
        message: "Both id and updates are required",
        data: null,
      });
    }

    // Check if the user exists
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    // Prevent updating the password
    if (updates.password) {
      return res.status(400).json({
        success: false,
        message: "Password cannot be updated using this endpoint",
        data: null,
      });
    }

    // Update user fields
    Object.keys(updates).forEach((field) => {
      if (field !== "password") {
        (existingUser as any)[field] = updates[field];
      }
    });

    // Save the updated user
    const updatedUser: IUser = await existingUser.save();

    // Create a sanitized user object without the password
    const sanitizedUser = {
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      address: updatedUser.address,
      userRole: updatedUser.userRole,
      ownerName: updatedUser.ownerName,
      businessPhoneNumber: updatedUser.businessPhoneNumber,
      shopName: updatedUser.shopName,
    };

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: sanitizedUser,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message || "An error occurred",
      data: null,
    });
  }
}

async function handleDeleteUser(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(); // Ensure database connection

  try {
    const { id } = req.query;

    // Validate required fields
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is required",
        data: null,
      });
    }

    // Check if the user exists
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    // Delete the user
    await existingUser.remove();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message || "An error occurred",
      data: null,
    });
  }
}
