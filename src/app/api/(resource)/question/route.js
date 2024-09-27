import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Question } from "@/model/question-model";
import { User } from "@/model/user-model"; // Import the User model



// export async function GET(request) {
//   await dbConnect();

//   const { searchParams } = new URL(request.url);
//   const universityId = searchParams.get("universityId");
//   const departmentId = searchParams.get("departmentId");
//   const courseId = searchParams.get("courseId");

//   // Check if all required query parameters are present
//   if (!universityId || !departmentId || !courseId) {
//     return NextResponse.json(
//       { message: "Missing required query parameters" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Find questions based on universityId, departmentId, and courseId
//     const questions = await Question.find({
//       universityId,
//       departmentId,
//       courseId,
//     });

//     // If no questions found, return an empty array
//     if (questions.length === 0) {
//       return NextResponse.json(
//         { message: "No questions found" },
//         { status: 404 }
//       );
//     }

//     // Return the found questions
//     return NextResponse.json(questions, { status: 200 });
//   } catch (error) {
//     console.error("Error retrieving questions:", error);
//     return NextResponse.json(
//       { message: "Server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request) {
  await dbConnect();

  const searchParams = request.nextUrl.searchParams;
  const universityId = searchParams.get("university");
  const departmentId = searchParams.get("department");
  const courseId = searchParams.get("course");

  if (!universityId || !departmentId || !courseId) {
    return NextResponse.json(
      { message: "Missing required query parameters" },
      { status: 400 }
    );
  }

  try {
    const questions = await Question.find({
      universityId,
      departmentId,
      courseId,
    }).populate("ownerId", "name email");

    if (questions.length === 0) {
      return NextResponse.json(
        { message: "No questions found" },
        { status: 404 }
      );
    }

    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error("Error retrieving questions:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const {
      universityId,
      departmentId,
      courseId,
      ownerId,
      name,
      questionType,
      fileUrl,
    } = await request.json();

    // Validate required fields
    if (
      !universityId ||
      !departmentId ||
      !courseId ||
      !ownerId ||
      !name ||
      !questionType ||
      !fileUrl
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate question type
    if (!["semester", "term test"].includes(questionType)) {
      return NextResponse.json(
        { error: "Invalid question type. Must be 'semester' or 'term test'" },
        { status: 400 }
      );
    }

    // Create a new question document
    const newQuestion = new Question({
      universityId,
      departmentId,
      courseId,
      ownerId,
      name,
      questionType,
      fileUrl,
    });

    // Save the question to the database
    await newQuestion.save();

    // Return success response
    return NextResponse.json(
      { message: "Question added successfully", question: newQuestion },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { error: "Failed to create question" },
      { status: 500 }
    );
  }
}

