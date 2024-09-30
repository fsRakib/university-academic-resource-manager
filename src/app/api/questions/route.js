import { NextResponse } from "next/server";
import { Question } from "../../../model/question-model";
import dbConnect from "../../../lib/dbConnect";
import cloudinary from "../../../lib/cloudinary";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const universityId = searchParams.get("universityId");
  const departmentId = searchParams.get("departmentId");
  const courseId = searchParams.get("courseId");

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
    });

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
    const formData = await request.formData();
    const file = formData.get("file");
    const questionType = formData.get("questionType");
    const year = formData.get("year");
    const universityId = formData.get("universityId");
    const departmentId = formData.get("departmentId");
    const courseId = formData.get("courseId");
    const ownerId = formData.get("ownerId");

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    let originalFileName = file.name.split(".")[0];
    const fileExtension = file.name.split(".").pop();

    originalFileName = originalFileName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");

    // Remove any leading or trailing hyphens that may have been added
    originalFileName = originalFileName.replace(/^-+|-+$/g, "");

    // Generate a random string based on the current timestamp
    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const uniqueFileName = `${originalFileName}-${timestamp}`;

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload file to Cloudinary using the sanitized name
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "next-cloudinary-uploads",
          public_id: uniqueFileName,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    await dbConnect();

    const newQuestion = new Question({
      name: originalFileName,
      questionType,
      year,
      universityId,
      departmentId,
      courseId,
      ownerId,
      fileUrl: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      createdAt: new Date(),
    });

    await newQuestion.save();

    return NextResponse.json(
      {
        publicId: result.public_id,
        resourceUrl: result.secure_url,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Upload image failed", error);
    return NextResponse.json({ error: "Upload image failed" }, { status: 500 });
  }
}
