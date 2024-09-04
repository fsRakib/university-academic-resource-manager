import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { createUser } from "@/lib/queries/users";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { name, email, password } = await request.json();
  console.log(name, email, password);

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);
  // Form a DB payload
  const newUser = {
    name,
    password: hashedPassword,
    email,
  };
  // Update the DB
  try {
    await createUser(newUser);
  } catch (err) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
  return NextResponse.json("User registered successfully", { status: 200 });
  // return new NextResponse("User has been created", {
  //   status: 201,
  // });
};
