import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { transporter } from "@/lib/mailer";
import { generateOTP } from "@/lib/generateOTP";
import { User } from "@/model/user-model";

export const POST = async (request) => {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(password, 5);
    // const newUserData = {
    //   name,
    //   password: hashedPassword,
    //   email,
    // };

    const user = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`,
    });

    return NextResponse.json(
      "User registered. Please verify OTP sent to email.",
      { status: 201 }
    );
  } catch (err) {
    console.error("Error during registration:", err); // ✅ shows actual error
    return new NextResponse(err.message || "Server error", { status: 500 });
  }
};
