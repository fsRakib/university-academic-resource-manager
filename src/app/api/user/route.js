import NextAuth from "next-auth";
import authOptions from "@/lib/auth"; // Adjust the path if necessary

export async function GET(req) {
  const res = await NextAuth(req, authOptions);

  // Handle the response from NextAuth
  const session = res?.session;
  console.log("Session:", session);

  if (session) {
    try {
      await dbConnect();
      const user = await User.findOne({ email: session.user.email });
      console.log("User found:", user);

      if (user) {
        return new Response(JSON.stringify(user), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        console.error("User not found");
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
  } else {
    console.error("Unauthorized: No session found");
    return new Response("Unauthorized", {
      status: 401,
    });
  }
}
