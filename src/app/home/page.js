"use client";

import React, { useState } from "react";
import SearchDropdown from "../../components/SearchDropdown";
import { FaUniversity } from "react-icons/fa";
import { PiTreeViewFill } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import { useDataContext } from "../../context/DataContext"

function Home() {
  const { universities, departments, courses } = useDataContext();
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");

  return (
    <div
      className="flex justify-center items-center w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/campus-bg.jpg')" }}
    >
      <div className="w-96 bg-transparent border-2 border-white/10 backdrop-filter backdrop-blur-lg shadow-lg text-white rounded-lg p-8 opacity-100">
        <form>
          <h1 className="text-black text-3xl font-bold text-center">
            Home Page
          </h1>
          <p className="text-black text-center mb-6">
            Select your options below
          </p>

          <SearchDropdown
            label="University"
            options={universities}
            selectedOption={university}
            setSelectedOption={setUniversity}
            icon={<FaUniversity />}
          />
          <SearchDropdown
            label="Department"
            options={departments}
            selectedOption={department}
            setSelectedOption={setDepartment}
            icon={<PiTreeViewFill /> }
          />
          <SearchDropdown
            label="Course"
            options={courses}
            selectedOption={course}
            setSelectedOption={setCourse}
            icon={<FaBookOpen />}
          />

          <button
            type="submit"
            className="w-full h-11 my-4 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-white hover:text-black"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
