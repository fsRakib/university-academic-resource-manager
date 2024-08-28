"use client";
import React, { useState } from "react";
import SearchBox from "../../../components/SearchBox";
import SearchDropdown from "../../../components/SearchDropdown";
import { useDataContext } from "../../../context/DataContext";

function Books() {
  const { books, editions } = useDataContext();
  const [edition, setEdition] = useState("");

  return (
    <div className="flex-grow  w-full ">
      <div className="my-1 w-full flex justify-between shadow-2xl space-x-2 ">
        <div className="flex-auto">
          <SearchBox />
        </div>
        <div className="flex-auto">
          <SearchDropdown
            label="Edition"
            options={editions}
            selectedOption={edition}
            setSelectedOption={setEdition}
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
                <th className="px-4 py-2 text-start w-[15%]">Author</th>
                <th className="px-4 py-2 text-start w-[10%]">Mark</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="overflow-auto max-h-[calc(100vh-6rem)]">
          <table className="w-full bg-white table-fixed">
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td className="border-b-2 px-4 py-2 text-start w-[40%] overflow-hidden whitespace-nowrap text-ellipsis">
                    {book.name}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-start w-[20%] overflow-hidden whitespace-nowrap text-ellipsis">
                    {book.owner}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-start w-[10%]">
                    {book.year}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-start w-[15%] overflow-hidden whitespace-nowrap text-ellipsis">
                    {book.author}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-start w-[10%]">
                    {book.mark}
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

export default Books;
