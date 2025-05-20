import { NextResponse } from "next/server";
import {User} from "@/model/user-model";
import { transporter } from "@/lib/mailer";
import { generateOTP } from "@/lib/generateOTP";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  await dbConnect();
  const { email } = await req.json();
  const user = await User.findOne({ email });

  if (!user || user.isVerified) {
    return NextResponse.json(
      { message: "User not found or already verified" },
      { status: 400 }
    );
  }

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Resend OTP Verification",
    text: `Your new OTP is: ${otp}`,
  });

  return NextResponse.json({ message: "OTP resent successfully." });
}
