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
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/home",
    });
    // If we reach this point without error, redirect was successful
    return { success: true };
  } catch (err) {
    console.error("Sign in error:", err);
    
    // NEXT_REDIRECT is not an error - it means redirect is happening
    if (err.message && err.message.includes("NEXT_REDIRECT")) {
      return { success: true, redirecting: true };
    }
    
    // Handle actual authentication errors
    if (err.type === "CredentialsSignin") {
      return { error: "Invalid email or password" };
    }
    
    // Return other errors
    return { error: err.message || "Login failed" };
  }
}
