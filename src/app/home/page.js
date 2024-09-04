"use client";

import React, { useState } from "react";
import SearchDropdown from "@/components/SearchDropdown";
import { FaUniversity } from "react-icons/fa";
import { PiTreeViewFill } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import { useDataContext } from "@/context/DataContext";
import Link from "next/link";
import ProfileDropdown from "@/components/ProfileDropdown";

  function Home() {
  const { universities, departments, courses } = useDataContext();
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");

  // const session = await auth();
  // if (!session?.user) redirect("/login");

  return (
    <div
      className="flex flex-col justify-center items-center w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/campus-bg.jpg')" }}
    >
      <div className="absolute top-4 right-4">
        <ProfileDropdown />
      </div>
     
      <div className="w-96 bg-transparent border-2 border-white/10 backdrop-filter backdrop-blur-lg shadow-lg text-white rounded-lg p-8 opacity-100">
        <form>
          <h1 className="text-black text-3xl font-bold text-center">
            Get your resources
          </h1>
          <p className="text-black text-center mb-6">
            Select your options below
          </p>

          <SearchDropdown
            label="University"
            options={universities}
            selectedOption={university}
            setSelectedOption={setUniversity}
            centered={true}
            icon={<FaUniversity />}
          />
          <SearchDropdown
            label="Department"
            options={departments}
            selectedOption={department}
            setSelectedOption={setDepartment}
            centered={true}
            icon={<PiTreeViewFill />}
          />
          <SearchDropdown
            label="Course"
            options={courses}
            selectedOption={course}
            setSelectedOption={setCourse}
            centered={true}
            icon={<FaBookOpen />}
          />

          <button
            type="submit"
            className="w-full h-11 my-4 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-white hover:text-black"
          >
            Search
          </button>
          <p className="text-black text-center mb-6">
            Would you like to contribute?
            <Link
              href="/upload"
              className="text-white font-semibold hover:underline ml-1"
            >
              Upload
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Home;
