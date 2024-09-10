"use client";
import React, { useEffect, useState } from "react";
import UpdateProfile from "@/components/UpdateProfile";
import { doLogout } from "@/app/actions";
import { BiLogOut } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { TbGenderBigender } from "react-icons/tb";
import { FaAddressCard } from "react-icons/fa6";
import { MdAccountTree } from "react-icons/md";
import { FaUserAlt, FaUniversity} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

async function fetchUserData() {
  const res = await fetch("/api/user/logged-in-user");
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

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

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
              src={
                user?.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkVtEM7JH7u-RhOFpQljYMK86vFpCqo9G_VqhLAfgo0opgjnnLLS9wOQV1vJy9GfToLDA&usqp=CAU"
              }
              alt={user?.name}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-300 rounded-xl grid grid-cols-2 gap-4">
        {/* Left Side Data Display */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <p className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center">
            <FaUserAlt className="mr-2" /> {user?.name || "loading..."}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            University
          </label>
          <p className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center">
            <FaUniversity className="mr-2" /> {user?.university || "Not provided"}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email address
          </label>
          <p className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center">
            <MdEmail className="text-xl mr-1.5" /> {user?.email || "loading..."}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Department
          </label>
          <p className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center">
            <MdAccountTree className="mr-2" /> {user?.department || "Not provided"}
          </p>
        </div>

        {/* Right Side Data Display */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mobile number
          </label>
          <p className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center">
            <FaPhoneVolume className="mr-2" /> {user?.phone || "Not provided"}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Session
          </label>
          <p className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center">
            <FaCalendarAlt className="mr-2" /> {user?.session || "Not provided"}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Home Address
          </label>
          <p className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center">
            <FaAddressCard className="mr-2" /> {user?.address || "Not provided"}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender
          </label>
          <p className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center">
            <TbGenderBigender className="text-xl mr-1.5" /> {user?.gender || "Not provided"}
          </p>
        </div>
      </div>
      
      <div className="flex gap-4 mt-2">
        <div className="w-1/2">
          <form action={doLogout} method="POST">
            <button
              type="submit"
              className="flex items-center justify-center font-bold w-full  px-4 py-2  text-center bg-black text-white hover:bg-gray-500 hover:text-black rounded-xl"
            >
              <BiLogOut className="mr-4 text-xl" />
              Logout
            </button>

          </form>
        </div>
        <div className="w-1/2">
          <UpdateProfile user={user} onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
