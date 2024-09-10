"use client"; // To ensure the page uses client-side rendering

import { useState } from "react";
import SearchDropdown from "@/components/SearchDropdown";
import { useDataContext } from "@/context/DataContext";

function UploadPage() {
  const [file, setFile] = useState(null);

  const { questionTypes, years } = useDataContext();
  const [questionType, setQuestionType] = useState("");
  const [year, setYear] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Add your upload logic here
    alert("File uploaded!");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-cover bg-center">
      <div className="bg-gray-400 rounded-lg p-6 w-96 shadow-lg space-y-6">
        <h2 className="text-center text-lg font-semibold ">
          Upload Your
          <span className="underline text-black font-bold ml-2">Questions</span>
        </h2>

        <div>
          <SearchDropdown
            label="Question Type"
            options={questionTypes}
            selectedOption={questionType}
            setSelectedOption={setQuestionType}
            showLabel={false}
            centered={false}
            boxColor="bg-black"
            textColor="text-white"
          />
        </div>

        <div>
          <SearchDropdown
            label="Year"
            options={years}
            selectedOption={year}
            setSelectedOption={setYear}
            showLabel={false}
            centered={false}
            boxColor="bg-black"
            textColor="text-white"
          />
        </div>

        {/* File Input */}
        <div className="flex items-center justify-center">
          <input
            type="file"
            className="border w-full p-2 rounded-md"
            onChange={handleFileChange}
          />
        </div>

        {/* Upload Button */}
        <button
          className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200"
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadPage;
