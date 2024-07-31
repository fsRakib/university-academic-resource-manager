"use client";

import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import Link from "next/link";

function Register() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/campus-bg.jpg')" }}
    >
      <div className="w-96 bg-transparent border-2 border-white/10 backdrop-filter backdrop-blur-lg shadow-lg text-white rounded-lg p-8 opacity-100">
        <form>
          <h1 className="text-black text-3xl font-bold text-center">
            Create Your Account
          </h1>
          <p className="text-black  text-center mb-6">
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
              placeholder="Email"
              className="w-full h-full bg-transparent border-2 border-gray-600 rounded-full px-5 py-3 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-black">
              <MdEmail />
            </div>
          </div>
          <div className="relative w-full h-12 mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-full bg-transparent border-2 border-gray-600 rounded-full px-5 py-3 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-black">
              <MdPassword />
            </div>
          </div>
          <div className="relative w-full h-12 mb-4">
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full h-full bg-transparent border-2 border-gray-600 rounded-full px-5 py-3 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-black">
              <MdPassword />
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
              <Link href="/login" className="text-white font-semibold hover:underline" onClick={() => router.push('/login')}>
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
