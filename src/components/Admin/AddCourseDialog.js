"use client";
import { useEffect, useState } from "react";
import Dialog from "@/components/Dialog";

export default function AddCourseDialog({ isOpen, onClose, onSuccess }) {
  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [courseName, setCourseName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all universities on component mount
  useEffect(() => {
    if (isOpen) {
      async function fetchUniversities() {
        const res = await fetch("/api/admin/university");
        const data = await res.json();
        console.log("Fetched universities:", data); 

        // Check if the data is an array
        if (Array.isArray(data)) {
          setUniversities(data);
          
        } else {
          console.error("Expected array but got:", data);
        }
      }
      fetchUniversities();
    }
  }, [isOpen]);
  console.log(" selecteted universities:", selectedUniversity);
  // Fetch departments when a university is selected
  useEffect(() => {
    if (selectedUniversity) {
      async function fetchDepartments() {
        const res = await fetch(
          `/api/admin/department?universityId=${selectedUniversity}`
        );
        const data = await res.json();
        console.log("Fetched dept:", data);
        setDepartments(data);
      }
      fetchDepartments();
    } else {
      setDepartments([]);
    }
  }, [selectedUniversity]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedUniversity || !selectedDepartment || !courseName) {
      setError("Please fill in all fields.");
      return;
    }

    const res = await fetch("/api/admin/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        universityId: selectedUniversity,
        departmentId: selectedDepartment,
        name: courseName,
      }),
    });

    if (res.ok) {
      setSuccess("Course added successfully!");
      setCourseName(""); // Clear the input
      onSuccess(); // Notify parent about success
      onClose(); // Close the dialog
    } else {
      setError("Failed to add course.");
    }
  };

  return (
    <Dialog
      title="Add New Course"
      isOpen={isOpen}
      onClose={onClose}
      onOk={handleSubmit}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>University:</label>
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl"
            required
          >
            <option value="">Select University</option>
            {universities.map((university) => (
              <option key={university._id} value={university._id}>
                {university.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Department:</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl"
            required
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
            className="w-full p-2 border border-gray-300 rounded-xl"
            required
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
            Add Course
          </button>
        </div>
      </form>
    </Dialog>
  );
}
