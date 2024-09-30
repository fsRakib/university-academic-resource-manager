"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  const [universityId, setUniversityId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [courseId, setCourseId] = useState("");

  // New global state for lists
  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);

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
        universities,
        setUniversities,
        departments,
        setDepartments,
        courses,
        setCourses,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

export const useResourceContext = () => {
  return useContext(ResourceContext);
};

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

// "use client";
// import { createContext, useContext, useState, useEffect } from "react";

// const ResourceContext = createContext();

// export const ResourceProvider = ({ children }) => {
//   const [universityId, setUniversityId] = useState("");
//   const [departmentId, setDepartmentId] = useState("");
//   const [courseId, setCourseId] = useState("");

//   // New global state for lists
//   const [universities, setUniversities] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [courses, setCourses] = useState([]);

//   // Load from session storage on initial render
//   useEffect(() => {
//     const storedUniversityId = sessionStorage.getItem("universityId");
//     const storedDepartmentId = sessionStorage.getItem("departmentId");
//     const storedCourseId = sessionStorage.getItem("courseId");

//     if (storedUniversityId) setUniversityId(storedUniversityId);
//     if (storedDepartmentId) setDepartmentId(storedDepartmentId);
//     if (storedCourseId) setCourseId(storedCourseId);
//   }, []);

//   // Save to session storage when values change
//   useEffect(() => {
//     if (universityId) sessionStorage.setItem("universityId", universityId);
//     if (departmentId) sessionStorage.setItem("departmentId", departmentId);
//     if (courseId) sessionStorage.setItem("courseId", courseId);
//   }, [universityId, departmentId, courseId]);

//   // Reset department and course when university changes
//   const updateUniversityId = (id) => {
//     setUniversityId(id);
//     setDepartmentId(""); // Reset department when university changes
//     setCourseId(""); // Reset course when university changes
//     sessionStorage.removeItem("departmentId");
//     sessionStorage.removeItem("courseId");
//   };

//   // Reset course when department changes
//   const updateDepartmentId = (id) => {
//     setDepartmentId(id);
//     setCourseId(""); // Reset course when department changes
//     sessionStorage.removeItem("courseId");
//   };

//   return (
//     <ResourceContext.Provider
//       value={{
//         universityId,
//         setUniversityId: updateUniversityId, // Use the function that resets dependent values
//         departmentId,
//         setDepartmentId: updateDepartmentId, // Use the function that resets dependent values
//         courseId,
//         setCourseId,
//         universities, // Add universities to context
//         setUniversities, // Function to set universities
//         departments, // Add departments to context
//         setDepartments, // Function to set departments
//         courses, // Add courses to context
//         setCourses, // Function to set courses
//       }}
//     >
//       {children}
//     </ResourceContext.Provider>
//   );
// };

// export const useResourceContext = () => {
//   return useContext(ResourceContext);
// };
