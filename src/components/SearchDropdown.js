import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaAngleDown } from "react-icons/fa";

const SearchDropdown = ({
  label,
  options,
  selectedOption,
  setSelectedOption,
  icon,
  showLabel = true,
  centered = true,
  boxColor = "bg-white", // Default box color
  textColor = "text-black", // Default text color
}) => {
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);

  const sortedOptions = [...options].sort((a, b) => a.localeCompare(b));
  const filteredOptions = sortedOptions.filter((option) =>
    option.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsActive(false);
    setSearchValue(""); // Clear the search field after selecting an option
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
  }, []);

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent the event from propagating to document
    setIsActive((prevState) => !prevState);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {showLabel && (
        <label className={`${textColor} block my-1`}>{label}</label>
      )}
      <div
        className={`relative flex items-center justify-between h-12 p-4 border-2 border-gray-600 rounded-lg cursor-pointer ${boxColor} ${textColor}`}
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span className={`mx-1 ${textColor}`}>
            {selectedOption || `Select ${label}`}
          </span>
        </div>
        <FaAngleDown
          className={`transition-transform ${
            isActive ? "transform rotate-180" : ""
          }`}
        />
      </div>
      {isActive && (
        <div
          className={`${
            centered
              ? "absolute left-1/2 top-full transform -translate-x-1/2"
              : "absolute left-0 top-full"
          } w-full mt-2 ${boxColor} border border-gray-600 rounded-lg shadow-lg z-10 max-h-80 overflow-hidden`}
        >
          <div className="relative flex items-center p-4">
            <FaSearch className="ml-4 absolute left-4 text-gray-400" />
            <input
              type="text"
              className={`w-full h-12 pl-9 pr-4  ${textColor} ${boxColor} border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800`}
              placeholder={`Search ${label.toLowerCase()}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <ul className="overflow-auto max-h-60">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 ${textColor} rounded-lg cursor-pointer hover:bg-gray-300 hover:text-black`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </li>
              ))
            ) : (
              <p className={`px-4 py-2 ${textColor}`}>No options found</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
