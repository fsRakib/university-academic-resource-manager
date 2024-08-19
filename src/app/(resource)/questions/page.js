"use client";

import React, { useState, useEffect } from "react";
import SearchDropdown from "../../../components/SearchDropdown";
import { useDataContext } from "../../../context/DataContext";

const questions = [
  {
    name: "Ques1daD",
    owner: "md. rakibul kabir",
    year: 2022,
    type: "Semester",
    mark: "Mark",
  },
  {
    name: "Ques2dscs",
    owner: "siam ahmed",
    year: 2022,
    type: "Term Test",
    mark: "Mark",
  },
  {
    name: "Ques2SCSCZSC",
    owner: "arka das",
    year: 2022,
    type: "Semester",
    mark: "Mark",
  },
  {
    name: "Ques2xvzcvzSnfgjhdtyaesegsegsdgstgw4twetw",
    owner: "robin ahmed",
    year: 2022,
    type: "Semester",
    mark: "Mark",
  },
  {
    name: "Ques2xzvzxvz",
    owner: "mahfuzul hasan siam",
    year: 2022,
    type: "Term Test",
    mark: "Mark",
  },
  {
    name: "Ques2vxfgsdvx",
    owner: "rakib",
    year: 2022,
    type: "Semester",
    mark: "Mark",
  },
  {
    name: "Ques2cbxcbxcbxc",
    owner: "rakib",
    year: 2022,
    type: "Term Test",
    mark: "Mark",
  },
  {
    name: "Ques2dgsdgzdzdgzdgzdgzd",
    owner: "rakib",
    year: 2022,
    type: "Semester",
    mark: "Mark",
  },
  {
    name: "Ques2afzsdfzdfzdf",
    owner: "rakib",
    year: 2022,
    type: "Semester",
    mark: "Mark",
  },
  {
    name: "Ques2zdgzdgzdgvzd",
    owner: "rakib",
    year: 2022,
    type: "Semester",
    mark: "Mark",
  },
  {
    name: "Ques2zdvzxdvzxdcvzxcv",
    owner: "rakib",
    year: 2022,
    type: "Semester",
    mark: "Mark",
  },
  {
    name: "Ques2zvxdvbxfcbx",
    owner: "rakib",
    year: 2022,
    type: "Semester",
    mark: "Mark",
  },
  {
    name: "Ques2bxxfvxbvxcbvxc",
    owner: "rakib",
    year: 2022,
    type: "Semester",
    mark: "Mark",
  },
  {
    name: "Ques2xxfbcnbcgncg",
    owner: "rakib",
    year: 2022,
    type: "Semester",
    mark: "Mark",
  },
  { name: "Ques2", owner: "rakib", year: 2022, type: "Semester", mark: "Mark" },
  { name: "Ques2", owner: "rakib", year: 2022, type: "Semester", mark: "Mark" },
  { name: "Ques2", owner: "rakib", year: 2022, type: "Semester", mark: "Mark" },
  { name: "Ques2", owner: "rakib", year: 2022, type: "Semester", mark: "Mark" },
  { name: "Ques2", owner: "rakib", year: 2022, type: "Semester", mark: "Mark" },
  { name: "Ques2", owner: "rakib", year: 2022, type: "Semester", mark: "Mark" },
  { name: "Ques2", owner: "rakib", year: 2022, type: "Semester", mark: "Mark" },
  { name: "Ques2", owner: "rakib", year: 2022, type: "Semester", mark: "Mark" },
  { name: "Ques2", owner: "rakib", year: 2022, type: "Semester", mark: "Mark" },
];

function Questions() {
  const { courses } = useDataContext(); // Destructure shared data
  const [isMounted, setIsMounted] = useState(false);
  const [questionType, setQuestionType] = useState("");
  const [year, setYear] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    setIsMounted(true);
    console.log("Question Type Selected:", questionType);
  }, []);

  const questionTypes = ["Semester", "Term Test"];
  const years = ["2020", "2021", "2022", "2023"];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex-grow  w-full">
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

      <div className="w-full rounded-lg overflow-hidden">
        <div className="overflow-hidden">
          <table className="w-full bg-white table-fixed">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2 text-start w-[40%]">Name</th>
                <th className="px-4 py-2 text-start w-[20%]">Owner</th>
                <th className="px-4 py-2 text-start w-[10%]">Year</th>
                <th className="px-4 py-2 text-start w-[15%]">Type</th>
                <th className="px-4 py-2 text-start w-[10%]">Mark</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="overflow-auto max-h-[calc(100vh-6rem)]">
          <table className="w-full bg-white table-fixed">
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td className="border-b-2 px-4 py-2 text-start w-[40%] overflow-hidden whitespace-nowrap text-ellipsis">
                    {question.name}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-start w-[20%] overflow-hidden whitespace-nowrap text-ellipsis">
                    {question.owner}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-start w-[10%]">
                    {question.year}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-start w-[15%] overflow-hidden whitespace-nowrap text-ellipsis">
                    {question.type}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-start w-[10%]">
                    {question.mark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Questions;
