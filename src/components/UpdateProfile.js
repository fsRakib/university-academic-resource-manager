"use client";
import { useState } from "react";
import { FaUsersCog } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { FaUniversity } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { TbGenderBigender } from "react-icons/tb";
import { FaAddressCard } from "react-icons/fa6";
import { MdAccountTree } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

export default function UpdateProfile({ user, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    university: user?.university || "",
    department: user?.department || "",
    phone: user?.phone || "",
    session: user?.session || "",
    address: user?.address || "",
    gender: user?.gender || "Male",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/logged-in-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        onUpdate(data.user);
        setIsOpen(false);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="flex justify-center items-center bg-black text-white font-bold w-full px-4 py-2 rounded-xl"
        onClick={() => setIsOpen(true)}
      >
        <FaUsersCog className="mr-4 text-xl" />
        Update profile
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center">
          <div className="bg-sky-300 p-6 shadow-lg max-w-xl w-full rounded-xl">
            <h2 className="text-2xl text-center font-bold mb-2">
              Update your information
            </h2>
            <form className="grid grid-cols-1 gap-4">
              {/* Full Name */}
              <div className="relative">
                <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 pl-10 border border-black rounded-lg"
                  placeholder="Full Name"
                />
              </div>

              {/* University */}
              <div className="relative">
                <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full p-2 pl-10 border border-black rounded-lg"
                  placeholder="University"
                />
              </div>

              {/* Department and Session */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <MdAccountTree className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full p-2 pl-10 border border-black rounded-lg"
                    placeholder="Department"
                  />
                </div>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="session"
                    value={formData.session}
                    onChange={handleChange}
                    className="w-full p-2 pl-10 border border-black rounded-lg"
                    placeholder="Session"
                  />
                </div>
              </div>

              {/* Phone and Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <FaPhoneVolume className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 pl-10 border border-black rounded-lg"
                    placeholder="Mobile Number"
                  />
                </div>
                <div className="relative">
                  <TbGenderBigender className="text-xl absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2 pl-10 border border-black rounded-lg"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="relative">
                <FaAddressCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 pl-10 border border-black rounded-lg"
                  placeholder="Address"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-red-400 hover:bg-red-600 font-bold hover:text-white text-black px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`${
                    loading ? "bg-gray-500" : "bg-black"
                  } text-white flex items-center justify-center font-bold hover:bg-white hover:text-black px-6 py-2 rounded-lg`}
                  disabled={loading}
                >
                  <GrUpdate className="mr-4" />
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
