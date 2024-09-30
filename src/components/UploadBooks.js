"use client";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import SearchDropdown from "@/components/SearchDropdown copy";
import { useDataContext } from "@/context/DataContext";

export default function FileUploadBooks() {
  const { editions } = useDataContext();
  const [edition, setEdition] = useState("");

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    edition: "",
  });

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("file", formData.file);
    formDataToSend.append("edition", edition);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataToSend,
      });

      if (res.ok) {
        console.log("File uploaded successfully");
        setIsUploadDialogOpen(false);
      } else {
        console.error("Failed to upload file");
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
          Upload Books
        </button>
      </div>

      {isUploadDialogOpen && (
        <div className="flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-70">
          <div className="bg-teal-200 px-14 py-10 shadow-lg rounded-xl space-y-6 w-auto">
            <div>
            <h1 className="text-center text-xl font-semibold">
                Upload Your
                <span className="underline text-black font-bold ml-2">
                  Books
                </span>
              </h1>
            </div>

            <form className="flex flex-col space-y-4 w-72">
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
