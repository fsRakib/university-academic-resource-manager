import { NextResponse } from "next/server";
import {User} from "@/model/user-model";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  await dbConnect();
  const { email, otp } = await req.json();
  const user = await User.findOne({ email });

  if (
    !user ||
    user.isVerified ||
    user.otp !== otp ||
    user.otpExpiry < new Date()
  ) {
    return NextResponse.json(
      { message: "Invalid or expired OTP" },
      { status: 400 }
    );
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  return NextResponse.json({
    message: "Email verified successfully. You can now log in.",
  });
}
