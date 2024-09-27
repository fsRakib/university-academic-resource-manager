import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Course } from "@/model/course-model";

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { departmentId, universityId, name } = await request.json();

    // Validate required fields
    if (!departmentId || !universityId || !name) {
      return NextResponse.json(
        { error: "Department ID, University ID, and Course name are required" },
        { status: 400 }
      );
    }

    // Validate if departmentId and universityId are valid ObjectIds
    if (!isValidObjectId(departmentId) || !isValidObjectId(universityId)) {
      return NextResponse.json(
        { error: "Invalid Department ID or University ID" },
        { status: 400 }
      );
    }

    // Check if the course already exists in the given university and department
    const existingCourse = await Course.findOne({ name, departmentId, universityId });
    if (existingCourse) {
      return NextResponse.json(
        { error: "Course with this name already exists in the specified department and university" },
        { status: 400 }
      );
    }

    // Create a new course document
    const newCourse = new Course({ departmentId, universityId, name });

    // Save the document to MongoDB
    await newCourse.save();

    // Respond with the created course
    return NextResponse.json(
      { message: "Course created successfully", course: newCourse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: `Failed to create course: ${error.message}` },
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
  const departmentId = searchParams.get("departmentId");

  try {
    await dbConnect();
    const courses = await Course.find({ departmentId });
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}