"use client";
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
    "University of Asia Pacific",
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
  const questions = [
    {
      name: "Ques1daD",
      owner: "md. rakibul kabir",
      year: 2024,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2dscs",
      owner: "siam ahmed",
      year: 2024,
      type: "Term Test",
      mark: "Mark",
    },
    {
      name: "Ques2SCSCZSC",
      owner: "arka das",
      year: 2024,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2xvzcvzSnfgjhdtyaesegsegsdgstgw4twetw",
      owner: "robin ahmed",
      year: 2023,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2xzvzxvz",
      owner: "mahfuzul hasan siam",
      year: 2023,
      type: "Term Test",
      mark: "Mark",
    },
    {
      name: "Ques2vxfgsdvx",
      owner: "rakib",
      year: 2023,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2cbxcbxcbxc",
      owner: "rakib",
      year: 2022,
      type: "Term Test",
      mark: "Mark",
    },
    {
      name: "Ques2dgsdgzdzdgzdgzdgzd",
      owner: "rakib",
      year: 2022,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2afzsdfzdfzdf",
      owner: "rakib",
      year: 2021,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2zdgzdgzdgvzd",
      owner: "rakib",
      year: 2021,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2zdvzxdvzxdcvzxcv",
      owner: "rakib",
      year: 2021,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2zvxdvbxfcbx",
      owner: "rakib",
      year: 2020,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2bxxfvxbvxcbvxc",
      owner: "rakib",
      year: 2020,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2xxfbcnbcgncg",
      owner: "rakib",
      year: 2020,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2",
      owner: "rakib",
      year: 2019,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2",
      owner: "rakib",
      year: 2019,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2",
      owner: "rakib",
      year: 2019,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2",
      owner: "rakib",
      year: 2019,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2",
      owner: "rakib",
      year: 2019,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2",
      owner: "rakib",
      year: 2019,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2",
      owner: "rakib",
      year: 2019,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2",
      owner: "rakib",
      year: 2018,
      type: "Semester",
      mark: "Mark",
    },
    {
      name: "Ques2",
      owner: "rakib",
      year: 2018,
      type: "Semester",
      mark: "Mark",
    },
  ];
  const questionTypes = ["Semester", "Term Test"];
  const years = ["2020", "2021", "2022", "2023"];

  const books = [
    {
      name: "Book1daD",
      owner: "md. rakibul kabir",
      year: 2022,
      author: "Virginia Woolf",
      mark: "Mark",
    },
    {
      name: "Book2dscs",
      owner: "siam ahmed",
      year: 2022,
      author: "Stephen King",
      mark: "Mark",
    },
    {
      name: "Book2SCSCZSC",
      owner: "arka das",
      year: 2022,
      author: "Ernest Hemingway",
      mark: "Mark",
    },
    {
      name: "Book2xvzcvzSnfgjhdtyaesegsegsdgstgw4twetw",
      owner: "robin ahmed",
      year: 2022,
      author: "James Joyce",
      mark: "Mark",
    },
    {
      name: "Book2xzvzxvz",
      owner: "mahfuzul hasan siam",
      year: 2022,
      author: "Franz Kafka",
      mark: "Mark",
    },
    {
      name: "Book2vxfgsdvx",
      owner: "rakib",
      year: 2022,
      author: "Mark Twain",
      mark: "Mark",
    },
    {
      name: "Book2cbxcbxcbxc",
      owner: "rakib",
      year: 2022,
      author: "James Joyce",
      mark: "Mark",
    },
    {
      name: "Book2dgsdgzdzdgzdgzdgzd",
      owner: "rakib",
      year: 2022,
      author: "Jane Austen",
      mark: "Mark",
    },
    {
      name: "Book2afzsdfzdfzdf",
      owner: "rakib",
      year: 2022,
      author: "George Orwell",
      mark: "Mark",
    },
    {
      name: "Book2zdgzdgzdgvzd",
      owner: "rakib",
      year: 2022,
      author: "J.K. Rowling",
      mark: "Mark",
    },
    {
      name: "Book2zdvzxdvzxdcvzxcv",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
    {
      name: "Book2zvxdvbxfcbx",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
    {
      name: "Book2bxxfvxbvxcbvxc",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
    {
      name: "Book2xxfbcnbcgncg",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
    {
      name: "Book2",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
    {
      name: "Book2",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
    {
      name: "Book2",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
    {
      name: "Book2",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
    {
      name: "Book2",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
    {
      name: "Book2",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
    {
      name: "Book2",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
    {
      name: "Book2",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
    {
      name: "Book2",
      owner: "rakib",
      year: 2022,
      author: "Semester",
      mark: "Mark",
    },
  ];
  const editions = ["2020", "2021", "2022", "2023"];
  const notes = [
    {
      name: "Note1",
      owner: "md. rakibul kabir",
      date: "2023-08-25",
      mark: "Mark",
    },
    {
      name: "Note2",
      owner: "siam ahmed",
      date: "2023-09-24",
      mark: "Mark",
    },
    {
      name: "Note3",
      owner: "arka das",
      date: "2023-10-23",
      mark: "Mark",
    },
    {
      name: "Note4",
      owner: "robin ahmed",
      date: "2023-11-22",
      mark: "Mark",
    },
    {
      name: "Note5",
      owner: "mahfuzul hasan siam",
      date: "2023-12-21",
      mark: "Mark",
    },
    {
      name: "Note1",
      owner: "md. rakibul kabir",
      date: "2023-01-25",
      mark: "Mark",
    },
    {
      name: "Note2",
      owner: "siam ahmed",
      date: "2023-02-24",
      mark: "Mark",
    },
    {
      name: "Note3",
      owner: "arka das",
      date: "2023-03-23",
      mark: "Mark",
    },
    {
      name: "Note4",
      owner: "robin ahmed",
      date: "2023-04-22",
      mark: "Mark",
    },
    {
      name: "Note5",
      owner: "mahfuzul hasan siam",
      date: "2023-05-21",
      mark: "Mark",
    },
    {
      name: "Note1",
      owner: "md. rakibul kabir",
      date: "2023-06-25",
      mark: "Mark",
    },
    {
      name: "Note2",
      owner: "siam ahmed",
      date: "2023-07-24",
      mark: "Mark",
    },
    {
      name: "Note3",
      owner: "arka das",
      date: "2023-08-23",
      mark: "Mark",
    },
    {
      name: "Note4",
      owner: "robin ahmed",
      date: "2023-08-22",
      mark: "Mark",
    },
    {
      name: "Note5",
      owner: "mahfuzul hasan siam",
      date: "2023-08-21",
      mark: "Mark",
    },
    // Add more notes as needed
  ];

  return (
    <DataContext.Provider
      value={{
        universities,
        departments,
        courses,
        questions,
        questionTypes,
        years,
        books,
        editions,
        notes,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for consuming the data context
export const useDataContext = () => {
  return useContext(DataContext);
};
