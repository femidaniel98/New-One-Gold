// pages/api/reset-password-confirm.ts
import connectDB from "@/db";
import PasswordResetCode from "@/models/passwordResetModel";
import User from "@/models/userModel";
import { generatePasswordResetSuccessHTML } from "@/utils/emails";
import { sendEmail } from "@/utils/mailer";
import { NextApiRequest, NextApiResponse } from "next";

connectDB();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, code, password } = req.body;
      // Find the reset code in the database
      const resetCodeDoc = await PasswordResetCode.findOne({
        email,
        code,
        expiresAt: { $gt: new Date() }, // Check if the code hasn't expired
      });

      if (!resetCodeDoc) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired reset code.",
        });
      }

      // Update the user's password
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      user.password = password; // Assign the new password
      await user.save(); // Save the user, which will trigger the pre-save middleware

      // Remove the reset code from the database
      await resetCodeDoc.deleteOne({
        email,
      });

      await sendEmail({
        to: user.email,
        subject: "Password Reset Successfully",
        html: generatePasswordResetSuccessHTML(`http://www.asoebi.com/login`),
      });

      res.status(200).json({
        success: true,
        message: "Password reset successfully.",
        // user,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to reset password.",
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
