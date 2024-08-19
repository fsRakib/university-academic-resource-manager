"use client"
import React, { createContext, useContext, useState } from "react";

// Create the context
const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const universities = [
    "Shahjalal University of Science and Technology",
    "Bangladesh University of Engineering and Technology",
    "University of Dhaka",
    "Jahangirnagar University",
    "Islamic University of Technology",
    "BRAC University",
    "Pabna University of Science and Technology",
    "University of Rajshahi",
    "Military Institute of Science and Technology",
    "Bangladesh University of Professionals",
    "American International University-Bangladesh",
    "North South University",
    "East West University",
    "Daffodil International University",
    "University of Liberal Arts Bangladesh",
    "United International University",
    "Independent University, Bangladesh",
    "Southeast University",
    "Ahsanullah University of Science and Technology",
    "University of Asia Pacific"
];


  const departments = [
    "CSE",
    "SWE",
    "EEE",
    "CEE",
    "PHY",
    "MAT",
    "CHE",
    "BBA",
    "ECO",
    "LAW",
    "SOC",
    "ENG",
    "BIO",
    "ARC",
  ];

  const courses = [
    "Database",
    "Architecture",
    "AI",
    "ML",
    "SRE",
    "Datastructure",
    "OS",
    "OOP",
    "Economics",
    "Business Law",
    "Sociology",
    "Literature",
    "Biology",
    "Physics",
    "Chemistry",
  ];

  return (
    <DataContext.Provider value={{ universities, departments, courses }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for consuming the data context
export const useDataContext = () => {
  return useContext(DataContext);
};
