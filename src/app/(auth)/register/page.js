"use client";

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name");
      const email = formData.get("email");

      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        router.push("/login");
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <div className="w-96 bg-transparent border-2 border-white/10 backdrop-filter backdrop-blur-lg shadow-lg text-white rounded-lg p-8 opacity-100">
      <form onSubmit={handleSubmit}>
        <h1 className="text-black text-3xl font-bold text-center">
          Create Your Account
        </h1>
        <p className="text-black text-center mb-6">
          Welcome back! Please enter your details
        </p>
        <button className="w-full h-11 bg-black text-white font-semibold rounded-full shadow-lg mb-4 flex items-center justify-center">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign up with Google
        </button>
        <div className="flex items-center justify-center mb-4">
          <hr className="w-full border-gray-600" />
          <span className="px-2 text-black">OR</span>
          <hr className="w-full border-gray-600" />
        </div>
        <div className="relative w-full h-12 mb-4">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="w-full h-full bg-transparent border-2 border-gray-600 rounded-full px-5 py-3 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-black">
            <FaUser />
          </div>
        </div>
        <div className="relative w-full h-12 mb-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full h-full bg-transparent border-2 border-gray-600 rounded-full px-5 py-3 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-black">
            <MdEmail />
          </div>
        </div>
        <div>
          <div className="relative w-full h-12 mb-4">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full h-full bg-transparent border-2 border-gray-600 rounded-full px-5 py-3 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              onFocus={() => setIsFocused("password")}
              onBlur={() => setIsFocused("")}
              value={password} // Bind to state
              onChange={(e) => setPassword(e.target.value)} // Update state
            />
            {isFocused !== "password" && (
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-black">
                <MdPassword />
              </div>
            )}
          </div>

          <div className="relative w-full h-12 mb-4">
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm password"
              className="w-full h-full bg-transparent border-2 border-gray-600 rounded-full px-5 py-3 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
              onFocus={() => setIsFocused("confirm_password")}
              onBlur={() => setIsFocused("")}
              value={confirmPassword} // Bind to state
              onChange={(e) => setConfirmPassword(e.target.value)} // Update state
            />
            {isFocused !== "confirm_password" && (
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-black">
                <MdPassword />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center text-black text-sm mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="accent-gray-900 mr-2"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
            />
            I accepted all terms & conditions.
          </label>
        </div>
        <button
          type="submit"
          className="w-full h-11 bg-black text-white font-semibold rounded-full shadow-lg hover:bg-white hover:text-black"
        >
          Sign up
        </button>
        <div className="text-sm text-black text-center mt-5">
          <p>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-white font-semibold hover:underline"
              onClick={() => router.push("/login")}
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
