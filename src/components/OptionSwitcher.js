import React from "react";

const OptionSwitcher = ({ options, selectedOption, onSelectOption }) => {
  return (
    <div className="flex space-x-2 relative  rounded-lg ">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelectOption(option)}
          className={`flex-1 px-10 py-1.5 transition-all duration-300 rounded-full hover:bg-black hover:text-white ${
            selectedOption === option
              ? "bg-black text-white font-bold"
              : "bg-white text-black font-normal  border-2 border-black "
          } focus:outline-none`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionSwitcher;
