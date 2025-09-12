"use server";
import { signIn, signOut } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function doSocialLogin(formData) {
  const action = formData.get("action");
  console.log(action);
  await signIn(action, { redirectTo: "/home" });
  return NextResponse.json({ message: "User logged out" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/login" });
  console.log("User logged out");
}

export async function doCredentialLogin(formData) {
  console.log("formData", formData);
  try {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/home",
    });

    console.log("Sign in result:", result);
    return result;
  } catch (err) {
    console.error("Sign in error:", err);
    // Return error information that can be handled by the client
    return { error: err.message || "Login failed" };
  }
}
