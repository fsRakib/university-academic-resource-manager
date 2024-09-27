import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { University } from "@/model/university-model";

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { name, location } = await request.json();

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: "University name is required" },
        { status: 400 }
      );
    }

    // Create a new university document
    const newUniversity = new University({ name, location });

    // Save the document to MongoDB
    await newUniversity.save();

    // Respond with the created university
    return NextResponse.json(
      { message: "University created successfully", university: newUniversity },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create university" },
      { status: 500 }
    );
  }
}

// export async function GET(request) {
//   try {
//     // Connect to the database
//     await dbConnect();

//     // Fetch all universities
//     const universities = await University.find({}, "name"); // Only return the name and _id

//     // Respond with the list of universities
//     return NextResponse.json({ universities }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching universities:", error);
//     return NextResponse.json({ error: "Failed to fetch universities" }, { status: 500 });
//   }
// }
export async function GET(request) {
  try {
    await dbConnect();
    const universities = await University.find();
    return NextResponse.json(universities);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch universities" },
      { status: 500 }
    );
  }
}