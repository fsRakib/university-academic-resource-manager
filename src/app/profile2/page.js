"use client"
import React, { useEffect, useState } from "react";

async function fetchUserData() {
  const res = await fetch("/api/user/getUser");
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  const data = await res.json();
  return data.user;
}

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getUserData();
  }, []);


  return (
    <div className="max-w-4xl bg-white rounded-xl shadow-md w-full p-6">
      <div className="flex flex-col h-52 bg-yellow-300 rounded-xl relative">
        <div
          className="h-full rounded-xl flex items-center"
          style={{
            backgroundImage: `url('https://as1.ftcdn.net/v2/jpg/05/63/76/92/1000_F_563769202_XvjMvyMO593Wt70Um2OQPJ5CZrTXbT4t.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="ml-6 rounded-full h-40 w-40 bg-gray-200 flex items-center justify-center">
            <img
              className="rounded-full h-40 w-40 object-cover border-4 border-red-500"
              src={user?.image || "default-avatar-url"} // Handle default image if none exists
              alt={user?.name}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-300 rounded-xl grid grid-cols-2 gap-4">
        {/* Left Side Data Display */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full-name">
            Full Name
          </label>
          <p id="full-name" className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none overflow-hidden truncate">
            {user?.name || "loading..."}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="university">
            University
          </label>
          <p id="university" className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none overflow-hidden truncate">
            {user?.university || "Not provided"}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email-address">
            Email address
          </label>
          <p id="email-address" className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none overflow-hidden truncate">
            {user?.email || "loading..."}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
            Department
          </label>
          <p id="department" className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none overflow-hidden truncate">
            {user?.department || "Not provided"}
          </p>
        </div>

        {/* Right Side Data Display */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile-number">
            Mobile number
          </label>
          <p id="mobile-number" className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none overflow-hidden truncate">
            {user?.phone || "Not provided"}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="session">
            Session
          </label>
          <p id="session" className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none overflow-hidden truncate">
            {user?.session || "Not provided"}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Home Address
          </label>
          <p id="address" className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none overflow-hidden truncate">
            {user?.address || "Not provided"}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender
          </label>
          <p id="gender" className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none overflow-hidden truncate">
            {user?.gender || "Not provided"}
          </p>
        </div>
      </div>
      <button className="bg-black text-white font-bold w-full mt-3 py-2 rounded-xl">
        Update profile
      </button>
    </div>
  );
}

export default UserProfile;
