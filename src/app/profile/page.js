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
import { FaUserAlt, FaUniversity } from "react-icons/fa";
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
  const [loading, setLoading] = useState(true);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({});

  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    getUserData();
  }, []);

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleMouseEnter = (text, event) => {
    setTooltipContent(text);
    setTooltipVisible(true);

    const tooltipElement = document.getElementById("tooltip-default");
    const { top, left, width } = event.currentTarget.getBoundingClientRect();
    const tooltipWidth = tooltipElement ? tooltipElement.offsetWidth : 0;

    setTooltipPosition({
      top: top - 30,
      left: left,
    });
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const renderFieldContent = (data, defaultMessage = "Not provided") => {
    if (loading) {
      return "loading...";
    }
    return data || defaultMessage;
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

      <div className="mt-4 p-4 bg-gray-300 rounded-xl grid grid-cols-2 gap-4 relative">
        {/* Left Side Data Display */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <p
            className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center"
            onMouseEnter={(event) =>
              handleMouseEnter(user?.name || "loading...", event)
            }
            onMouseLeave={handleMouseLeave}
          >
            <FaUserAlt className="mr-2 flex-shrink-0" />
            <span className="overflow-hidden whitespace-nowrap text-ellipsis block w-full">
              {renderFieldContent(user?.name)}
            </span>
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            University
          </label>
          <p
            className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center"
            onMouseEnter={(event) =>
              handleMouseEnter(user?.university || "Not provided", event)
            }
            onMouseLeave={handleMouseLeave}
          >
            <FaUniversity className="mr-2 flex-shrink-0" />
            <span className="overflow-hidden whitespace-nowrap text-ellipsis block w-full">
              {renderFieldContent(user?.university)}
            </span>
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email address
          </label>
          <p
            className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center"
            onMouseEnter={(event) =>
              handleMouseEnter(user?.email || "loading...", event)
            }
            onMouseLeave={handleMouseLeave}
          >
            <MdEmail className="text-xl mr-1.5 flex-shrink-0" />
            <span className="overflow-hidden whitespace-nowrap text-ellipsis block w-full">
              {renderFieldContent(user?.email)}
            </span>
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Department
          </label>
          <p
            className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center"
            onMouseEnter={(event) =>
              handleMouseEnter(user?.department || "Not provided", event)
            }
            onMouseLeave={handleMouseLeave}
          >
            <MdAccountTree className="mr-2 flex-shrink-0" />
            <span className="overflow-hidden whitespace-nowrap text-ellipsis block w-full">
              {renderFieldContent(user?.department)}
            </span>
          </p>
        </div>

        {/* Right Side Data Display */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mobile number
          </label>
          <p
            className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center"
            onMouseEnter={(event) =>
              handleMouseEnter(user?.phone || "Not provided", event)
            }
            onMouseLeave={handleMouseLeave}
          >
            <FaPhoneVolume className="mr-2 flex-shrink-0" />
            <span className="overflow-hidden whitespace-nowrap text-ellipsis block w-full">
              {renderFieldContent(user?.phone)}
            </span>
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Session
          </label>
          <p
            className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center"
            onMouseEnter={(event) =>
              handleMouseEnter(user?.session || "Not provided", event)
            }
            onMouseLeave={handleMouseLeave}
          >
            <FaCalendarAlt className="mr-2 flex-shrink-0" />
            <span className="overflow-hidden whitespace-nowrap text-ellipsis block w-full">
              {renderFieldContent(user?.session)}
            </span>
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Home Address
          </label>
          <p
            className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center"
            onMouseEnter={(event) =>
              handleMouseEnter(user?.address || "Not provided", event)
            }
            onMouseLeave={handleMouseLeave}
          >
            <FaAddressCard className="mr-2 flex-shrink-0" />
            <span className="overflow-hidden whitespace-nowrap text-ellipsis block w-full">
              {renderFieldContent(user?.address)}
            </span>
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender
          </label>
          <p
            className="shadow-sm appearance-none bg-white border rounded-md w-full py-2 px-3 text-gray-700 leading-tight flex items-center"
            onMouseEnter={(event) =>
              handleMouseEnter(
                user?.gender || "loading..." || "Not provided",
                event
              )
            }
            onMouseLeave={handleMouseLeave}
          >
            <TbGenderBigender className="text-xl mr-1.5 flex-shrink-0" />
            <span className="overflow-hidden whitespace-nowrap text-ellipsis block w-full">
              {renderFieldContent(user?.gender)}
            </span>
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-2">
        <div className="w-1/2">
          <form action={doLogout} method="POST">
            <button
              type="submit"
              className="flex items-center justify-center font-bold w-full px-4 py-2 text-center bg-black text-white hover:bg-gray-500 hover:text-black rounded-xl"
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

      {/* Tooltip for displaying text */}
      {tooltipVisible && (
        <div
          className="absolute bg-gray-800 text-white text-xs rounded-xl px-4 py-2 shadow-md transform -translate-y-2"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
