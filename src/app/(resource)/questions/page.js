"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchDropdown from "@/components/SearchDropdown copy";
import { useDataContext } from "@/context/DataContext";

function Questions() {
  const { questionTypes, years, courses } = useDataContext();
  const [questionType, setQuestionType] = useState("");
  const [year, setYear] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const [questions, setQuestions] = useState([]);
  const searchParams = useSearchParams();
  const universityId = searchParams.get("university");
  const departmentId = searchParams.get("department");
  const courseId = searchParams.get("course");

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
            console.error("Error fetching questions:", data.message);
          }
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
      fetchQuestions();
    }
  }, [universityId, departmentId, courseId]);

  if (!questions.length) {
    return <p>No questions found for the selected options.</p>;
  }
  console.log("Question with IDs: ", universityId, departmentId, courseId);
  return (
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
          <SearchDropdown
            label="Course"
            options={courses}
            selectedOption={selectedCourse}
            setSelectedOption={setSelectedCourse}
            showLabel={false}
            centered={false}
            boxColor="bg-black"
            textColor="text-white"
          />
        </div>
      </div>

      <div className="flex-grow w-full overflow-hidden h-full">
        <div className="w-full h-full flex flex-col">
          <div className="overflow-y-auto flex-grow rounded-lg h-[400px]">
            {" "}
            {/* Set a fixed height */}
            <table className="w-full bg-white table-fixed rounded-lg">
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
                  <tr key={question._id}>
                    <td className="border-b-2 px-4 py-2 text-start w-[40%]">
                      {question.name}
                    </td>
                    <td className="border-b-2 px-4 py-2 text-start w-[20%]">
                      {question.ownerId?.name || "Unknown"}
                    </td>
                    <td className="border-b-2 px-4 py-2 text-start w-[10%]">
                      {new Date(question.createdAt).getFullYear()}
                    </td>
                    <td className="border-b-2 px-4 py-2 text-start w-[15%]">
                      {question.questionType}
                    </td>
                    <td className="border-b-2 px-4 py-2 text-start w-[10%]">
                      {question.marked ? "Marked" : "Unmarked"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questions;
