"use client";
import React, { useState } from "react";
import Dialog from "@/components/Dialog";

const AddUniversityDialog = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure name field is not empty
    if (!formData.name) {
      setErrorMessage("University name is required");
      return;
    }

    try {
      const response = await fetch("/api/admin/university", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setErrorMessage("");
        onSuccess(result); // Pass result to parent on success
        onClose(); // Close dialog
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Failed to post university");
      }
    } catch (error) {
      setErrorMessage("An error occurred while posting the university");
    }
  };

  return (
    <Dialog
      title="Add University"
      isOpen={isOpen}
      onClose={onClose}
      onOk={handleSubmit}
      footerButtons={(onClose, onOk) => (
        <>
          <button
            onClick={onClose}
            className="text-white bg-red-600 hover:bg-red-700 rounded-lg px-6 py-2 font-bold"
          >
            Cancel
          </button>
          <button
            onClick={onOk}
            type="submit"
            className="bg-green-900 text-white px-6 py-2 rounded-lg hover:bg-green-400 hover:text-green-950 font-bold"
          >
            Add
          </button>
        </>
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">University</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl"
          />
        </div>

        {errorMessage && <div className="mt-2 text-red-500">{errorMessage}</div>}
      </form>
    </Dialog>
  );
};

export default AddUniversityDialog;
