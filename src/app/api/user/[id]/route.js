import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/user-model";

export const GET = async (request, { params }) => {
  const { id } = params;

  await dbConnect();

  try {
    const user = await User.findById(id);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const { password, ...userWithoutPassword } = user.toObject();

    return new NextResponse(JSON.stringify(userWithoutPassword), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
