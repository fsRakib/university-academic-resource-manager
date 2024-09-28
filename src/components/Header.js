"use client";
import React, { useState } from "react";
import OptionSwitcher from "../components/OptionSwitcher";
import { useRouter } from "next/navigation";
import FileUploadQuestions from "@/components/UploadQuestions";
import FileUploadBooks from "@/components/UploadBooks";
import FileUploadNotes from "@/components/UploadNotes";

function Header() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("Questions");
  const options = ["Questions", "Books", "Notes"];

  // Handle the option switching
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (option === "Questions") {
      router.push("/questions");
    } else if (option === "Books") {
      router.push("/books");
    } else {
      router.push("/notes");
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
