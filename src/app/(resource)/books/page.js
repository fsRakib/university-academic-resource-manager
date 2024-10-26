"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchBox from "../../../components/SearchBox";
import SearchDropdown from "../../../components/SearchDropdown copy";
import { useDataContext } from "../../../context/DataContext";
import { useResourceContext } from "@/context/ResourceContext";
import FilePreview from "@/components/FilePreviewModal";
import ProfileDropdown from "@/components/ProfileDropdown";

function Books() {
  const { editions } = useDataContext();
  const [edition, setEdition] = useState("");
  const {
    universityId,
    departmentId,
    courseId,
    setCourseId,
    courses,
    setCourses,
  } = useResourceContext();

  const [books, setBooks] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (universityId && departmentId && courseId) {
      async function fetchBooks() {
        try {
          const res = await fetch(
            `/api/book?university=${universityId}&department=${departmentId}&course=${courseId}`
          );
          const data = await res.json();

          console.log("Fetched books:", data);

          if (res.ok) {
            setBooks(data);
          } else {
            setBooks([]);
            console.error("Error fetching books:", data.message);
          }
        } catch (error) {
          setBooks([]);
          console.error("Error fetching books:", error);
        }
      }
      fetchBooks();
    }
  }, [universityId, departmentId, courseId]);

  const handleDoubleClick = (book) => {
    setPreviewFile(book.fileUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPreviewFile(null);
  };

  // Filter books based on selected Year and book Type
  const filteredBooks = books.filter((book) => {
    return (
      edition === "" ||
      book.edition === edition ||
      new Date(book.createdAt).getFullYear().toString() === edition
    );
  });

  return (
    <>
      <div className="absolute top-4 right-4">
        <ProfileDropdown />
      </div>
      <div className="flex-grow w-full">
        <div className="my-1 w-full flex justify-between shadow-2xl space-x-2">
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

        <div className="flex-grow w-full overflow-hidden h-full rounded-t-lg">
          <div className="w-full h-full flex flex-col">
            <div className="overflow-y-auto flex-grow rounded-lg h-[400px] bg-white">
              <table className="w-full table-fixed rounded-lg">
                <thead className="bg-gray-700 text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 text-start w-[30%]">Name</th>
                    <th className="px-4 py-2 text-start w-[20%]">Owner</th>
                    <th className="px-4 py-2 text-start w-[10%]">Year</th>
                    <th className="px-4 py-2 text-start w-[15%]">Mark</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        No books found.
                      </td>
                    </tr>
                  ) : (
                    filteredBooks.map((book) => (
                      <tr
                        key={book._id}
                        className="hover:bg-gray-300 cursor-pointer"
                        onDoubleClick={() => handleDoubleClick(book)}
                      >
                        <td className="border-b-2 px-4 py-2 text-start w-[40%] overflow-hidden whitespace-nowrap text-ellipsis">
                          {book.name}
                        </td>
                        <td className="border-b-2 px-4 py-2 text-start w-[20%] overflow-hidden whitespace-nowrap text-ellipsis">
                          {book.ownerId?.name || "Unknown"}
                        </td>
                        <td className="border-b-2 px-4 py-2 text-start w-[10%] overflow-hidden whitespace-nowrap text-ellipsis">
                          {book.year || new Date(book.createdAt).getFullYear()}
                        </td>
                        <td className="border-b-2 px-4 py-2 text-start w-[10%] overflow-hidden whitespace-nowrap text-ellipsis">
                          {book.marked ? "Marked" : "Unmarked"}
                        </td>
                      </tr>
                    ))
                  )}
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
                alt="Book Preview"
                className="w-full h-full object-contain"
              />
            )}
          </FilePreview>
        )}
      </div>
    </>
  );
}

export default Books;
