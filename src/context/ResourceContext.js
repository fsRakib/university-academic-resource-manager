// "use client"
// import React, { createContext, useState, useContext } from 'react';

// const ResourceContext = createContext();


// export const useResourceContext = () => useContext(ResourceContext);

// export const ResourceProvider = ({ children }) => {
//   // Define state for the universityId, departmentId, and courseId
//   const [universityId, setUniversityId] = useState("");
//   const [departmentId, setDepartmentId] = useState("");
//   const [courseId, setCourseId] = useState("");

//   return (
//     <ResourceContext.Provider
//       value={{
//         universityId,
//         departmentId,
//         courseId,
//         setUniversityId,
//         setDepartmentId,
//         setCourseId,
//       }}
//     >
//       {children}
//     </ResourceContext.Provider>
//   );
// };


"use client"
import { createContext, useContext, useState, useEffect } from "react";

// Create ResourceContext
const ResourceContext = createContext();

export function ResourceProvider({ children }) {
  const [universityId, setUniversityId] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [courseId, setCourseId] = useState(null);

  // Optional: If you want to persist these values in localStorage
  useEffect(() => {
    const storedUniversityId = localStorage.getItem("universityId");
    const storedDepartmentId = localStorage.getItem("departmentId");
    const storedCourseId = localStorage.getItem("courseId");

    if (storedUniversityId) setUniversityId(storedUniversityId);
    if (storedDepartmentId) setDepartmentId(storedDepartmentId);
    if (storedCourseId) setCourseId(storedCourseId);
  }, []);

  useEffect(() => {
    if (universityId) localStorage.setItem("universityId", universityId);
    if (departmentId) localStorage.setItem("departmentId", departmentId);
    if (courseId) localStorage.setItem("courseId", courseId);
  }, [universityId, departmentId, courseId]);

  return (
    <ResourceContext.Provider
      value={{
        universityId,
        departmentId,
        courseId,
        setUniversityId,
        setDepartmentId,
        setCourseId,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
}

export const useResourceContext = () => useContext(ResourceContext);
