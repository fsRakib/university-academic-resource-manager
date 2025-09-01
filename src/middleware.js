import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  try {
    const path = request.nextUrl.pathname;

    // Define public paths (login and register pages)
    const isPublicPath = path === "/login" || path === "/register";

    // Use getToken to retrieve the JWT token from the cookies
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Handle root path - always redirect based on auth status
    if (path === "/") {
      if (token) {
        return NextResponse.redirect(new URL("/home", request.nextUrl));
      } else {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
      }
    }

    // If user is logged in and trying to access login/register, redirect to home
    if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/home", request.nextUrl));
    }

    // If user is not logged in and trying to access protected routes, redirect to login
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    return NextResponse.next(); // Proceed if everything is fine
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
