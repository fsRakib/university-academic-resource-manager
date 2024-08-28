import { NextResponse } from "next/server";
import { User } from "@/model/userSchema";

export async function DELETE(request, { params }) {
  const { userId } = params;
  console.log("fuck");

  try {
    await User.deleteOne({
      _id: userId,
    });
    return NextResponse.json({
      msg: "user deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function GET(request, { params }) {
  const { userId } = params;

  const user = await User.findById(userId);
  return NextResponse.json(user);
}

export async function PUT(request, { params }) {
  const { userId } = params;
  const { name, age, dept } = await request.json();

  try {
    const user = await User.findById(userId);
    user.name = name;
    user.age = age;
    user.dept = dept;
    const updatedUser = await user.save();
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
}
