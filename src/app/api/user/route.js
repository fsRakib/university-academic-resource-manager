import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/user-model";

export async function GET(req) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });

    if (user) {
      return new Response(JSON.stringify(user), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response("User not found", {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
