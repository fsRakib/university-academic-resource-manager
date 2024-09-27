import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Department } from "@/model/department-model";

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { universityId, name } = await request.json();

    // Validate required fields
    if (!universityId || !name) {
      return NextResponse.json(
        { error: "University ID and Department name are required" },
        { status: 400 }
      );
    }

    // Validate if universityId is a valid ObjectId
    if (!isValidObjectId(universityId)) {
      return NextResponse.json(
        { error: "Invalid University ID" },
        { status: 400 }
      );
    }

    // Check if the department already exists in the university
    const existingDepartment = await Department.findOne({ name, universityId });
    if (existingDepartment) {
      return NextResponse.json(
        { error: "Department with this name already exists in the specified university" },
        { status: 400 }
      );
    }

    // Create a new department document
    const newDepartment = new Department({ universityId, name });

    // Save the document to MongoDB
    await newDepartment.save();

    // Respond with the created department
    return NextResponse.json(
      { message: "Department created successfully", department: newDepartment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating department:", error);
    return NextResponse.json(
      { error: `Failed to create department: ${error.message}` },
      { status: 500 }
    );
  }
}

// Utility function to validate ObjectId
function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const universityId = searchParams.get("universityId");

  try {
    await dbConnect();
    const departments = await Department.find({ universityId });
    return NextResponse.json(departments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch departments" }, { status: 500 });
  }
}