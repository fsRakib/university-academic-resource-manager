"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchDropdown from "@/components/SearchDropdown copy";
import SearchDropdown2 from "@/components/SearchDropdown";
import { useDataContext } from "@/context/DataContext";
import FilePreview from "@/components/FilePreviewModal";
import { useResourceContext } from "@/context/ResourceContext";
import ProfileDropdown from "@/components/ProfileDropdown";

function Questions() {
  const { questionTypes, years } = useDataContext();
  const [questionType, setQuestionType] = useState("");
  const [year, setYear] = useState("");

  const {
    universityId,
    departmentId,
    courseId,
    setCourseId,
    courses,
    setCourses,
  } = useResourceContext();

  console.log("courses", courses);

  const [questions, setQuestions] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const searchParams = useSearchParams();
  // const universityId = searchParams.get("university");
  // const departmentId = searchParams.get("department");
  // const courseId = searchParams.get("course");

  // Refetch courses when universityId or departmentId is available
  useEffect(() => {
    if (universityId && departmentId) {
      async function fetchCourses() {
        try {
          const res = await fetch(
            `/api/admin/course?universityId=${universityId}&departmentId=${departmentId}`
          );
          const data = await res.json();
          setCourses(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }
      fetchCourses();
    }
  }, [universityId, departmentId, setCourses]);

  useEffect(() => {
    if (universityId && departmentId && courseId) {
      async function fetchQuestions() {
        try {
          const res = await fetch(
            `/api/question?university=${universityId}&department=${departmentId}&course=${courseId}`
          );
          const data = await res.json();

          console.log("Fetched questions:", data);

          if (res.ok) {
            setQuestions(data);
          } else {
            setQuestions([]);
            console.error("Error fetching questions:", data.message);
          }
        } catch (error) {
          setQuestions([]);
          console.error("Error fetching questions:", error);
        }
      }
      fetchQuestions();
    }
  }, [universityId, departmentId, courseId]);

  const handleDoubleClick = (question) => {
    setPreviewFile(question.fileUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPreviewFile(null);
  };

  console.log("Question with IDs: ", universityId, departmentId, courseId);
  return (
    <>
      <div className="absolute top-4 right-4">
        <ProfileDropdown />
      </div>
      <div className="flex-grow w-full">
        <div className="my-1 w-full flex justify-between shadow-2xl space-x-2">
          <div className="flex-auto">
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
          <div className="flex-auto">
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
          <div className="flex-auto">
            <SearchDropdown2
              label="Course"
              options={courses.map((course) => ({
                label: course.name,
                value: course._id,
              }))}
              selectedOption={courseId}
              setSelectedOption={(value) => setCourseId(value)}
              showLabel={false}
              centered={false}
              boxColor="bg-black"
              textColor="text-white"
            />
          </div>
        </div>

        <div className="flex-grow w-full overflow-hidden h-full  rounded-t-lg">
          <div className="w-full h-full flex flex-col ">
            <div className="overflow-y-auto flex-grow rounded-lg h-[400px] bg-white">
              <table className="w-full  table-fixed rounded-lg ">
                <thead className="bg-gray-700 text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 text-start w-[30%]">Name</th>
                    <th className="px-4 py-2 text-start w-[20%]">Owner</th>
                    <th className="px-4 py-2 text-start w-[10%]">Year</th>
                    <th className="px-4 py-2 text-start w-[15%]">Type</th>
                    <th className="px-4 py-2 text-start w-[15%]">Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question) => (
                    <tr
                      key={question._id}
                      className="hover:bg-gray-300 cursor-pointer"
                      onDoubleClick={() => handleDoubleClick(question)}
                    >
                      <td className="border-b-2 px-4 py-2 text-start w-[40%] overflow-hidden whitespace-nowrap text-ellipsis">
                        {question.name}
                      </td>
                      <td className="border-b-2 px-4 py-2 text-start w-[20%] overflow-hidden whitespace-nowrap text-ellipsis">
                        {question.ownerId?.name || "Unknown"}
                      </td>
                      <td className="border-b-2 px-4 py-2 text-start w-[10%] overflow-hidden whitespace-nowrap text-ellipsis">
                        {question.year ||
                          new Date(question.createdAt).getFullYear()}
                      </td>
                      <td className="border-b-2 px-4 py-2 text-start w-[15%] overflow-hidden whitespace-nowrap text-ellipsis">
                        {question.questionType}
                      </td>
                      <td className="border-b-2 px-4 py-2 text-start w-[10%] overflow-hidden whitespace-nowrap text-ellipsis">
                        {question.marked ? "Marked" : "Unmarked"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {isModalOpen && previewFile && (
          <FilePreview onClose={closeModal}>
            {previewFile.endsWith(".pdf") ? (
              <iframe
                src={`${previewFile}#toolbar=0`}
                className="w-full h-full"
                title="PDF Preview"
              />
            ) : (
              <img
                src={previewFile}
                alt="Question Preview"
                className="w-full h-full object-contain"
              />
            )}
          </FilePreview>
        )}
      </div>
    </>
  );
}

export default Questions;
