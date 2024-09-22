"use client";
import React, { useState } from "react";
import AddUniversityDialog from "@/components/Admin/AddUniversityDialog";
import AddDepartmentDialog from "@/components/Admin/AddDepartmentDialog";
import AddCourseDialog from "@/components/Admin/AddCourseDialog";

function Admin() {
  const [isUniversityDialogOpen, setIsUniversityDialogOpen] = useState(false);
  const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle success
  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000); // Message disappears after 3 seconds
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      {/* Success message */}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4 transition-opacity duration-500 ease-out">
          {successMessage}
        </div>
      )}

      <div className="max-w-xl max-h-fit p-8 rounded-3xl border-4 bg-slate-300">
        <h1 className="text-center text-2xl font-semibold border-b-4 border-slate-600 ">
          Admin Page
        </h1>
        <div className="mt-4 space-y-5 flex flex-col justify-between">
          <button
            onClick={() => setIsUniversityDialogOpen(true)}
            className="px-8 py-8 bg-slate-700 text-white text-xl font-semibold rounded-xl hover:bg-white hover:text-slate-600 border-2 border-slate-600"
          >
            Add University
          </button>

          <button
            onClick={() => setIsDepartmentDialogOpen(true)}
            className="px-8 py-8 bg-slate-700 text-white text-xl font-semibold rounded-xl hover:bg-white hover:text-slate-600 border-2 border-slate-600"
          >
            Add Department
          </button>

          <button
            onClick={() => setIsCourseDialogOpen(true)}
            className="px-8 py-8 bg-slate-700 text-white text-xl font-semibold rounded-xl hover:bg-white hover:text-slate-600 border-2 border-slate-600"
          >
            Add Course
          </button>
        </div>
      </div>

      {/* Dialog components */}
      <AddUniversityDialog
        isOpen={isUniversityDialogOpen}
        onClose={() => setIsUniversityDialogOpen(false)}
        onSuccess={(data) =>
          handleSuccess(`University "${data.university.name}" added successfully!`)
        }
      />

      <AddDepartmentDialog
        isOpen={isDepartmentDialogOpen}
        onClose={() => setIsDepartmentDialogOpen(false)}
        onSuccess={(data) =>
          handleSuccess(`Department "${data.department.name}" added successfully!`)
        }
      />

      <AddCourseDialog
        isOpen={isCourseDialogOpen}
        onClose={() => setIsCourseDialogOpen(false)}
        onSuccess={() =>
          handleSuccess("Course added successfully!")
        }
      />
    </div>
  );
}

export default Admin;
