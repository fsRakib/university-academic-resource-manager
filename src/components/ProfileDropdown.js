"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaBookmark } from "react-icons/fa";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <FaUserCircle className="text-3xl text-white" />
        <AiFillCaretDown className="text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <Link
            href="/profile"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 hover:rounded-lg"
          >
            <CgProfile className="mr-2" />
            Profile
          </Link>
          <Link
            href="/bookmarks"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200 hover:rounded-lg"
          >
            <FaBookmark className="mr-2" />
            Bookmarks
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
