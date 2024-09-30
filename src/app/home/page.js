"use client";

import React, { useState, useEffect } from "react";
import SearchDropdown from "@/components/SearchDropdown";
import { FaUniversity } from "react-icons/fa";
import { PiTreeViewFill } from "react-icons/pi";
import { FaBookOpen } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ProfileDropdown from "@/components/ProfileDropdown";
import { useResourceContext } from "@/context/ResourceContext";

function Home() {
  // const [universities, setUniversities] = useState([]);
  // const [departments, setDepartments] = useState([]);
  // const [courses, setCourses] = useState([]);

  const {
    universityId,
    departmentId,
    courseId,
    setUniversityId,
    setDepartmentId,
    setCourseId,
    universities,
    setUniversities,
    departments,
    setDepartments,
    courses,
    setCourses,
  } = useResourceContext();

  const router = useRouter();

  // Fetch universities on component mount
  useEffect(() => {
    async function fetchUniversities() {
      const res = await fetch("/api/admin/university");
      const data = await res.json();
      setUniversities(Array.isArray(data) ? data : []);
    }
    fetchUniversities();
  }, [setUniversities]);

  // Fetch departments when a university is selected
  useEffect(() => {
    if (universityId) {
      async function fetchDepartments() {
        const res = await fetch(
          `/api/admin/department?universityId=${universityId}`
        );
        const data = await res.json();
        setDepartments(Array.isArray(data) ? data : []);
      }
      fetchDepartments();
    } else {
      setDepartments([]);
    }
  }, [universityId, setDepartments]);

  // Fetch courses when a department is selected
  useEffect(() => {
    if (departmentId) {
      async function fetchCourses() {
        const res = await fetch(
          `/api/admin/course?departmentId=${departmentId}`
        );
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      }
      fetchCourses();
    } else {
      setCourses([]);
    }
  }, [departmentId, setCourses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (universityId && departmentId && courseId) {
      router.push(
        `/questions?university=${universityId}&department=${departmentId}&course=${courseId}`
      );
    }
  };

  console.log("Home with IDs: ", universityId, departmentId, courseId);

  return (
    <div
      className="flex flex-col justify-center items-center w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/campus-bg.jpg')" }}
    >
      <div className="absolute top-4 right-4">
        <ProfileDropdown />
      </div>

      <div className="w-96 bg-transparent border-2 border-white/10 backdrop-filter backdrop-blur-lg shadow-lg text-white rounded-lg p-8 opacity-100">
        <form onSubmit={handleSubmit}>
          <h1 className="text-black text-3xl font-bold text-center">
            Get your resources
          </h1>
          <p className="text-black text-center mb-6">
            Select your options below
          </p>

          <SearchDropdown
            label="University"
            options={universities.map((uni) => ({
              label: uni.name,
              value: uni._id,
            }))}
            selectedOption={universityId}
            setSelectedOption={(value) => {
              setUniversityId(value);
              setDepartmentId("");
              setCourseId("");
            }}
            centered={true}
            icon={<FaUniversity />}
          />

          <SearchDropdown
            label="Department"
            options={departments.map((dept) => ({
              label: dept.name,
              value: dept._id,
            }))}
            selectedOption={departmentId}
            setSelectedOption={(value) => {
              setDepartmentId(value);
              setCourseId("");
            }}
            centered={true}
            icon={<PiTreeViewFill />}
          />

          <SearchDropdown
            label="Course"
            options={courses.map((course) => ({
              label: course.name,
              value: course._id,
            }))}
            selectedOption={courseId}
            setSelectedOption={(value) => setCourseId(value)}
            centered={true}
            icon={<FaBookOpen />}
          />

          <button
            type="submit"
            className="w-full h-11 my-4 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-white hover:text-black"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
