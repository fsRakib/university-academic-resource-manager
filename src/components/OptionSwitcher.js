import React from "react";

const OptionSwitcher = ({ options, selectedOption, onSelectOption }) => {
  return (
    <div className="flex space-x-2 relative  rounded-lg ">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelectOption(option)}
          className={`flex-1 px-6 py-2 transition-all duration-300 rounded-full ${
            selectedOption === option
              ? "bg-black text-white font-bold"
              : "bg-white text-black font-normal"
          } focus:outline-none`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionSwitcher;
