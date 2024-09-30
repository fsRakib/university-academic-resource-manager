"use client";
import React, { useState } from "react";
import SearchBox from "../../../components/SearchBox";
import SearchDropdown from "../../../components/SearchDropdown copy";
import { useDataContext } from "../../../context/DataContext";

function Notes() {
  const { notes, years } = useDataContext();
  const [year, setYear] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  };

  return (
    <div className="flex-grow w-full">
      <div className="my-1 w-full flex justify-between shadow-2xl space-x-2">
        <div className="flex-auto">
          <SearchBox />
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
      </div>

      <div className="w-full rounded-lg overflow-hidden">
        <div className="overflow-hidden">
          <table className="w-full bg-white table-fixed">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-4 py-2 text-start w-[40%]">Name</th>
                <th className="px-4 py-2 text-start w-[20%]">Owner</th>
                <th className="px-4 py-2 text-start w-[15%]">Date</th>
                <th className="px-4 py-2 text-start w-[10%]">Mark</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="overflow-auto max-h-[calc(100vh-6rem)]">
          <table className="w-full bg-white table-fixed">
            <tbody>
              {notes.map((note, index) => (
                <tr key={index}>
                  <td className="border-b-2 px-4 py-2 text-start w-[40%] overflow-hidden whitespace-nowrap text-ellipsis">
                    {note.name}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-start w-[20%] overflow-hidden whitespace-nowrap text-ellipsis">
                    {note.owner}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-start w-[15%]">
                    {formatDate(note.date)}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-start w-[10%]">
                    {note.mark}
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

export default Notes;
