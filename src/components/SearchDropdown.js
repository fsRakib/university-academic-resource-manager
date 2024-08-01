import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaAngleDown } from "react-icons/fa";

const SearchDropdown = ({ label, options, selectedOption, setSelectedOption, icon }) => {
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);

  const sortedOptions = [...options].sort((a, b) => a.localeCompare(b));
  const filteredOptions = sortedOptions.filter(option =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsActive(false);
    setSearchValue("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative w-full mb-4">
      <label className="text-black block my-1">{label}</label>
      <div
        className={`relative flex items-center justify-between w-full h-12 p-4 bg-transparent border-2 border-gray-600 rounded-lg cursor-pointer text-black ${isActive ? "active" : ""}`}
        onClick={() => setIsActive(!isActive)}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span className="text-black mx-1">{selectedOption || `Select ${label}`}</span>
        </div>
        <FaAngleDown className={`transition-transform ${isActive ? "transform rotate-180" : ""}`} />
      </div>
      {isActive && (
        <div
          ref={dropdownRef}
          className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 mt-2 bg-white border border-gray-600 rounded-lg shadow-lg z-10 max-h-80 overflow-hidden" // Added overflow-hidden for rounded corners
        >
          <div className="relative flex items-center p-4">
            <FaSearch className="mx-3 absolute left-4 text-gray-400" />
            <input
              type="text"
              className="w-full h-12 pl-9 pr-4 text-black bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder={`Search ${label.toLowerCase()}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <ul className="overflow-auto max-h-60"> {/* Added overflow-auto to the list */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-black rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-300"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <p className="px-4 py-2 text-black">No options found</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
