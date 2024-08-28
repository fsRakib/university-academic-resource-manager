"use client";

import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import Link from "next/link";

function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/campus-bg.jpg')" }}
    >
      <div className="w-96 bg-transparent border-2 border-white/10 backdrop-filter backdrop-blur-lg shadow-lg text-white rounded-lg p-8 opacity-100">
        <form>
          <h1 className="text-black text-3xl font-bold text-center">
            Login
          </h1>
          <p className="text-black text-center mb-6 ">
            Welcome again!
          </p>
          <div className="relative w-full h-12 my-8">
            <input
              type="text"
              placeholder="Username"
              className="w-full h-full bg-transparent border-2 border-gray-600 rounded-full px-5 py-3 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-900">
              <FaUser />
            </div>
          </div>
          <div className="relative w-full h-12 mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-full bg-transparent border-2 border-gray-600 rounded-full px-5 py-3 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-900">
              <MdPassword />
            </div>
          </div>
          <div className="flex justify-between items-center text-sm mb-4 text-black">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="accent-gray-900 mr-1"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <a href="#" className="text-black hover:underline">
              Forget Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full  h-11 bg-black text-white font-semibold rounded-full shadow-lg hover:bg-white/70 hover:text-black"
          >
            Log in
          </button>
          <div className="text-sm text-black text-center mt-5">
            <p>
              Don't have an account?
              <Link href="/register" className="text-white font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
