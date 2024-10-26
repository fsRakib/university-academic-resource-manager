"use client";
import React, { useState, useEffect } from "react";
import OptionSwitcher from "../components/OptionSwitcher";
import { useRouter } from "next/navigation";
import FileUploadQuestions from "@/components/UploadQuestions";
import FileUploadBooks from "@/components/UploadBooks";
import FileUploadNotes from "@/components/UploadNotes";
import { useResourceContext } from "@/context/ResourceContext";

function Header() {
  const {
    universityId,
    departmentId,
    courseId,
    // setUniversityId,
    // setDepartmentId,
    // setCourseId,
    // universities,
    // setUniversities,
    // departments,
    // setDepartments,
    // courses,
    // setCourses,
  } = useResourceContext();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("Questions");
  const options = ["Questions", "Books", "Notes"];

  useEffect(() => {
    // Get the current pathname to determine the selected option
    const currentPath = window.location.pathname;

    if (currentPath.includes("/questions")) {
      setSelectedOption("Questions");
    } else if (currentPath.includes("/books")) {
      setSelectedOption("Books");
    } else if (currentPath.includes("/notes")) {
      setSelectedOption("Notes");
    }
  }, []);

  // Handle the option switching
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (option === "Questions") {
      // router.push("/questions");
      router.push(
        `/questions?university=${universityId}&department=${departmentId}&course=${courseId}`
      );
    } else if (option === "Books") {
      // router.push("/books");
      router.push(
        `/books?university=${universityId}&department=${departmentId}&course=${courseId}`
      );
    } else {
      // router.push("/notes");
      router.push(
        `/notes?university=${universityId}&department=${departmentId}&course=${courseId}`
      );
    }
  };

  return (
    <div className="mt-2 flex justify-between w-full max-w-4xl space-x-2">
      {/* Option Switcher */}
      <div className="flex-auto">
        <OptionSwitcher
          options={options}
          selectedOption={selectedOption}
          onSelectOption={handleSelectOption}
        />
      </div>

      {/* Modify Search Button */}
      <div className="flex-auto">
        <button
          className="bg-black px-1 py-2 rounded-lg font-bold w-full"
          style={{ color: "#FFAA33" }}
          onClick={() => router.push("/home")}
        >
          Modify Search
        </button>
      </div>

      {/* Conditionally Render File Upload Dialogs */}
      <div className="flex-auto">
        {selectedOption === "Questions" && <FileUploadQuestions />}
        {selectedOption === "Books" && <FileUploadBooks />}
        {selectedOption === "Notes" && <FileUploadNotes />}
      </div>
    </div>
  );
}

export default Header;
