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

"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  const [universityId, setUniversityId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [courseId, setCourseId] = useState("");

  // Load from session storage on initial render
  useEffect(() => {
    const storedUniversityId = sessionStorage.getItem("universityId");
    const storedDepartmentId = sessionStorage.getItem("departmentId");
    const storedCourseId = sessionStorage.getItem("courseId");

    if (storedUniversityId) setUniversityId(storedUniversityId);
    if (storedDepartmentId) setDepartmentId(storedDepartmentId);
    if (storedCourseId) setCourseId(storedCourseId);
  }, []);

  // Save to session storage when values change
  useEffect(() => {
    sessionStorage.setItem("universityId", universityId);
    sessionStorage.setItem("departmentId", departmentId);
    sessionStorage.setItem("courseId", courseId);
  }, [universityId, departmentId, courseId]);

  return (
    <ResourceContext.Provider
      value={{
        universityId,
        setUniversityId,
        departmentId,
        setDepartmentId,
        courseId,
        setCourseId,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

export const useResourceContext = () => {
  return useContext(ResourceContext);
};
