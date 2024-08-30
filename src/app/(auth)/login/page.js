"use client";

import React from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import Link from "next/link";
import { doSocialLogin } from "@/app/actions/index";
import { doCredentialLogin } from "@/app/actions";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        router.push("/profile");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <div
      className="flex justify-center items-center w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/campus-bg.jpg')" }}
    >
      <div className="w-96 bg-transparent border-2 border-white/10 backdrop-filter backdrop-blur-lg shadow-lg text-white rounded-lg p-8 opacity-100">
        <h1 className="text-black text-3xl font-bold text-center">Login</h1>
        <p className="text-black text-center mb-6 ">Welcome again!</p>

        <form action={doSocialLogin}>
          <button
            type="submit"
            name="action"
            value="google"
            className="w-full h-11 bg-black text-white font-semibold rounded-full shadow-lg mb-4 flex items-center justify-center"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
        </form>
        <div className="flex items-center justify-center mb-4">
          <hr className="w-full border-gray-600" />
          <span className="px-2 text-black">OR</span>
          <hr className="w-full border-gray-600" />
        </div>
        <form onSubmit={onSubmit}>
          <div className="relative w-full h-12 my-8">
            <input
              type="email"
              name="email"
              id="email"
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
        name="password"
        id="password"
        placeholder="Password"
        className="w-full h-full bg-transparent border-2 border-gray-600 rounded-full px-5 py-3 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {!isFocused && (
        <div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-900">
          <MdPassword />
        </div>
      )}
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
              <Link
                href="register"
                className="text-white font-semibold hover:underline ml-1"
              >
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
