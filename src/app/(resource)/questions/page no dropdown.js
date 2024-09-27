"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // To access the query params

function Questions() {
  const [questions, setQuestions] = useState([]);
  const searchParams = useSearchParams();

  const university = searchParams.get("university");
  const department = searchParams.get("department");
  const course = searchParams.get("course");

  useEffect(() => {
    if (university && department && course) {
      async function fetchQuestions() {
        try {
          const res = await fetch(
            `/api/question?university=${university}&department=${department}&course=${course}`
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
  }, [university, department, course]);

  if (!questions.length) {
    return <p>No questions found for the selected options.</p>;
  }

  return (
    <div className="flex-grow w-full h-full">
      <div className="w-full h-full flex flex-col">
        {questions.length > 0 ? (
          <div className="overflow-auto flex-grow rounded-lg">
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
                    <td className="border-b-2 px-4 py-2 text-start w-[30%]">
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
                    <td className="border-b-2 px-4 py-2 text-start w-[15%]">
                      {question.marked ? "Marked" : "Unmarked"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No questions found for the selected options.</p>
        )}
      </div>
    </div>
  );
}

export default Questions;
