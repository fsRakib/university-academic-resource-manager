import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/model/user-model';
import { auth } from "@/lib/auth";

export async function GET(req) {
  try {
    await dbConnect();
    const session = await auth();
    console.log("session : ", session);
    if (!session) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PATCH(req) {
  try {
    await dbConnect();

    // Get the authenticated session
    const session = await auth();
    console.log("session : ", session);
    if (!session) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const { name, phone, address, university, department, session: userSession, gender } = await req.json();

    // Find the user in the database based on session email
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update the fields with provided data
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.university = university || user.university;
    user.department = department || user.department;
    user.session = userSession || user.session;
    user.gender = gender || user.gender;

    // Save the updated user data to the database
    await user.save();

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

