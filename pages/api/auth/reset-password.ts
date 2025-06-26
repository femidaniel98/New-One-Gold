// pages/api/reset-password.ts
import connectDB from "@/db";
import PasswordResetCode from "@/models/passwordResetModel";
import User from "@/models/userModel";
import { generateRandomCode } from "@/utils";
import { generatePasswordResetHTML } from "@/utils/emails";
import { sendEmail } from "@/utils/mailer";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      // Check if email is provided
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required for password reset.",
        });
      }

      // Check if there's an existing reset code for the same email
      const [existingResetCode, user] = await Promise.all([
        PasswordResetCode.findOne({ email }),
        User.findOne({ email }),
      ]);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not doesn't exist.",
        });
      }

      // Generate a unique reset code (use a library like crypto)
      const resetCode = generateRandomCode(6);
      console.log({ resetCode });

      // Calculate the expiration time (e.g., 1 hour from now)
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);

      if (existingResetCode) {
        // If there's an existing reset code, update it
        existingResetCode.code = resetCode;
        existingResetCode.expiresAt = expirationDate;
        await existingResetCode.save();
      } else {
        // If no existing reset code, create a new one
        const passwordResetCode = new PasswordResetCode({
          email,
          code: resetCode,
          expiresAt: expirationDate,
        });
        await passwordResetCode.save();
      }

      // Send the reset code email to the user
      await sendEmail({
        to: email,
        subject: "Password Reset Code",
        html: generatePasswordResetHTML(email, resetCode),
      });

      res.status(200).json({
        success: true,
        message: "Password reset code sent successfully.",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to send reset code.",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }
}
