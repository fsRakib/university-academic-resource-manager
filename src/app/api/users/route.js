import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/userSchema";

dbConnect();
export async function GET(request) {
  let users = [];
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(users);
}


export async function POST(request) {
  // fetch data from request body
  const { name, age, dept } = await request.json();
  console.log({ name, age, dept });

  //create user object from User model
  const user = new User({
    name,
    age,
    dept,
  });

  try {
    //save obj to database
    const createUser = await user.save();
    const res = NextResponse.json(user);
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      msg: "failed",
    });
  }
}
