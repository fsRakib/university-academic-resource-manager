"use client";
import { useEffect, useState } from "react";
import Dialog from "@/components/Dialog";

export default function AddDepartmentDialog({ isOpen, onClose, onSuccess }) {
  const [universities, setUniversities] = useState([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch the list of universities when the dialog opens
  useEffect(() => {
    if (isOpen) {
      async function fetchUniversities() {
        try {
          const res = await fetch("/api/admin/university");
          const data = await res.json();
          if (res.ok) {
            setUniversities(data);

          } else {
            setError("Failed to load universities");
          }
        } catch (error) {
          console.error("Error fetching universities:", error);
          setError("Error fetching universities");
        }
      }
      fetchUniversities();
    }
  }, [isOpen]);

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form inputs
    if (!selectedUniversityId || !departmentName) {
      setError("Please select a university and enter a department name.");
      return;
    }

    try {
      // Send a POST request to add the department
      const res = await fetch("/api/admin/department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          universityId: selectedUniversityId,
          name: departmentName,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Department added successfully!");
        setDepartmentName(""); // Clear the input
        onSuccess(data); // Pass success data to the parent component
        onClose(); // Close the dialog after successful addition
      } else {
        setError(data.error || "Failed to add department");
      }
    } catch (error) {
      console.error("Error adding department:", error);
      setError("Error adding department");
    }
  }

  return (
    <Dialog
      title="Add Department"
      isOpen={isOpen}
      onClose={onClose}
      onOk={handleSubmit}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Select University:</label>
          <select
            value={selectedUniversityId}
            onChange={(e) => setSelectedUniversityId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl"
          >
            <option value="">-- Select University --</option>
            {universities.map((university) => (
              <option key={university._id} value={university._id}>
                {university.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Department Name:</label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Enter department name"
            className="w-full p-2 border border-gray-300 rounded-xl"
          />
        </div>

        {/* Display error or success messages */}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        {/* Buttons for cancel and adding */}
        <div className="flex justify-end space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            Add Department
          </button>
        </div>
      </form>
    </Dialog>
  );
}
