"use client";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import SearchDropdown from "../components/SearchDropdown copy";
import { useDataContext } from "@/context/DataContext";
import { useSession } from "next-auth/react";
import { useResourceContext } from "@/context/ResourceContext";

export default function FileUploadQuestions() {
  const { universityId, departmentId, courseId } = useResourceContext();
  const { data: session } = useSession();
  const { questionTypes, years } = useDataContext();

  const [questionType, setQuestionType] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file || !questionType || !year) {
      console.error("Missing required fields");
      return;
    }

    setLoading(true);
    console.log("Dialog with IDs: ", universityId, departmentId, courseId);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("questionType", questionType); 
    formData.append("year", year);

    formData.append("universityId", universityId);
    formData.append("departmentId", departmentId);
    formData.append("courseId", courseId);
    formData.append("ownerId", session.user.id);

    try {
      const res = await fetch("/api/question", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        console.log("File uploaded successfully");
        setIsUploadDialogOpen(false);
      } else {
        const errorData = await res.json();
        console.error("Failed to upload file", errorData);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <button
          className="bg-black px-1 py-2 rounded-lg font-bold w-full"
          style={{ color: "#FFAA33" }}
          onClick={() => setIsUploadDialogOpen(true)}
        >
          Upload Questions
        </button>
      </div>

      {isUploadDialogOpen && (
        <div className="flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-70 z-20">
          <div className="bg-teal-200 px-14 py-10 shadow-2xl rounded-xl space-y-6 w-auto ">
            <div>
              <h1 className="text-center text-xl font-semibold">
                Upload Your
                <span className="underline text-black font-bold ml-2">
                  Questions
                </span>
              </h1>
            </div>

            <form className="flex flex-col space-y-4 w-72">
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

              <div className="relative">
                <label className="block text-gray-700 mb-2">Choose File</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-black rounded-lg"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsUploadDialogOpen(false)}
                  className="flex-auto bg-red-300 hover:bg-red-600 font-bold hover:text-white text-black px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`${
                    loading ? "bg-gray-500" : "bg-black"
                  } flex flex-auto items-center justify-center font-bold text-white hover:bg-white hover:text-black px-6 py-2 rounded-lg`}
                  disabled={loading}
                >
                  <FaCloudUploadAlt className="text-2xl mr-4" />
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
