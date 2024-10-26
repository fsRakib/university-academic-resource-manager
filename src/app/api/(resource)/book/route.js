import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Book } from "@/model/book-model";
import cloudinary from "@/lib/cloudinary";

export async function GET(request) {
  await dbConnect();

  const searchParams = request.nextUrl.searchParams;
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
    const books = await Book.find({
      universityId,
      departmentId,
      courseId,
    }).populate("ownerId", "name email");

    if (books.length === 0) {
      return NextResponse.json({ message: "No books found" }, { status: 404 });
    }

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error retrieving books:", error);
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
    //   const name = formData.get("name");
    //   const author = formData.get("author");
    const edition = formData.get("edition");
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
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const uniqueFileName = `${originalFileName}-${timestamp}`;

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload file to Cloudinary
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

    const newBook = new Book({
      name: originalFileName,
      edition,
      universityId,
      departmentId,
      courseId,
      ownerId,
      fileUrl: result.secure_url,
      publicId: result.public_id,
      createdAt: new Date(),
    });

    await newBook.save();

    return NextResponse.json(
      {
        publicId: result.public_id,
        resourceUrl: result.secure_url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Upload file failed", error);
    return NextResponse.json({ error: "Upload file failed" }, { status: 500 });
  }
}
