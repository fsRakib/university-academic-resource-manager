import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  try {
    const path = request.nextUrl.pathname;

    const isPublicPath =
      path === "/login" || path === "/register" || path === "/";

    // Use getToken to retrieve the JWT token from the cookies
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // console.log("your token is:", token);

    if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/home", request.nextUrl));
    }

    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    return NextResponse.next(); // Proceed if authenticated or accessing public path
  } catch (error) {
    console.error("Middleware error:", error);
    // In case of error, allow the request to proceed to avoid blocking the app
    return NextResponse.next();
  }
}

// Configuration for the middleware to apply on specific routes
export const config = {
  matcher: [
    "/",
    "/home",
    "/profile",
    "/profile2",
    "/login",
    "/register",
    "/questions",
    "/books",
    "/notes",
    "/admin",
  ],
};
