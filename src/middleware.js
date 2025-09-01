import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/register" || path === "/";

  // Use getToken to retrieve the JWT token from the cookies
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

  // console.log("your token is:", token);
  

  if (isPublicPath ) {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next(); // Proceed if authenticated or accessing public path
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
    "/admin"
  ],
};
